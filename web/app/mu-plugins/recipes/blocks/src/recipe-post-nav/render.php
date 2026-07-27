<?php

namespace Recipes\Blocks\RecipePostNav;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { 

	$context = Timber::context();

	Timber::render('recipe-post-nav/view.twig', $context);

 } ?>

