<?php

use Recipes\Blocks\BlockHelper;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) {

	$tax = empty($attributes['taxonomy']) ? 'diet' : $attributes['taxonomy'];
	$title = empty($attributes['title']) ? 'Browse by ' . ucwords($tax) : $attributes['title'];


$terms = get_terms(array( 'taxonomy' => $tax));

$options = get_option('lw_recipes_settings');
$listing_page_id = $options['listing_page_id'] ?? 0;
$link = $listing_page_id ? untrailingslashit(get_permalink($listing_page_id)) : null;
?>

<section class="px-4 py-8 md:px-12 md:py-12">
	<h2 class="font-roboto-condensed text-5xl color-green text-(--color-green) mb-8 uppercase"><?php echo $title; ?></h2>
	<div class="cards sm:grid sm:grid-cols-[1fr_1fr] sm:gap-x-5">
		<?php foreach ($terms as $term) : ?>
			<div class="card mb-8">
				<h3>
					<?php if (!empty($link)) : ?>
						<a href="<?php echo $link; ?>?<?php echo $term->taxonomy;?>=<?php echo $term->term_id; ?>" class="grid block">
					<?php else :?>
						<span class="grid block">
					<?php endif; ?>
						<?php $image_id = get_term_meta($term->term_id, 'featured_image', true); ?>
						<?php if ($image_id) { 
							$image = wp_get_attachment_image($image_id, 'full', false, array('class' => 'w-full h-auto col-start-1 row-start-1 rounded-sm')); 
							echo $image;

						 } ?>
						<div class="bg-(--color-tan) col-start-1 row-start-1 opacity-90 self-end p-4">
							<span class="text-2xl font-medium text-(--color-brown) hover:text-(--color-mid-green)">
								<?php echo $term->name; ?></span>
						</div>
				<?php if (!empty($link)) : ?>
						</a>
					<?php else :?>
						</span>
					<?php endif; ?>
				</h3>
			</div>
		<?php endforeach; ?>
	</div>
</section>


<?php }
?>

