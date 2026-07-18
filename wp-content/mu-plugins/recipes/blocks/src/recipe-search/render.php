<?php

use Recipes\Blocks\BlockHelper;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) {

	$recipe_rest = new \Recipes\Rest\Recipe();

	$mock_request = new \WP_REST_Request( 'GET', '/lw-recipes/v1/recipes' );

	foreach ($_GET as $key => $value) {
    	if (!is_array($value)) {
        	$mock_request->set_param($key, sanitize_text_field($value));
    	}
	}

	$current_courses = $recipe_rest->get_array_param($mock_request, 'course');
	$current_diets = $recipe_rest->get_array_param($mock_request, 'diet');
	$current_allergens = $recipe_rest->get_array_param($mock_request, 'allergen');

	$has_active_filters = false;

	$params = ['course', 'diet', 'allergen', 'search'];


	if (!empty(array_intersect($params, array_keys($_GET)))) {
		$has_active_filters = true;
	}

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

		$courses[] = $course_row;
	}

	$diet_data = get_terms(array('taxonomy' => 'diet'));
	$diets = [];

	foreach ($diet_data as $diet) {
		$diet_row['id'] = $diet->term_id;
		$diet_row['name'] = $diet->name;
		$diet_row['slug'] = $diet->slug;
		$diet_row['taxonomy'] = 'diet';

		$diets[] = $diet_row;
	}

	$allergen_data = get_terms(array('taxonomy' => 'allergen'));
	$allergens = [];

	foreach ($allergen_data as $allergen) {
		$allergen_row['id'] = $allergen->term_id;
		$allergen_row['name'] = $allergen->name;
		$allergen_row['slug'] = $allergen->slug;
		$allergen_row['taxonomy'] = 'allergen';

		$allergens[] = $allergen_row;
	}


	// 4. Generate the initial HTML markup
	$initial_results    = $recipe_rest->build_results( $recipes );
	$current_page       = $mock_request->get_param( 'pg' ) ? intval( $mock_request->get_param( 'pg' ) ) : 1;
	$total_pages        = intval( $recipes->max_num_pages );
	$initial_pagination = $recipe_rest->build_pagination( $total_pages, $current_page );

?>

	<div id="root">
		<div class="recipes-search mx-auto">
			<div class="form mt-8 mb-8 md:mt-12 md:mb-12">
				<form role="search" class="grid grid-cols-[1fr_40px] gap-x-2" id="recipe-search-form" method="GET">
					<label for="search" class="sr-only"><?php _e('Search', 'lw-recipes'); ?></label>
					<input type="text" id="search" class="rounded-sm border border-(--color-mid-green) border-solid p-2" name="search" placeholder="Search Recipes..." value="<?php echo esc_attr($_GET['search'] ?? ''); ?>">
					<button id="listing--search" class="button p-[10px] inline-block rounded-sm text-(--color-white) font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"><?php _e('Go', 'lw-recipes'); ?></button>
				</form>
				<?php if ($has_active_filters) { ?>
					<div class="pt-5 flex flex-wrap gap-x-5 min-h-[56px]">
					</div>
				<?php } ?>
			</div>
			<div class="results-container md:grid md:grid-cols-[0.5fr_2fr] md:gap-4">
				<div class="refiners mb-8 md:mb-0">
					<div class="refiner-fieldset mb-4">
						<fieldset>
							<legend class="sr-only"><?php _e('Filter by Course', 'lw-recipes'); ?></legend>
							<details class="tax-refiner">
          						<summary class="cursor-pointer text-(--color-mid-green) font-medium p-2 border-1 w-full rounded-t-sm md:border-0 md:rounded-t-none md:w-auto md:p-0">
            						<?php _e('Course', 'lw-recipes'); ?>
          						</summary>
								<?php if (!empty($courses)) {
									foreach ($courses as $course) { ?>
										<div class="refiner-checkbox">
											<input id="<?php echo $course['id']; ?>" data-slug="course" type="checkbox" value="<?php echo $course['id']; ?>" name="course" form="recipe-search-form"  <?php checked(in_array($course['id'], $current_courses)); ?>>
											<label for="<?php echo $course['id'] ?>" class="pl-2 text-(--color-dark-green)"><?php echo $course['name'] ?></label>
										</div>
								<?php } } ?>
							</details>
						</fieldset>
					</div>
					<div class="refiner-fieldset mb-4">
						<fieldset>
							<legend class="sr-only"><?php _e('Filter by Diet', 'lw-recipes'); ?></legend>
							<details class="tax-refiner">
								<summary class="cursor-pointer text-(--color-mid-green) font-medium p-2 border-1 w-full rounded-t-sm md:border-0 md:rounded-t-none md:w-auto md:p-0">
									<?php _e('Diet', 'lw-recipes'); ?>
								</summary>
								<?php if (!empty($diets)) {
								  	  foreach ($diets as $diet) { ?>
										<div class="refiner-checkbox">
											<input id="<?php echo $diet['id']; ?>" data-slug="diet" type="checkbox" value="<?php echo $diet['id']; ?>" form="recipe-search-form" name="diet"  <?php checked(in_array($diet['id'], $current_diets)); ?>>
											<label for="<?php echo $diet['id']; ?>" class="pl-2 text-(--color-dark-green)"><?php echo $diet['name']; ?></label>
										 </div>
							<?php } } ?>
							</details>
						</fieldset>
					</div>
					<div class="refiner-fieldset mb-4">
						<fieldset>
							<legend class="sr-only"><?php _e('Filter by Allergen', 'lw-recipes'); ?></legend>
							<details class="tax-refiner">
								<summary class="cursor-pointer text-(--color-mid-green) font-medium p-2 border-1 w-full rounded-t-sm md:border-0 md:rounded-t-none md:w-auto md:p-0">
									<?php _e('Allergen', 'lw-recipes'); ?>
								</summary>
								<?php if (!empty($allergens)) {
								  	  foreach ($allergens as $allergen) { ?>
								<div class="refiner-checkbox">
									<input id="<?php echo $allergen['id']; ?>" data-slug="allergen" type="checkbox" value="<?php echo $allergen['id']; ?>" form="recipe-search-form" name="allergen"  <?php checked(in_array($allergen['id'], $current_allergens)); ?>>
									<label for="<?php echo $allergen['id']; ?>" class="pl-2 text-(--color-dark-green)"><?php echo $allergen['name']; ?></label>
								</div>
							<?php } } ?>
							</details>
						</fieldset>
					</div>
				</div>
				<div class="results">
					<?php echo $initial_results; ?>
				</div>
				<div class="pagination md:col-start-2 pb-5">
					<?php echo $initial_pagination; ?>
				</div>
			</div>
		</div>
	</div>
<script type="text/javascript">
    window.INITIAL_RECIPE_DATA = <?php echo wp_json_encode([
        'result'     => $initial_results, 
        'pagination' => $initial_pagination,
        'taxonomies' => [
        	'course' => $courses,
        	'diet' => $diets,
        	'allergen' => $allergens
        ]
    ]); ?>;
</script>
<?php } ?>

