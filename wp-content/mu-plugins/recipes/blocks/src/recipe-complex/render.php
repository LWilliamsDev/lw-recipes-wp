<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$is_block_editor = is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { ?>
	<div class="mt-[30px] mb-[30px] text-(--color-dark-green) recipe__complex">
		<?php echo $content; ?>
	</div>
	
<?php } ?>

