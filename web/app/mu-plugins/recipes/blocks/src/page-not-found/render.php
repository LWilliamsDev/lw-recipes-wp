<?php

namespace Recipes\Blocks\GlobalSearch;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { 


	$context = Timber::context();

	$context['title'] = empty($attributes['title']) ? 'Page Not Found' : wp_kses_post($attributes['title']);
	$context['content'] = empty($content) ? '<p>The requested page could not be found.</p>' : $content;

	Timber::render('page-not-found/view.twig', $context);

} ?>

