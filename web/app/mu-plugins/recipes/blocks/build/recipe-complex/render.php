<?php

namespace Recipes\Blocks\RecipeComplex;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { 

			Timber::render(
    '_shared/content-wrapper.twig',
    [
        'content' => $content,
        'wrapper' => 'div',
        'classes' => 'mt-[30px] mb-[30px] text-(--color-dark-green) recipe__complex'
    ]
);
	
 } ?>

