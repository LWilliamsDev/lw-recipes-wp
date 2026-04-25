<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$is_block_editor = is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { ?>

	<?php if (!empty($content)) { ?>

		<ul class="social-icons flex gap-6 items-center mt-5 mb-5 md:mb-0">
			<?php echo $content; ?>
		</ul>
		
	<?php } ?>

<?php } ?>

