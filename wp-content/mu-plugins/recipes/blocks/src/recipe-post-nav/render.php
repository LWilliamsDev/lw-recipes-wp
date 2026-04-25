<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$is_block_editor = is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { ?>
		<aside class="px-4 md:px-12">
			<div class="w-3/4 border-t border-b border-solid border-(--color-mid-green)">
				<ul class="flex flex-wrap justify-between pt-2 pb-2">
					<li><?php previous_post_link('&laquo; %link', 'Previous'); ?></li>
					<li><?php next_post_link('%link &raquo;', 'Next'); ?></li>
				</ul>
			</div>
		</aside>
	
<?php } ?>

