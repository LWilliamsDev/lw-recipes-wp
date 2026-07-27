<?php

namespace Recipes\Blocks\RecipeSimple;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { 

	Timber::render(
    	'_shared/content-wrapper.twig',
    		[
        		'content' => $content,
        		'wrapper' => 'div',
        		'classes' => 'grid grid-cols-[1fr] mt-[30px] mb-[30px] md:grid-cols-[2fr_1fr] md:gap-x-5 text-(--color-dark-green) recipe__simple'
    		]
	);
} ?>

