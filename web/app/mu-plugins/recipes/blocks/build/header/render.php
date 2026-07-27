<?php

namespace Recipes\Blocks\Header;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { 

	$context = Timber::context();
	$context['menu'] = Timber::get_menu('main-menu', [
		'depth' => 2
	]);
	Timber::render('header/view.twig', $context);

} ?>

