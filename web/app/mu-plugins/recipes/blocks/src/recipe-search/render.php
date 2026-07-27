<?php

namespace Recipes\Blocks\RecipeSearch;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) {

	$recipe_rest = new \Recipes\Rest\Recipe();

	$mock_request = new \WP_REST_Request( 'GET', '/lw-recipes/v1/recipes' );

	$allowed_keys = ['search', 'pg'];

	foreach ($allowed_keys as $key) {
    if (isset($_GET[$key])) {
        $mock_request->set_param(
            $key,
            sanitize_text_field(wp_unslash($_GET[$key]))
        );
    }
}

	$current_courses = $recipe_rest->get_array_param($mock_request, 'course');
	$current_diets = $recipe_rest->get_array_param($mock_request, 'diet');
	$current_allergens = $recipe_rest->get_array_param($mock_request, 'allergen');

	$has_active_filters =
    !empty($mock_request->get_param('search')) ||
    !empty($current_courses) ||
    !empty($current_diets) ||
    !empty($current_allergens);

	$query_args = $recipe_rest->build_query( $mock_request );
	$recipes    = new \WP_Query( $query_args );


	//Build taxonomy data
	$course_data = get_terms(array('taxonomy' => 'course'));
	$courses = [];

	foreach ($course_data as $course) {
		$course_row['id'] = $course->term_id;
		$course_row['name'] = $course->name;
		$course_row['slug'] = $course->slug;
		$course_row['taxonomy'] = 'course';
		$course_row['checked'] = in_array($course->term_id, $current_courses, true);

		$courses[] = $course_row;
	}

	$diet_data = get_terms(array('taxonomy' => 'diet'));
	$diets = [];

	foreach ($diet_data as $diet) {
		$diet_row['id'] = $diet->term_id;
		$diet_row['name'] = $diet->name;
		$diet_row['slug'] = $diet->slug;
		$diet_row['taxonomy'] = 'diet';
		$diet_row['checked'] = in_array($diet->term_id, $current_diets, true);

		$diets[] = $diet_row;
	}

	$allergen_data = get_terms(array('taxonomy' => 'allergen'));
	$allergens = [];

	foreach ($allergen_data as $allergen) {
		$allergen_row['id'] = $allergen->term_id;
		$allergen_row['name'] = $allergen->name;
		$allergen_row['slug'] = $allergen->slug;
		$allergen_row['taxonomy'] = 'allergen';
		$allergen_row['checked'] = in_array($allergen->term_id, $current_allergens, true);

		$allergens[] = $allergen_row;
	}

	$courses_non_js = [
		'name' => 'Course',
		'terms' => $courses
	];

	$diet_non_js = [
		'name' => 'Diet',
		'terms' => $diets
	];

	$allergen_non_js = [
		'name' => 'Allergen',
		'terms' => $allergens
	];

	$non_js_filters = [$courses_non_js, $diet_non_js, $allergen_non_js];

	// 4. Generate the initial HTML markup
	$initial_results    = $recipe_rest->build_results( $recipes );
	$current_page       = $mock_request->get_param( 'pg' ) ? intval( $mock_request->get_param( 'pg' ) ) : 1;
	$total_pages        = intval( $recipes->max_num_pages );
	$initial_pagination = $recipe_rest->build_pagination( $total_pages, $current_page );

	Timber::render('recipe-search/non-js.twig',
    	[
        	'results' => $initial_results,
        	'pagination' => $initial_pagination,
        	'filters' => $non_js_filters,
        	'param_search' => sanitize_text_field($mock_request->get_param('search')),
        	'has_active_filters' => $has_active_filters

    	]
);


?>


<script type="text/javascript">
    window.INITIAL_RECIPE_DATA = <?php echo wp_json_encode([
        'result'     => $initial_results, 
        'pagination' => $initial_pagination,
        'taxonomies' => [
        	'course' => $courses,
        	'diet' => $diets,
        	'allergen' => $allergens
        ], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT
    ]); ?>;
</script>
<?php } ?>

