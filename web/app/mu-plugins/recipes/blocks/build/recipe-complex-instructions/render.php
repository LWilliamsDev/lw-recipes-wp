<?php

use Recipes\Blocks\BlockHelper;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { ?>
	<div>
		<h2 class="text-3xl font-roboto-condensed uppercase text-(--color-green)"><?php _e('Instructions', 'lw-recipes'); ?></h2>
		<?php echo $content; ?>
	</div>
	
<?php } ?>

