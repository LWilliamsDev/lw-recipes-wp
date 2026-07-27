<?php

namespace Recipes\Blocks\RecipeComplexIngredient;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { 

			Timber::render(
    '_shared/content-wrapper.twig',
    [
        'content' => $content,
        'wrapper' => 'div',
    ]
);
	
 } ?>

