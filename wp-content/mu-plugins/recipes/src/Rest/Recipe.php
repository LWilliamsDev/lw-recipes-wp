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
		'permission_callback' => '__return_true'
		 ) );

	}

	public function rest_response($request) {

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

		$pagination = $this->build_pagination($total_pages, $page);

		return array(
			'result'     => $result,
			'pagination' => $pagination
		);
	}

	public function build_query($request) {
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

		return $query_args;

	}

	public function build_results($query) {
		// If there are no posts, return early
    	if ( empty($query->posts) ) {
        	return '<p>No recipes found.</p>';
    	}
		
		ob_start(); 
		foreach ( $query->posts as $recipe ) {

    	// Setup global post data so standard WP template tags work correctly
            setup_postdata( $recipe ); 
            
            // 1. Fetch all assigned terms from your target taxonomies
            $taxonomies = array( 'course', 'diet', 'allergen' );
            $all_terms  = wp_get_object_terms( $recipe->ID, $taxonomies );
            
            // 2. Sort the terms alphabetically by their name
            if ( ! is_wp_error( $all_terms ) && ! empty( $all_terms ) ) {
                usort( $all_terms, function( $a, $b ) {
                    return strcasecmp( $a->name, $b->name );
                });
            } else {
                $all_terms = array();
            }
            ?>
            <div class="result-item mb-12 lg:mb-20 lg:flex lg:flex-wrap">
                
                <!-- Featured Image -->
                <div class="lg:order-2 result-image lg:ml-auto mb-5 lg:mb-0">
                    <?php if ( has_post_thumbnail( $recipe->ID ) ) : ?>
                        <?php echo get_the_post_thumbnail( $recipe->ID, 'medium') ; ?>
                    <?php endif; ?>
                </div>
                
                <!-- Result Details -->
                <div class="lg:order-1 result-details">
                    <h2 class="text-2xl color-green text-(--color-green) mb-2">
                        <a href="<?php echo esc_url( get_permalink( $recipe->ID ) ); ?>">
                            <?php echo esc_html( get_the_title( $recipe->ID ) ); ?>
                        </a>
                    </h2>
                    
                    <p class="mb-4 text-(--color-dark-green)">
                        <?php echo esc_html( get_the_excerpt( $recipe->ID ) ); ?>
                    </p>
                    
                    <!-- Taxonomy Badges -->
                    <?php if ( ! empty( $all_terms ) ) : ?>
                        <ul class="flex gap-2 flex-wrap">
                            <?php foreach ( $all_terms as $term ) : ?>
                                <li>
                                   <a href="<?php echo esc_url( add_query_arg( $term->taxonomy, $term->term_id ) ); ?>"
                                       data-id="<?php echo esc_attr( $term->term_id ); ?>" 
                                       data-type="<?php echo esc_attr( $term->taxonomy ); ?>" 
                                       class="filter-link p-[5px] inline-block rounded-sm border-1 border-(--color-brown) text-(--color-brown) hover:text-(--color-white) hover:bg-(--color-brown) cursor-pointer">
                                        <?php echo esc_html( $term->name ); ?>
                                    </a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>

            </div>
            <?php 
        } 
        // Crucial: Clean up the global post object loop after we are finished
        wp_reset_postdata(); 
        ?>

	<?php	
	return ob_get_clean();
	}

	public function build_pagination( $total_pages, $current_page = 1 ) {
    
    if ( $total_pages <= 1 ) {
        return '';
    }

    $active_page   = max( 1, intval( $current_page ) );
    $pages_to_show = 6; // Max number of intermediate pages to display

    $prev_page = max( 1, $active_page - 1 );
    $next_page = min( $total_pages, $active_page + 1 );

    // --- Sliding Window Math Logic ---
    // Calculate a window around the active page
    $side_pages = floor( $pages_to_show / 2 );
    $start_page = $active_page - $side_pages;
    $end_page   = $active_page + $side_pages;

    // Adjust boundaries if the window overflows left or right
    if ( $start_page < 1 ) {
        $end_page   = min( $total_pages, $end_page + ( 1 - $start_page ) );
        $start_page = 1;
    }
    if ( $end_page > $total_pages ) {
        $start_page = max( 1, $start_page - ( $end_page - $total_pages ) );
        $end_page   = $total_pages;
    }

    // Build the middle page array, strictly excluding 1 and $total_pages
    // since those are rendered explicitly as static anchor blocks.
    $numbers = array();
    for ( $i = $start_page; $i <= $end_page; $i++ ) {
        if ( $i > 1 && $i < $total_pages ) {
            $numbers[] = intval($i);
        }
    }
    // ---------------------------------

    ob_start();
    ?>
    <nav class="pagination" aria-label="Pagination">
        <ul class="pagination-numbers flex gap-2">
            
            <!-- Back Button -->
            <?php if ( $active_page > 1 ) : ?>
                <li>
                    <a href="<?php echo esc_url( add_query_arg( 'pg', $prev_page ) ); ?>" 
                       data-page="<?php echo esc_attr($prev_page); ?>" 
                       class="filter-link cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)">Back</a>
                </li>
            <?php endif; ?>

            <!-- Page 1 Block -->
            <?php 
            $is_current = ( $active_page === 1 );
            $class = $is_current ? 'filter-link current-page cursor-pointer rounded-sm border-1 p-[5px] text-(--color-white)' : 'filter-link cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)';
            ?>
            <li>
                <a href="<?php echo esc_url( add_query_arg( 'pg', 1 ) ); ?>" 
                   data-page="1" 
                   class="<?php echo esc_attr( $class ); ?>"
                   <?php echo $is_current ? 'aria-current="page"' : ''; ?>>1</a>
            </li>

            <!-- Left Ellipsis (...) -->
            <?php if ( ! empty( $numbers ) && $numbers[0] > 2 ) : ?>
                <li class="p-[5px] text-(--color-mid-green)"><span> ... </span></li>
            <?php endif; ?>

            <!-- Middle Pages Loop -->
            <?php foreach ( $numbers as $number ) : 
                $is_current = ( $number === $active_page );
                $class = $is_current ? 'filter-link current-page cursor-pointer rounded-sm border-1 p-[5px] text-(--color-white)' : 'filter-link cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)';
                ?>
                <li>
                    <a href="<?php echo esc_url( add_query_arg( 'pg', $number ) ); ?>" 
                       data-page="<?php echo esc_attr( $number ); ?>" 
                       class="<?php echo esc_attr( $class ); ?>"
                       <?php echo $is_current ? 'aria-current="page"' : ''; ?>><?php echo esc_html( $number ); ?></a>
                </li>
            <?php endforeach; ?>

            <!-- Right Ellipsis (...) -->
            <?php if ( ! empty( $numbers ) && end( $numbers ) < ( $total_pages - 1 ) ) : ?>
                <li class="p-[5px] text-(--color-mid-green)"><span> ... </span></li>
            <?php endif; ?>

            <!-- Last Page Block -->
            <?php if ( $total_pages > 1 ) : 
                $is_current = ( $active_page === $total_pages );
                $class = $is_current ? 'filter-link current-page cursor-pointer rounded-sm border-1 p-[5px] text-(--color-white)' : 'filter-link cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)';
                ?>
                <li>
                    <a href="<?php echo esc_url( add_query_arg( 'pg', $total_pages ) ); ?>" 
                       data-page="<?php echo esc_attr( $total_pages ); ?>" 
                       class="<?php echo esc_attr( $class ); ?>"
                       <?php echo $is_current ? 'aria-current="page"' : ''; ?>><?php echo esc_html( $total_pages ); ?></a>
                </li>
            <?php endif; ?>

            <!-- Next Button -->
            <?php if ( $active_page < $total_pages ) : ?>
                <li>
                    <a href="<?php echo esc_url( add_query_arg( 'pg', $next_page ) ); ?>" 
                       data-page="<?php echo esc_attr($next_page); ?>" 
                       class="filter-link cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)">Next</a>
                </li>
            <?php endif; ?>

        </ul>
    </nav>
    <?php
    return ob_get_clean();
	}

}