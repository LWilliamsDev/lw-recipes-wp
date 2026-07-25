<?php

use Recipes\Blocks\BlockHelper;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { ?>
	<div class="mt-[30px] mb-[30px] text-(--color-dark-green) recipe__complex">
		<?php echo $content; ?>
	</div>
	
<?php } ?>

