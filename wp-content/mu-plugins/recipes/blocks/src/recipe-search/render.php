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
							<legend class="w-full md:w-auto">
								<button class="cursor-pointer text-(--color-mid-green) font-medium p-2 border-1 w-full rounded-t-sm md:border-0 md:rounded-t-none md:w-auto md:p-0" aria-label="<?php _e('Toggle Courses refiner', 'lw-recipes'); ?>" id="course--btn" aria-controls="course--container">
									<span class="tax-name"><?php _e('Course', 'lw-recipes'); ?></span>
									<span>+</span>
								</button>
							</legend>
							<div class="checkboxes rounded-b-sm border-x border-b p-2 md:rounded-b-none md:border-none md:p-0" id="course--container">
								<?php $courses = get_terms(array('taxonomy' => 'course')); 
									foreach ($courses as $course) { ?>
										<div class="refiner-checkbox">
											<input id="<?php echo $course->term_id; ?>" data-slug="course" type="checkbox" value="<?php echo $course->term_id; ?>" name="course" form="recipe-search-form"  <?php checked(in_array($course->term_id, $current_courses)); ?>>
											<label for="<?php echo $course->term_id; ?>" class="pl-2 text-(--color-dark-green)"><?php echo $course->name; ?></label>
								</div>
								<?php } ?>
							</div>
						</fieldset>
					</div>
					<div class="refiner-fieldset mb-4">
						<fieldset>
							<legend class="w-full md:w-auto">
								<button class="cursor-pointer text-(--color-mid-green) font-medium p-2 border-1 w-full rounded-t-sm md:border-0 md:rounded-t-none md:w-auto md:p-0" aria-label="<?php _e('Toggle Diet refiner', 'lw-recipes'); ?>" id="diet--btn" aria-controls="diet--container">
									<span class="tax-name"><?php _e('Diet', 'lw-recipes'); ?></span>
									<span>+</span>
								</button>
							</legend>
							<div class="checkboxes rounded-b-sm border-x border-b p-2 md:rounded-b-none md:border-none md:p-0" id="diet--container">
								<?php $diets = get_terms(array('taxonomy' => 'diet'));
								  	  foreach ($diets as $diet) { ?>
										<div class="refiner-checkbox">
											<input id="<?php echo $diet->term_id; ?>" data-slug="diet" type="checkbox" value="<?php echo $diet->term_id; ?>" form="recipe-search-form" name="diet"  <?php checked(in_array($diet->term_id, $current_diets)); ?>>
											<label for="<?php echo $diet->term_id; ?>" class="pl-2 text-(--color-dark-green)"><?php echo $diet->name; ?></label>
										 </div>
							<?php } ?>
							</div>
						</fieldset>
					</div>
					<div class="refiner-fieldset mb-4">
						<fieldset>
							<legend class="w-full md:w-auto">
								<button class="cursor-pointer text-(--color-mid-green) font-medium p-2 border-1 w-full rounded-t-sm md:border-0 md:rounded-t-none md:w-auto md:p-0" aria-label="<?php _e('Toggle Allergen refiner', 'lw-recipes'); ?>" id="allergen--btn" aria-controls="allergen--container">
									<span class="tax-name"><?php _e('Allergen', 'lw-recipes'); ?></span>
									<span>+</span>
								</button>
							</legend>
							<div class="checkboxes rounded-b-sm border-x border-b p-2 md:rounded-b-none md:border-none md:p-0" id="allergen--container">
								<?php $allergens = get_terms(array('taxonomy' => 'allergen'));
								  	  foreach ($allergens as $allergen) { ?>
								<div class="refiner-checkbox">
									<input id="<?php echo $allergen->term_id; ?>" data-slug="allergen" type="checkbox" value="<?php echo $allergen->term_id; ?>" form="recipe-search-form" name="allergen"  <?php checked(in_array($allergen->term_id, $current_allergens)); ?>>
									<label for="<?php echo $allergen->term_id; ?>" class="pl-2 text-(--color-dark-green)"><?php echo $allergen->name; ?></label>
								</div>
							<?php } ?>
							</div>
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
        'result'     => $initial_results,     // The exact same HTML structure
        'pagination' => $initial_pagination, // The exact same pagination HTML
    ]); ?>;
</script>
<?php } ?>

