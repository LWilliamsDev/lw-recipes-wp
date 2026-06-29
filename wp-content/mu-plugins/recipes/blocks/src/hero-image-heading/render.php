<?php

use Recipes\Blocks\BlockHelper;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) {

  if (empty($content)) {
  	echo '<h1 class="font-roboto-condensed text-4xl md:text-6xl uppercase text-(--color-green) mb-[10px] md:mb-[20px]">My Hero Title</h1>';
  }
  else { 
  	 echo $content;
  }
			
 } ?>

