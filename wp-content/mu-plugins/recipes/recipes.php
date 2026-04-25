<?php

/**
 * Plugin Name: LW Recipes
 * Author: Lisa Williams
 * Plugin URI: https://lisawilliams.net
 * Description: Set up a recipe custom post type with REST endpoint.
 * Text Domain: lw_recipes
 */


/**
 * Set up the recipe custom post type
 */
function custom_post_type()  {

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
			array( 'lw-recipes/recipe-content'),
			array( 'lw-recipes/recipe-post-nav'),
			array( 'lw-recipes/recipe-related')
		),
		'template_lock' => 'all',
		'labels' => $labels

	);

	// Registering your Custom Post Type
	register_post_type( 'recipe', $args );

}

/* Hook into the 'init' action so that the function
* Containing our post type registration is not
* unnecessarily executed.
*/

add_action( 'init', 'custom_post_type' );

function register_taxonomies()  {
	// Add new taxonomy, make it hierarchical (like categories)
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

	$labels_diet = array(
		'name'                       => _x('Diet', 'Taxonomy general name', 'lw_recipes'),
		'singular_name'              => _x('Diet', 'Taxonomy singular name', 'lw_recipes'),
		'search_items'               => _x('Search Diets', 'Taxonomy search label', 'lw_recipes'),
		'popular_items'              => null,
		'all_items'                  => _x('All Diets', 'Taxonomy all label', 'lw_recipes'),
		'edit_item'                  => _x('Edit Diet', 'Taxonomy edit label', 'lw_recipes'),
		'update_item'                => _x('Update Diet', 'Taxonomy update label', 'lw_recipes'),
		'add_new_item'               => _x('Add New Diet', 'Taxonomy new label', 'lw_recipes'),
		'new_item_name'              => _x('New Diet Name', 'Taxonomy new name label', 'lw_recipes'),
		'separate_items_with_commas' => null,
		'add_or_remove_items'        => null,
		'choose_from_most_used'      => null,
		'back_to_items'              => _x('&larr; Back to Diets', 'Taxonomy back label', 'lw_recipes'),
	);

	$args_diet = array(
		'description' => __('Diets like vegan, paleo, etc.', 'lw_recipes'),
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
		'labels' => $labels_diet
	);

	register_taxonomy( 'diet', array( 'recipe' ), $args_diet );

	$labels_protein = array(
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

	$args_protein = array(
		'description' => __('Proteins like beef, chicken, beans, etc.', 'lw_recipes'),
		'public' => true,
		'publicly_queryable' => false,
		'hierarchical' => true,
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
		'labels' => $labels_protein
	);

	register_taxonomy( 'protein', array( 'recipe' ), $args_protein );

	$labels_allergen = array(
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

	$args_allergen = array(
		'description' => __('Allergens like gluten free, dairy free, nut free, etc.', 'lw_recipes'),
		'public' => true,
		//'publicly_queryable' => false,
		'hierarchical' => true,
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
		'labels' => $labels_allergen
	);

	register_taxonomy( 'allergen', array( 'recipe' ), $args_allergen );


}
add_action( 'init', 'register_taxonomies' );


function recipes_endpoint() {
	register_rest_route( 'lw-recipes/v1', '/recipes', array(
		'methods'  => WP_REST_SERVER::READABLE,
		'callback' => 'custom_recipes_callback',
	) );
	register_rest_route( 'lw-recipes/v1', '/links', array(
		'methods'  => WP_REST_SERVER::READABLE,
		'callback' => 'links_endpoint',
	) );
}
add_action( 'rest_api_init', 'recipes_endpoint' );

function links_endpoint($request) {
	$search_query = $request->get_param( 'search' );

	$query_args = array(
		'posts_per_page' => 10,
		'post_type' => 'any'
	);

	if ( ! empty( $search_query ) ) {
		$query_args['s'] = sanitize_text_field($search_query); // Add the search query parameter to the query arguments
	}

	$links = new WP_Query( $query_args );

	$result = array();

	foreach ( $links->posts as $link ) { 

		$data = [];

		//Create the fields
		$data['title'] = html_entity_decode(get_the_title($link->ID));
		$data['id'] = $link->ID;
		$data['link'] = get_permalink($link->ID);
		$result[] = $data;
	}

	return $result;

}

function custom_recipes_callback( $request ) {
	$course = $request->get_param( 'course' );
	$diet = $request->get_param( 'diet' );
	$allergen = $request->get_param('allergen');
	$search_query = $request->get_param( 'search' ); // Get the search query parameter

	$tax_query = [];

	if ( ! empty( $course ) ) {
		$course = urldecode($course);
		$course = explode(" ", $course);

		$tax_query[] = array(
			'taxonomy' => 'course',
			'terms'    => $course

		);
	}


	if ( ! empty( $diet ) ) {
		$diet = urldecode($diet);
		$diet = explode(" ", $diet);
		$tax_query[] = array(
			'taxonomy' => 'diet',
			'terms'    => $diet
		);
	}

	if ( ! empty( $allergen ) ) {
		$allergen = urldecode($allergen);
		$allergen = explode(" ", $allergen);
		$tax_query[] = array(
			'taxonomy' => 'allergen',
			'terms'    => $allergen
		);
	}

	if (count($tax_query) > 1) {
		$tax_query = array_merge( [ 'relation' => 'AND' ], $tax_query );
	}

	if ($request->get_param( 'pg' )) {
		$page = $request->get_param( 'pg' );
	}
	else {
		$page = 1;
	}

	$query_args = array(
		'post_type' => 'recipe',
		'tax_query' => $tax_query,
		'paged' => $page,
		'posts_per_page' => 10
	);


	if ( ! empty( $search_query ) ) {
		$query_args['s'] = sanitize_text_field($search_query); // Add the search query parameter to the query arguments
	}

	$recipes = new WP_Query( $query_args );

	$result = array();

	$controller = new WP_REST_Posts_Controller( 'recipe' );


	foreach ( $recipes->posts as $recipe ) {

		$data = [];

		//Create the fields
		$data['id'] = $recipe->ID;
		$data['title']['rendered'] = get_the_title($recipe->ID);
		$data['link'] = get_permalink($recipe->ID);
		$data['description'] = get_the_excerpt($recipe->ID);

		//Build the image field
		$image_id = get_post_thumbnail_id($recipe->ID);

		if (!empty($image_id)) {
			$data['image'] = [];
			$attachment_alt = get_post_meta( $image_id, '_wp_attachment_image_alt', true );

			$attachment_metadata = wp_get_attachment_metadata( $image_id );

			if ( $attachment_metadata ) {
				// Get the base URL for the uploads directory
				$uploads_dir = wp_get_upload_dir();
				$base_url = $uploads_dir['baseurl'];

				// Get the year/month from the main file
				$year_month = substr( $attachment_metadata['file'], 0, 7 );

				// Loop through the image sizes in the metadata
				foreach ( $attachment_metadata['sizes'] as $size => $data1 ) {
					// Add the absolute URL to each image size
					$filename = $year_month . '/' . $data1['file'];
					$attachment_metadata['sizes'][$size]['url'] = $base_url . '/' . $filename;
				}
			}
			$data['image']['width'] = $attachment_metadata['width'];
			$data['image']['height'] = $attachment_metadata['height'];
			$data['image']['file'] = $attachment_metadata['file'];
			$data['image']['sizes'] = $attachment_metadata['sizes'];
			$data['image']['alt'] = $attachment_alt;

		}



		// Build the data for taxonomies
		$course_terms = get_the_terms($recipe->ID, 'course');
		$diet_terms = get_the_terms($recipe->ID, 'diet');
		$allergen_terms = get_the_terms($recipe->ID, 'allergen');

		if (isset($course_terms) && !empty($course_terms)) {

			foreach ($course_terms as $term) {
				$data['course'][] = array(
					'term_id' => $term->term_id,
					'term_name' => html_entity_decode($term->name),
					'taxonomy' => 'course'
				);
			}
		}

		if (isset($diet_terms) && !empty($diet_terms)) {
			foreach ($diet_terms as $term) {
				$data['diet'][] = array(
					'term_id' => $term->term_id,
					'term_name' => html_entity_decode($term->name),
					'taxonomy' => 'diet'
				);
			}
		}


		if (isset($allergen_terms) && !empty($allergen_terms)) {
			foreach ($allergen_terms as $term) {
				$data['allergen'][] = array(
					'term_id' => $term->term_id,
					'term_name' => html_entity_decode($term->name),
					'taxonomy' => 'allergen'
				);
			}
		}



		$result['data'][] = $data;

	}


	$max_pages = $recipes->max_num_pages;

	return array(
		'result'     => $result,
		'total_pages' => $max_pages
	);
}

add_filter( 'should_load_separate_core_block_assets', '__return_true' );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function lw_recipes_lw_recipes_block_init() {
	register_block_type( __DIR__ . '/blocks/build/hero-image' );
	register_block_type( __DIR__ . '/blocks/build/hero-image-heading' );
	register_block_type( __DIR__ . '/blocks/build/hero-image-subtitle' );
	register_block_type( __DIR__ . '/blocks/build/hero-image-cta' );
	register_block_type( __DIR__ . '/blocks/build/latest-recipes');
	register_block_type( __DIR__ . '/blocks/build/recipe');
	register_block_type( __DIR__ . '/blocks/build/recipe-complex');
	register_block_type( __DIR__ . '/blocks/build/recipe-complex-ingredient');
	register_block_type( __DIR__ . '/blocks/build/recipe-complex-ingredients');
	register_block_type( __DIR__ . '/blocks/build/recipe-complex-instructions');
	register_block_type( __DIR__ . '/blocks/build/recipe-content');
	register_block_type( __DIR__ . '/blocks/build/recipe-overview');
	register_block_type( __DIR__ . '/blocks/build/recipe-post-nav');
	register_block_type( __DIR__ . '/blocks/build/recipe-related');
	register_block_type( __DIR__ . '/blocks/build/recipe-search');
	register_block_type( __DIR__ . '/blocks/build/recipe-simple');
	register_block_type( __DIR__ . '/blocks/build/recipe-simple-ingredients');
	register_block_type( __DIR__ . '/blocks/build/recipe-simple-instructions');
	register_block_type( __DIR__ . '/blocks/build/recipe-taxonomy');
	register_block_type( __DIR__ . '/blocks/build/header');
	register_block_type( __DIR__ . '/blocks/build/social-media-item');
	register_block_type( __DIR__ . '/blocks/build/social-media');
	register_block_type( __DIR__ . '/blocks/build/footer');
}
add_action( 'init', 'lw_recipes_lw_recipes_block_init' );


/*add_action( 'admin_menu', 'recipes_menu' );


function recipes_menu() {
	add_options_page( 'Recipe Settings', 'Recipe Settings', 'manage_options', 'recipe_settings', 'recipe_options' );
}


function recipe_options() {
	if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
	}
	echo '<div class="wrap">';
	echo '<p>Here is where the form would go if I actually had options.</p>';
	echo '</div>';
}

add_submenu_page( 'options-general.php', 'Recipe Settings', 'Recipe Settings', 'manage_options', 'recipe_options', 'recipe_options'); */


/* Block Helper Functions  */

//Check to see if we are in the block editor. Code borrowed from Advanced Custom Fields Pro
function is_in_block_editor() {
	if (function_exists('get_current_screen')) {
		$screen = get_current_screen();
		if ($screen && method_exists($screen, 'is_block_editor')) {
			return $screen->is_block_editor();
		}
	}
	return false;
}
function get_menu() {
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

add_action( 'rest_api_init', function () {
    register_rest_route( 'wp/v2', 'menu', array(
        'methods' => 'GET',
        'callback' => 'get_menu',
    ) );
} );

function recipes_block_editor_assets() {
  wp_enqueue_style('recipes-block-editor-styles', plugin_dir_url( __FILE__ ) . 'blocks/assets/block-editor.css');
  wp_enqueue_script('recipes-metabox', plugin_dir_url( __FILE__ ) . 'metabox/dist/editor-panel.js',  [ 'wp-plugins', 'wp-editor', 'wp-components', 'wp-element', 'wp-data' ], '1.0.0', true);

}
add_action( 'enqueue_block_editor_assets', 'recipes_block_editor_assets' );


/* Credit to https://github.com/alleyinteractive/create-wordpress-theme for most of this function. 
   Removes the wrapper, div.wp-site-blocks, from the front end	
*/


/**
 * Filters the content of a 'core/template-part' block.
 *
 * @phpstan-param array{attrs: array<string, mixed>} $block
 *
 * @param string $block_content The block content.
 * @param array  $block         The full block, including name and attributes.
 * @return string
 */
function remove_core_template_part_wrapper( $block_content, $block ) {

		$proc = new \WP_HTML_Tag_Processor( $block_content );

		if ( true === $proc->next_tag() ) {
			$block_content = trim( $block_content );

			// Remove opening tag.
			$block_content = substr(
				$block_content,
				strpos( $block_content, '>' ) + 1
			);

			// Remove closing tag.
			$block_content = substr(
				$block_content,
				0,
				strlen( $block_content ) - strlen( "</{$proc->get_tag()}>" ),
			);

			$block_content = trim( $block_content );
		}


	return $block_content;
}

add_filter( 'render_block_core/template-part', 'remove_core_template_part_wrapper', 10, 2 );