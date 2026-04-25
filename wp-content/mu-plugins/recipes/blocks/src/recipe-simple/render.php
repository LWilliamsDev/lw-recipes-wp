<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$is_block_editor = is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { ?>
	
	<div class="grid grid-cols-[1fr] mt-[30px] mb-[30px] md:grid-cols-[2fr_1fr] md:gap-x-5 text-(--color-dark-green) recipe__simple">
		<?php echo $content; ?>
	</div>
	
<?php } ?>

