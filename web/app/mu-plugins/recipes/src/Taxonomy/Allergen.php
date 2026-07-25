<?php

namespace Recipes\Taxonomy;

final class Allergen {

	public function __construct() {
		add_action('init', [$this, 'register_taxonomy']);

	}

	public function register_taxonomy()  {

    $labels = array(
		'name'                       => _x('Allergen', 'Taxonomy general name', 'lw_recipes'),
		'singular_name'              => _x('Allergen', 'Taxonomy singular name', 'lw_recipes'),
		'search_items'               => _x('Search Allergens', 'Taxonomy search label', 'lw_recipes'),
		'popular_items'              => null,
		'all_items'                  => _x('All Allergens', 'Taxonomy all label', 'lw_recipes'),
		'edit_item'                  => _x('Edit Allergen', 'Taxonomy edit label', 'lw_recipes'),
		'update_item'                => _x('Update Allergen', 'Taxonomy update label', 'lw_recipes'),
		'add_new_item'               => _x('Add New Allergen', 'Taxonomy new label', 'lw_recipes'),
		'new_item_name'              => _x('New Allergen Name', 'Taxonomy new name label', 'lw_recipes'),
		'separate_items_with_commas' => null,
		'add_or_remove_items'        => null,
		'choose_from_most_used'      => null,
		'back_to_items'              => _x('&larr; Back to Allergens', 'Taxonomy back label', 'lw_recipes'),
	);

	$args = array(
		'description' => __('Allergens like gluten free, dairy free, nut free, etc.', 'lw_recipes'),
		'public' => true,
		//'publicly_queryable' => false,
		'hierarchical' => false,
		'show_admin_column' => true,
		'show_in_nav_menus' => false,
		'capabilities' => [
			'manage_terms' => 'manage_categories',
			'edit_terms' => 'manage_categories',
			'delete_terms' => 'manage_categories',
			'assign_terms' => 'edit_posts',
		],
		'rewrite' => false,
		'show_in_rest' => true,
		'query_var' => false,
		'show_ui' => true,
		'labels' => $labels
	);

	register_taxonomy( 'allergen', array( 'recipe' ), $args );

}

}