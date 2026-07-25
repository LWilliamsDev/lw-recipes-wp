<?php

namespace Recipes\Taxonomy;

final class Protein {

	public function __construct() {
		add_action('init', [$this, 'register_taxonomy']);

	}

	public function register_taxonomy()  {

    $labels = array(
		'name'                       => _x('Protein', 'Taxonomy general name', 'lw_recipes'),
		'singular_name'              => _x('Protein', 'Taxonomy singular name', 'lw_recipes'),
		'search_items'               => _x('Search Proteins', 'Taxonomy search label', 'lw_recipes'),
		'popular_items'              => null,
		'all_items'                  => _x('All Proteins', 'Taxonomy all label', 'lw_recipes'),
		'edit_item'                  => _x('Edit Protein', 'Taxonomy edit label', 'lw_recipes'),
		'update_item'                 => _x('Update Protein', 'Taxonomy update label', 'lw_recipes'),
		'add_new_item'               => _x('Add New Protein', 'Taxonomy new label', 'lw_recipes'),
		'new_item_name'              => _x('New Protein Name', 'Taxonomy new name label', 'lw_recipes'),
		'separate_items_with_commas' => null,
		'add_or_remove_items'        => null,
		'choose_from_most_used'      => null,
		'back_to_items'              => _x('&larr; Back to Proteins', 'Taxonomy back label', 'lw_recipes'),
	);

	$args = array(
		'description' => __('Proteins like beef, chicken, beans, etc.', 'lw_recipes'),
		'public' => true,
		'publicly_queryable' => false,
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

	register_taxonomy( 'protein', array( 'recipe' ), $args );

}

}