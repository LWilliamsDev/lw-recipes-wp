<?php

namespace Recipes\Assets;

/**
 * 
 * Handles loading for front end assets
 * 
 * */

final class Assets {

	private const handles = ['recipe-search', 'global'];

	public function __construct() {
		add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
		add_action('script_loader_tag', [$this, 'add_module_to_scripts'], 10, 3);
	}

	public function enqueue_frontend_assets() {
		if (has_block('lw-recipes/recipe-search')) {
			wp_enqueue_script('recipe-search', RECIPES_URL . '/blocks/assets/recipe-search.js', [], '1.0.0', true);
		}
	}

	/**
 	 * Add type="module" to specific Vite-compiled scripts.
 	 */
	
	public function add_module_to_scripts( $tag, $handle, $src ) {
    	// Define the script handles you want to load as ES Modules


    if ( in_array( $handle, self::handles, true ) ) {
        // Replace the opening script tag with type="module"
        $tag = str_replace( '<script ', '<script type="module" ', $tag );
    }

    return $tag;
}



}