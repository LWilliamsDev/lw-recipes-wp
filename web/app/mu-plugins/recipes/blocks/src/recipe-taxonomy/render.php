<?php

namespace Recipes\Blocks\RecipeTaxonomy;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) {

	$context = Timber::context();

	$tax = empty($attributes['taxonomy']) ? 'diet' : $attributes['taxonomy'];
	$title = empty($attributes['title']) ? 'Browse by ' . ucwords($tax) : $attributes['title'];

	$context['title'] = $title;


	$terms = Timber::get_terms([
		'taxonomy' => $tax
	]);

	$options = get_option('lw_recipes_settings');
	$listing_page_id = $options['listing_page_id'] ?? 0;
	$link = $listing_page_id ? untrailingslashit(get_permalink($listing_page_id)) : null;

	$context['terms'] = array_map(function ($term) use ($link) {
		$image_id = get_term_meta($term->term_id, 'featured_image', true);
    return [
        'name'  => $term->name,
        'image' => $image_id ? Timber::get_image($image_id) : null,
        'link'  => $link ? add_query_arg(array(
            	$term->taxonomy => $term->term_id
        		), $link
        ) : null,
    ];
}, $terms);

	Timber::render('recipe-taxonomy/view.twig', $context);

 }
?>

