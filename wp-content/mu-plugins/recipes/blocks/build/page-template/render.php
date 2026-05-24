<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$is_block_editor = is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { ?>

	<article class="px-4 pb-8 md:px-12 md:pb-12">
		<div class="w-3/4">
			<?php echo $content; ?>
		</div>
	</article>
	
<?php } ?>

