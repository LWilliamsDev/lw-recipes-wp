<?php

use Recipes\Blocks\BlockHelper;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) {
//Get latest recipes from WP_Query

$query = new WP_Query( array(
	'post_type' => 'recipe',
	'posts_per_page' => 3
));

$options = get_option('lw_recipes_settings');
$listing_page_id = $options['listing_page_id'] ?? 0;

$link = $listing_page_id ? untrailingslashit(get_permalink($listing_page_id)) : null;
?>

<section class="px-4 py-8 md:px-12 md:py-12">
			<h2 class="font-roboto-condensed text-5xl color-green text-(--color-green) mb-8 uppercase">
				<?php if (empty($attributes['title'])) : ?>
					Latest Recipes
				<?php else : echo $attributes['title']; ?>
				<?php endif; ?>
			</h2>

			<?php if ($query->have_posts()) : ?>
				<div class="cards sm:grid sm:grid-cols-[1fr_1fr_1fr] sm:gap-x-5">
				<?php while ($query->have_posts()) :  $query->the_post(); ?>
				<div class="card mb-8">
					<?php if (has_post_thumbnail()) : ?>
						<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('full', array('class' => 'mb-5 w-full h-auto')); ?></a>
					<?php endif; ?>
					<h3 class="text-2xl font-medium text-(--color-brown)"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
					<?php if (has_excerpt()) : ?>
						<p class="text-(--color-dark-green)"><?php echo get_the_excerpt(); ?></p>
					<?php endif; ?>
					<?php $terms = get_the_terms(get_the_ID(), 'diet'); 
					if (!empty($terms)) : ?>
					<ul class="categories mt-5 flex flex-wrap gap-[10px]">
						<?php foreach ($terms as $term) : ?>
						<?php if (!empty($link)) : ?>
							<li><a href="<?php echo $link;?>?diet=<?php echo $term->term_id; ?>" class="button p-[10px] inline-block rounded-sm text-(--color-white) font-medium"><?php echo $term->name; ?></a></li>
						<?php else : ?>
							<li><span class="button p-[10px] inline-block rounded-sm text-(--color-white) font-medium"><?php echo $term->name; ?></span></li>
						<?php endif; ?>
					<?php endforeach; ?>
					</ul>
				<?php endif; ?>
				</div>
				<?php wp_reset_postdata(); ?>

			<?php endwhile; ?>
			</div>
			<?php else : ?>
			<?php endif; ?>
			
		</section>

<?php } ?>

