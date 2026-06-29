<?php

namespace Recipes\Rest;

final class Menu {

	public function __construct() {
		add_action('rest_api_init', [$this, 'register_route']);

	}

	public function register_route()  {

    	register_rest_route( 'wp/v2', '/menu', array(
		'methods'  => \WP_REST_SERVER::READABLE,
		'callback' => [$this, 'rest_response'],
		'permission_callback' => '__return true'
		 ) );

	}

	public function rest_response($response) {
		// Get all menu items
    	$menu_items = wp_get_nav_menu_items('Main Menu');

   		// Filter to only get top-level (first-level) menu items
    	$first_level_items = array_filter($menu_items, function($item) {
        	// Check for top-level items
        	return $item->menu_item_parent == 0;
    	});

    	// Reindex array to prevent gaps in indices
	    $first_level_items = array_values($first_level_items);

    	return $first_level_items;

	}
}