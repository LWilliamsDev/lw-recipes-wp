<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$is_block_editor = is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { ?>

	<nav aria-label="<?php _e('Skip Links', 'lw-recipes'); ?>"><a href="#main" class="skip-link sr-only"><?php _e('Skip to main content', 'lw-recipes'); ?></a></nav>
	<header class="grid grid-cols-[3fr_1fr] md:grid-cols-[0.5fr_1fr] items-center px-4 py-8 md:px-12 md:py-8">
		<div class="w-1/2 md:w-49"><a href="/"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/recipes-logo.svg" alt="<?php _e('Fit & Flavor Logo', 'lw-recipes'); ?>" /></a></div>
		<div class="md:hidden flex items-center justify-end">
			<button aria-label="<?php _e('Toggle mobile menu', 'lw-recipes'); ?>" class="mobile-menu-icon px-[10px] w-auto cursor-pointer h-[24px]" id="toggle-mobile-menu" aria-controls="primary-nav" aria-expanded="false">
				<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/mobile-menu-icon.svg" alt="<?php _e('Open mobile menu icon', 'lw-recipes'); ?>" class="mobile-menu-open">
				<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/close.svg" alt="<?php _e('Close mobile menu icon', 'lw-recipes'); ?>" class="mobile-menu-close">
			</button>
			<button aria-label="<?php _e('Toggle search', 'lw-recipes'); ?>" id="search-btn-mobile" aria-controls="search-form" aria-expanded="false" class="search-btn cursor-pointer p-2">
				<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/search-icon.svg" alt="<?php _e('Open Search icon', 'lw-recipes'); ?>" class="w-[24px] h-[24px] open-search">
				<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/close.svg" alt="<?php _e('Close search icon', 'lw-recipes'); ?>" class="close-search">
			</button>
		</div>
		<div id="search-form" class="hidden row-start-2 col-span-full justify-self-end mt-0 relative z-1 p-0">
			<form class="absolute -top-[9px] right-0 bg-(--color-tan) rounded-sm p-2 w-[241px] md:top-0">
				<div class="search-form">
					<input type="text" key="search" placeholder="<?php _e('Search...', 'lw-recipes'); ?>" class="rounded-sm border border-(--color-mid-green) border-solid p-2" id="search-input" />
					<button type="submit" class="rounded-sm bg-(--color-brown) p-2 text-(--color-white) font-medium" id="search-submit"><?php _e('Go', 'lw-recipes'); ?></button>
				</div>
			</form>
		</div>
		<div class="col-span-full row-start-3 mt-[15px] md:row-start-1 md:col-start-2 md:justify-self-end md:flex">
				<?php wp_nav_menu(array( 
					'menu' => 'main-menu',
					'menu_class' => 'nav hidden md:flex text-left md:gap-x-8', 
					'container_class' => '-mx-4 md:mx-0',
					'container' => 'nav',
					'walker' => new MainMenuWalker()
					)); ?>
			<button aria-label="<?php _e('Toggle search' ,'lw-recipes'); ?>" id="search-btn-desktop" aria-controls="search-form" aria-expanded="false" class="search-btn cursor-pointer hidden md:block p-4 ml-4">
				<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/search-icon.svg" alt="<?php _e('Open Search icon', 'lw-recipes'); ?>" class="w-[24px] h-[24px] open-search">
				<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/close.svg" alt="<?php _e('Close search icon', 'lw-recipes'); ?>" class="close-search"></button>
		</div>
	</header>

<?php } ?>

