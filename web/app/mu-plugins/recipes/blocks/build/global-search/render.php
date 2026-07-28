<?php

namespace Recipes\Blocks\GlobalSearch;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { 

	global $wp_query;

	$context = Timber::context();

	$context['search_query'] = get_search_query();
	$context['results'] = $wp_query->posts;

	$context['pagination'] = Timber::get_pagination();

	Timber::render('global-search/view.twig', $context);

} ?>

