<?php 

declare(strict_types=1);

namespace Recipes\Blocks;

final class BlockAssets {


	public function __construct() {
		add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);
		add_filter( 'should_load_separate_core_block_assets', '__return_true' );
		add_action('enqueue_block_assets', [$this, 'enqueue_iframe_assets']);
	}

	public function enqueue_editor_assets(): void {
		 wp_enqueue_style('recipes-block-editor-styles', RECIPES_URL . 'blocks/assets/block-sidebar.css');

  		//Only load the Recipes metabox script on the recipe post type edit page
  		$screen = get_current_screen();

  		if ( $screen && 'recipe' === $screen->post_type ) {
			wp_enqueue_script('recipes-metabox', RECIPES_URL . 'metabox/dist/editor-panel.js',  [ 'wp-plugins', 'wp-editor', 'wp-components', 'wp-element', 'wp-data' ], '1.0.0', true);	
  		}
	}


	/**
     * Load editor styles inside of the editor iframe
     * (needed to load validation error styles)
     */

	public function enqueue_iframe_assets(): void {

		if (is_admin()) {
			wp_enqueue_style('recipes-editor-iframe-styles', RECIPES_URL . 'blocks/assets/block-editor.css', [], '1.0.0', 'all');
		}

	}

}