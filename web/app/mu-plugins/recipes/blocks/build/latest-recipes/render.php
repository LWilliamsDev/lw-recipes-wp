<?php

namespace Recipes\Blocks\LatestRecipes;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;


$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) {

$context = Timber::context();


$query = Timber::get_posts([
	'post_type' => 'recipe',
	'posts_per_page' => 3 
]);

$options = get_option('lw_recipes_settings');
$listing_page_id = $options['listing_page_id'] ?? 0;

$link = $listing_page_id ? untrailingslashit(get_permalink($listing_page_id)) : null;

$context['posts'] = $query;

if (empty($attributes['title'])) {
	$title = _('Latest Recipes', 'lw-recipes');
}
else {
	$title = $attributes['title'];
}

$context['title'] = $title;

$context['posts'] = array_map(function ($post) use ($link) {
    return [
        'title'     => $post->title(),
        'link'      => $post->link(),
        'thumbnail' => $post->thumbnail(),
        'excerpt'   => get_the_excerpt($post),
        'diet'      => array_map(
            function ($term) use ($link) {
                return [
                    'name' => $term->name,
                    'id' => $term->term_id,
                    'link' => $link
                        ? $link . '?diet=' . $term->term_id
                        : null,
                ];
            },
            get_the_terms($post->ID, 'diet') ?: []
        ),
    ];
}, $query->to_array());

Timber::render('latest-recipes/view.twig', $context);
} ?>

