<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$is_block_editor = is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { ?>
	<div class="mb-[30px] md:mb-[0px] order-1 md:order-none">
		<h2 class="text-3xl font-roboto-condensed uppercase text-(--color-green)"><?php _e('Ingredients', 'lw-recipes'); ?></h2>
		<?php echo $content; ?>
	</div>
	
<?php } ?>

