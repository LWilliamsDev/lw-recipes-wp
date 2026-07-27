<?php

namespace Recipes\Blocks\RecipeComplexInstructions;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { 

	$context = Timber::context();
	$context['content'] = $content;

	Timber::render('recipe-complex-instructions/view.twig', $context);
	
 } ?>

