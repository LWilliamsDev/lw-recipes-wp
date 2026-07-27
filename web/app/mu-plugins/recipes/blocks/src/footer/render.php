<?php

namespace Recipes\Blocks\Footer;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { 

	$context = Timber::context();
	$context['content'] = $content;
	$context['menu'] = Timber::get_menu('main-menu', [
		'depth' => 1
	]);

	Timber::render('footer/view.twig', $context);

} ?>
