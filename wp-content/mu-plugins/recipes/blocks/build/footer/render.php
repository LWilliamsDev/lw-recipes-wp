<?php

use Recipes\Blocks\BlockHelper;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { ?>

	<footer class="px-4 pb-8 pt-8 md:grid md:grid-cols-[1fr_1fr] md:px-12 md:pt-8">
		<div>
			<a href="/"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/recipes-logo.svg" alt="<?php _e('Fit & Flavor Logo', 'lw-recipes'); ?>" class="w-1/2 sm:w-1/3" /></a>
			<?php echo $content; ?>
		</div>
		<div class="md:justify-self-end">
				<?php wp_nav_menu(array( 
					'menu' => 'main-menu',
					'menu_class' => 'nav md:flex md:gap-x-24', 
					'container' => '',
					'depth' => 1
					)); ?>
		</div>
	</footer>

<?php } ?>
