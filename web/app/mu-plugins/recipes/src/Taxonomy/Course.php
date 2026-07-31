<?php

declare(strict_types=1);

namespace Recipes\Taxonomy;

final class Course {

	public function __construct() {
		add_action('init', [$this, 'register_taxonomy']);

	}

	public function register_taxonomy(): void  {

    $labels = array(
		'name'                       => _x('Course', 'Taxonomy general name', 'lw_recipes'),
		'singular_name'              => _x('Course', 'Taxonomy singular name', 'lw_recipes'),
		'search_items'               => _x('Search Course', 'Taxonomy search label', 'lw_recipes'),
		'popular_items'              => null,
		'all_items'                  => _x('All Courses', 'Taxonomy all label', 'lw_recipes'),
		'edit_item'                  => _x('Edit Course', 'Taxonomy edit label', 'lw_recipes'),
		'update_item'                => _x('Update Course', 'Taxonomy update label', 'lw_recipes'),
		'add_new_item'               => _x('Add New Course', 'Taxonomy new label', 'lw_recipes'),
		'new_item_name'              => _x('New Course Name', 'Taxonomy new name label', 'lw_recipes'),
		'separate_items_with_commas' => null,
		'add_or_remove_items'        => null,
		'choose_from_most_used'      => null,
		'back_to_items'              => _x('&larr; Back to Courses', 'Taxonomy back label', 'lw_recipes'),
	);

	$args = array(
		'description' => __('Meal course like breakfast, lunch, dinner, etc.', 'lw_recipes'),
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
		'meta_box_cb' => false,
		'query_var' => true,
		'labels' => $labels,
		'show_in_rest' => true,
		'show_ui' => true
	);

	register_taxonomy( 'course', array( 'recipe' ), $args );

}

}