<?php

use Recipes\Blocks\BlockHelper;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { ?>
	<div class="mb-[30px]">
		<h2 class="text-3xl font-roboto-condensed uppercase text-(--color-green)"><?php _e('Ingredients', 'lw-recipes'); ?></h2>
		<div class="md:grid gap-x-5 md:grid-cols-[1fr_1fr] md:gap-y-5">
			<?php echo $content; ?>
		</div>
	</div>
	
<?php } ?>

