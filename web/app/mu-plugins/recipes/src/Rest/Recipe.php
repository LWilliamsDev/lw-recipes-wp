<?php

declare(strict_types=1);

namespace Recipes\Rest;

use Timber\Timber;

final class Recipe {

	public function __construct() {
		add_action('rest_api_init', [$this, 'register_route']);

	}

	public function register_route()  {

    	register_rest_route( 'lw-recipes/v1', '/recipes', array(
		'methods'  => \WP_REST_SERVER::READABLE,
		'callback' => [$this, 'rest_response'],
		'permission_callback' => '__return_true'
		) );

	}

	public function rest_response(\WP_REST_Request $request): array {

		$query_args = $this->build_query($request);

		$recipes = new \WP_Query( $query_args );

		$result = $this->build_results($recipes);

		if ($request->get_param( 'pg' )) {
			$page = $request->get_param( 'pg' );
		}
		else {
			$page = 1;
		}

		$total_pages = intval( $recipes->max_num_pages );

		$pagination = $this->build_pagination($total_pages, (int) $page);

		return array(
			'result'     => $result,
			'pagination' => $pagination
		);
	}

	public function build_query(\WP_REST_Request $request): array {
		$course = $this->get_array_param($request, 'course');
        $diet = $this->get_array_param($request, 'diet');
        $allergen = $this->get_array_param($request, 'allergen');
		$search_query = $request->get_param( 'search' ); // Get the search query parameter

		$tax_query = [];

		if ( ! empty( $course ) ) {
			$tax_query[] = array(
                'taxonomy' => 'course',
                'terms'    => $course,   // This is already a clean array, e.g., [5, 7]
            );
		}


		if ( ! empty( $diet ) ) {
			$tax_query[] = array(
                'taxonomy' => 'diet',
                'terms'    => $diet,   // This is already a clean array, e.g., [5, 7]
            );
		}

		if ( ! empty( $allergen ) ) {
			$tax_query[] = array(
                'taxonomy' => 'allergen',
                'terms'    => $allergen,   // This is already a clean array, e.g., [5, 7]
            );
		}

		if (count($tax_query) > 1) {
			$tax_query['relation'] = 'AND';
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


		return $query_args;

	}

    /*
    * PHP collapses duplicate non-array query parameters in $_GET.
    * Parse the raw query string so React-style URLs like course=7&course=5
    * preserve all selected taxonomy IDs.
    */

    public function get_array_param(\WP_REST_Request $request, string $key): array {
        $query_string = wp_parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);

        if ($query_string) {
            preg_match_all(
                '/(?:^|&)' . preg_quote($key, '/') . '=([^&]*)/',
                $query_string,
                $matches
            );

            if (!empty($matches[1])) {
                return array_map('intval', $matches[1]);
            }
        }   

        $value = $request->get_param($key);

        if (is_array($value)) {
            return array_map('intval', $value);
        }

        if ($value !== null && $value !== '') {
            return [(int) $value];
        }

        return [];
    }

	public function build_results(\WP_Query $query): string {
		// If there are no posts, return early
    	if ( empty($query->posts) ) {
        	return '<p>No recipes found.</p>';
    	}

        $posts = [];
		
	
		foreach ( $query->posts as $recipe ) {

            
            // 1. Fetch all assigned terms from your target taxonomies
            $taxonomies = array( 'course', 'diet', 'allergen' );
            $all_terms  = wp_get_object_terms( $recipe->ID, $taxonomies );
            $all_terms_data = [];
            
            // 2. Sort the terms alphabetically by their name
            if ( ! is_wp_error( $all_terms ) && ! empty( $all_terms ) ) {
                usort( $all_terms, function( $a, $b ) {
                    return strcasecmp( $a->name, $b->name );
                });


                foreach ($all_terms as $term) {
                    $all_terms_data[] = [
                        'link' => '?' . $term->taxonomy . '=' . $term->term_id,
                        'id' => $term->term_id,
                        'taxonomy' => $term->taxonomy,
                        'name' => $term->name
                    ]; 
                }
            } else {
                $all_terms = array();
            }

            $posts[] = [
                'title' => get_the_title($recipe),
                'link' => get_permalink($recipe),
                'excerpt' => get_the_excerpt($recipe),
                'thumbnail' => get_the_post_thumbnail($recipe, 'medium', ['class' => 'rounded-lg']),
                'terms' => $all_terms_data
            ];
        
        }

        return Timber::compile('recipe-search/results.twig', [
            'posts' => $posts,
        ]);
        
	}

	public function build_pagination(int $total_pages, int $current_page = 1): string
{
    if ($total_pages <= 1) {
        return '';
    }

    $active_page = max(1, (int) $current_page);
    $pages_to_show = 6;

    $prev_page = max(1, $active_page - 1);
    $next_page = min($total_pages, $active_page + 1);

    $side_pages = floor($pages_to_show / 2);
    $start_page = $active_page - $side_pages;
    $end_page = $active_page + $side_pages;

    if ($start_page < 1) {
        $end_page = min($total_pages, $end_page + (1 - $start_page));
        $start_page = 1;
    }

    if ($end_page > $total_pages) {
        $start_page = max(1, $start_page - ($end_page - $total_pages));
        $end_page = $total_pages;
    }

    $numbers = [];

    for ($i = $start_page; $i <= $end_page; $i++) {
        if ($i > 1 && $i < $total_pages) {
            $numbers[] = $i;
        }
    }

    return Timber::compile('recipe-search/pagination.twig', [
        'total_pages' => $total_pages,
        'active_page' => $active_page,
        'prev_page' => $prev_page,
        'next_page' => $next_page,
        'numbers' => $numbers,
    ]);
}

}