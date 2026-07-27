<?php

namespace Recipes\Blocks\RecipeOverview;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { 

	$context = Timber::context();

	//Build breadcrumbs

	$postId = get_the_ID();

	$options = get_option('lw_recipes_settings');
	$listing_page_id = $options['listing_page_id'] ?? 0;

	$link = $listing_page_id ? untrailingslashit(get_permalink($listing_page_id)) : null;

	$context['breadcrumbs'] = [];

	$context['breadcrumbs'][] = ['link' => get_the_permalink($postId), 'title' => get_the_title($postId)];

	$course = get_the_terms($postId, 'course');

	if ($course) {
		$course = reset($course);
		$context['breadcrumbs'][] = [
			'link' => $link . '?course=' . $course->term_id,
			'title' => $course->name
		];
	}
	
 	$diet = get_the_terms($postId, 'diet');

 	if ($diet) {
 		$diet = reset($diet);
 		$context['breadcrumbs'][] = [
 			'link' => $link . '?diet=' . $diet->term_id,
 			'title' => $diet->name
 		];
 	}



	$serves = !empty($attributes['serves']) ? $attributes['serves'] : '';
	$prepTime = !empty($attributes['prepTime']) ? $attributes['prepTime'] : '';
	$totalTime = !empty($attributes['totalTime']) ? $attributes['totalTime'] : '';


	if (!empty($serves) || !empty($prepTime) || !empty($totalTime)) {
		$overviewData = [];

		if (!empty($serves)) {
			$overviewData['serves'] = $serves;
		}

		if (!empty($prepTime)) {
			$overviewData['prepTime'] = $prepTime;
		}

		if (!empty($totalTime)) {
			$overviewData['totalTime'] = $totalTime;
		}
	}

	Timber::render('recipe-overview/view.twig', $context);



} ?>

