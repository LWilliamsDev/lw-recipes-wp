<?php

use Recipes\Blocks\BlockHelper;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { ?>

	<article class="px-4 pb-8 md:px-12 md:pb-12">
		<div class="w-3/4">
			<?php echo $content; ?>
		</div>
	</article>
	
<?php } ?>

