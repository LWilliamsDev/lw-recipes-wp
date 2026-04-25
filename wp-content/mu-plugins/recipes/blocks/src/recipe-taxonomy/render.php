<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$is_block_editor = is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) {

	$tax = empty($attributes['taxonomy']) ? 'diet' : $attributes['taxonomy'];
	$title = empty($attributes['title']) ? 'Browse by Diet' : $attributes['title'];


$terms = get_terms(array( 'taxonomy' => $tax));
?>

<section class="px-4 py-8 md:px-12 md:py-12">
	<h2 class="font-roboto-condensed text-5xl color-green text-(--color-green) mb-8 uppercase"><?php echo $title; ?></h2>
	<div class="cards sm:grid sm:grid-cols-[1fr_1fr] sm:gap-x-5">
		<?php foreach ($terms as $term) : ?>
			<div class="card mb-8">
				<h3>
					<a href="<?php echo get_term_link($term); ?>" class="grid block">
						<?php $image_id = get_term_meta($term->term_id, 'featured_image', true); ?>
						<?php if ($image_id) { 
							$image = wp_get_attachment_image($image_id, 'full', false, array('class' => 'w-full h-auto col-start-1 row-start-1 rounded-sm')); 
							echo $image;

						 } ?>
						<div class="bg-(--color-tan) col-start-1 row-start-1 opacity-90 self-end p-4">
							<span class="text-2xl font-medium text-(--color-brown) hover:text-(--color-mid-green)">
								<?php echo $term->name; ?></span>
						</div>
				</a>
				</h3>
			</div>
		<?php endforeach; ?>
	</div>
</section>


<?php }
?>

