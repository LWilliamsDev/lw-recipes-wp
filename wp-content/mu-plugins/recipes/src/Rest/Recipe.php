<?php

namespace Recipes\Rest;

final class Recipe {

	public function __construct() {
		add_action('rest_api_init', [$this, 'register_route']);

	}

	public function register_route()  {

    	register_rest_route( 'lw-recipes/v1', '/recipes', array(
		'methods'  => \WP_REST_SERVER::READABLE,
		'callback' => [$this, 'rest_response'],
		 ) );

	}

	public function rest_response($request) {
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

		$recipes = new \WP_Query( $query_args );

		$result = array();


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

}