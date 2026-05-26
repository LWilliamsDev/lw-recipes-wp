<?php

// Enqueues global theme CSS and JS
if ( ! function_exists( 'lw_recipes_enqueue' ) ) :
	/**
	 * Enqueues global theme CSS and JS on the front end.
	 *
	 * @since LW Recipes
	 *
	 * @return void
	 */
	function lw_recipes_enqueue() {

		wp_register_style('tailwind-defaults', get_template_directory_uri() . '/assets/css/tailwind-defaults.css', [], '1.0', 'all');
		wp_enqueue_style('global', get_stylesheet_uri(), [], '1.0.0');
		wp_enqueue_script('global', get_template_directory_uri() . '/assets/js/global-js.js', [], '1.0.0', true);
		wp_dequeue_style('wp-block-library' );
		wp_dequeue_style('global-styles');
		wp_dequeue_style('core-block-supports');
		wp_dequeue_style('wp-block-paragraph');
		wp_dequeue_style('wp-block-post-content');
		wp_dequeue_style('wp-emoji-styles');

	}
endif;
add_action( 'wp_enqueue_scripts', 'lw_recipes_enqueue' );
remove_action( 'wp_footer', 'the_block_template_skip_link' );

// Add menus
if ( ! function_exists( 'lw_recipes_menus' ) ) :
	/**
	 * Add nav menus
	 *
	 * @since LW Recipes
	 *
	 * @return void
	 */
	function lw_recipes_menus() {
		  register_nav_menu('main-menu', __('Main'));

	}
endif;
add_action( 'init', 'lw_recipes_menus' );

require_once('MainMenuWalker.php');

function recipes_editor_iframe_assets() {
	add_theme_support( 'editor-styles' );
  add_editor_style('style.css');
}
add_action( 'after_setup_theme', 'recipes_editor_iframe_assets' );

add_filter( 'should_load_separate_core_block_assets', '__return_true' );