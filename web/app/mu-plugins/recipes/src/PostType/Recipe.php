<?php

declare(strict_types=1);

namespace Recipes\PostType;

final class Recipe {

	public function __construct() {
		add_action('init', [$this, 'register_cpt']);

	}

	public function register_cpt(): void  {

    // Set UI labels for Custom Post Type
	$labels = array(
		'name'                  => _x('Recipe', 'Post type general name', 'lw_recipes'),
		'singular_name'         => _x('Recipe', 'Post type singular name', 'lw_recipes'),
		'menu_name'             => _x('Recipe', 'Admin Menu text', 'lw_recipes'),
		'name_admin_bar'        => _x('Recipe', 'Add New on Toolbar', 'lw_recipes'),
		'add_new'               => __('Add New', 'lw_recipes'),
		'add_new_item'          => __('Add New Recipe', 'lw_recipes'),
		'new_item'              => __('New Recipe', 'lw_recipes'),
		'edit_item'             => __('Edit Recipe', 'lw_recipes'),
		'view_item'             => __('View Recipe', 'lw_recipes'),
		'all_items'             => __('All Recipes', 'lw_recipes'),
		'search_items'          => __('Search Recipes', 'lw_recipes'),
		'parent_item_colon'     => __('Parent Recipe:', 'lw_recipes'),
		'not_found'             => __('No recipe found.', 'lw_recipes'),
		'not_found_in_trash'    => __('No recipe found in Trash.', 'lw_recipes'),
		'featured_image'        => _x('Recipe Cover Image', 'Overrides the "Featured Image" phrase for this post type. Added in 4.3', 'lw_recipes'),
		'set_featured_image'    => _x('Set cover image', 'Overrides the "Set featured image" phrase for this post type. Added in 4.3', 'lw_recipes'),
		'remove_featured_image' => _x('Remove cover image', 'Overrides the "Remove featured image" phrase for this post type. Added in 4.3', 'lw_recipes'),
		'use_featured_image'    => _x('Use as cover image', 'Overrides the "Use as featured image" phrase for this post type. Added in 4.3', 'lw_recipes'),
		'archives'              => _x('Recipe archives', 'The post type archive label used in nav menus. Default "Post Archives". Added in 4.4', 'lw_recipes'),
		'insert_into_item'      => _x('Insert into recipe', 'Overrides the "Insert into post"/"Insert into page" phrase (used when inserting media into a post). Added in 4.4', 'lw_recipes'),
		'uploaded_to_this_item' => _x('Uploaded to this recipe', 'Overrides the "Uploaded to this post"/"Uploaded to this page" phrase (used when viewing media attached to a post). Added in 4.4', 'lw_recipes'),
		'filter_items_list'     => _x('Filter recipe list', 'Screen reader text for the filter links heading on the post type listing screen. Default "Filter posts list"/"Filter pages list". Added in 4.4', 'lw_recipes'),
		'items_list_navigation' => _x('Recipes list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default "Posts list navigation"/"Pages list navigation". Added in 4.4', 'lw_recipes'),
		'items_list'            => _x('Recipes list', 'Screen reader text for the items list heading on the post type listing screen. Default "Posts list"/"Pages list". Added in 4.4', 'lw_recipes'),
	);

// Set other options for Custom Post Type

	$args = array(
		'public' => true,
		'show_in_menu' => true,
		'menu_position' => 21,
		'menu_icon' => 'dashicons-admin-users',
		'capability_type' => ['post', 'posts'],
		'map_meta_cap' => true,
		'hierarchical' => false,
		'supports' => [
			'title',
			'editor',
			'author',
			'excerpt',
			'revisions',
			'thumbnail'
		],
		'has_archive' => false,
		'rewrite' => [
			'slug' => 'recipe',
			'with_front' => false,
			'pages' => false,
		],
		'query_var' => false,
		'show_in_rest' => true,
		'taxonomies' => [
			'course',
			'diet',
			'protein',
			'allergen'
		],
		'template' => array(
			array( 'lw-recipes/recipe-template')
		),
		'template_lock' => 'all',
		'labels' => $labels

	);

	// Registering your Custom Post Type
	register_post_type( 'recipe', $args );

}

}