<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$is_block_editor = is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) {

  if (empty($content)) {
  	echo '<h1 class="font-roboto-condensed text-4xl md:text-6xl uppercase text-(--color-green) mb-[10px] md:mb-[20px]">My Hero Title</h1>';
  }
  else { 
  	 echo $content;
  }
			
 } ?>

