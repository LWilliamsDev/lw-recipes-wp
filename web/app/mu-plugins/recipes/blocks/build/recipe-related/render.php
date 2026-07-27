<?php

namespace Recipes\Block\RecipeRelated;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { 
	$postId = get_the_ID();

	$context = Timber::context();

	$diet = get_the_terms($postId, 'diet');

	if ($diet) {
		$diet = reset($diet);

		$query = Timber::get_posts([
			'post_type' => 'recipe',
			'posts_per_page' => 3,
			'post__not_in' => [$postId],
			'tax_query' => array(
				array(
					'taxonomy' => 'diet',
					'field' => 'term_id',
					'terms' => $diet->term_id
				),	
			)
		]);


		$context['posts'] = $query;

	}

	Timber::render('recipe-related/view.twig', $context);

} ?>

