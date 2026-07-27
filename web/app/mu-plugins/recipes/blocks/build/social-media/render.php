<?php

namespace Recipes\Blocks\SocialMedia;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { 

	 if (!empty($content)) { 

			Timber::render('_shared/content-wrapper.twig', [
        		'content' => $content,
        		'wrapper' => 'ul',
        		'classes' => 'social-icons flex gap-6 items-center mt-5 mb-5 md:mb-0'
    			]
			);
	}
		


} ?>

