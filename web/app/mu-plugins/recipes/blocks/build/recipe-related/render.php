<?php

use Recipes\Blocks\BlockHelper;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { 
	$postId = get_the_ID();

	$query_args = array(
		'post_type' => 'recipe',
		'posts_per_page' => 3,
		'post__not_in' => [$postId]
	);

	$diet = get_the_terms($postId, 'diet');

	if ($diet) {
		$diet = reset($diet);
		$query_args['tax_query'] = array(
			array(
				'taxonomy' => 'diet',
				'field' => 'term_id',
				'terms' => $diet->term_id
			),	
		);
	}

	$query = new WP_Query( $query_args );

?>
	<?php if ($diet && $query->have_posts()) : ?>
		<aside class="px-4 pt-8 md:px-12 md:pt-12">
			<div class="w-3/4">
				<h2 class="text-3xl font-roboto-condensed uppercase text-(--color-green) mb-[10px]"><?php _e('You Might Also Like', 'lw-recipes'); ?></h2>
				<ul class="md:grid md:grid-cols-[1fr_1fr_1fr] md:gap-x-5">
					<?php while ($query->have_posts()) :  $query->the_post(); ?>
						<li class="mb-5 md:mb-0">
						<a href="<?php echo get_the_permalink(); ?>">
							<?php the_post_thumbnail('full', array('class' => 'w-full')); ?>
							<h3 class="text-xl font-medium mt-2"><?php the_title(); ?></h3>
						</a>
					</li>
					<?php endwhile; wp_reset_postdata(); ?>
				</ul>
			</div>
		</aside>
	<?php else : ?>
	<?php endif; ?>
	
<?php } ?>

