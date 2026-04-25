<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$is_block_editor = is_in_block_editor();


if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { 
	$postId = get_the_ID();

	$course = get_the_terms($postId, 'course');

	if ($course) {
		$course = reset($course);
	}
	
 	$diet = get_the_terms($postId, 'diet');

 	if ($diet) {
 		$diet = reset($diet);
 	}


	$serves = isset($attributes['serves']) ? $attributes['serves'] : '';
	$prepTime = isset($attributes['prepTime']) ? $attributes['prepTime'] : '';
	$totalTime = isset($attributes['totalTime']) ? $attributes['totalTime'] : '';

	$hasOverviewData = true;

	if (empty($serves) || empty($prepTime) || empty($totalTime)) {
		$hasOverviewData = false;
	}
?>

	<div class="mb-[10px] md:mb-[20px] pt-[5px] border-t border-solid border-(--color-mid-green)">
		<ul class="flex flex-wrap breadcrumbs gap-[10px]">
			<li><a href="#">Recipes</a></li>
			<?php if ($course) : ?><li><a href="#"><?php echo $course->name; ?></a></li><?php endif; ?>
			<?php if ($diet) : ?><li><a href="#"><?php echo $diet->name; ?></a></li><?php endif; ?>
		</ul>
	</div>
	<div class="mb-[20px]">
		<h1 class="font-roboto-condensed mb-[5px] text-3xl md:mb-[10px] md:text-5xl uppercase text-(--color-green)"><?php the_title(); ?></h1>
		<?php if (!empty(get_the_excerpt())) : ?>
			<p class="text-base md:text-2xl text-(--color-brown)"><?php echo get_the_excerpt(); ?></p>
		<?php endif; ?>
	</div>
	<?php if (!empty(get_the_post_thumbnail())) : ?>
		<div class="mb-[20px] md:mb-[30px]">
			<?php the_post_thumbnail('full', ['class' => 'w-full']); ?>
		</div>
	<?php endif; ?>
	<?php if ($hasOverviewData) { ?>
		<ul class="flex flex-wrap gap-[10px] text-(--color-dark-green)">
			<?php if (!empty($serves)) : ?><li><span class="text-(--color-brown)"><strong>Serves:</strong></span> <?php echo $serves; ?></li><?php endif; ?>
			<?php if (!empty($prepTime)) : ?><li><span class="text-(--color-brown)"><strong>Prep Time:</strong></span> <?php echo $prepTime; ?></li><?php endif; ?>
			<?php if (!empty($totalTime)) : ?><li><span class="text-(--color-brown)"><strong>Total Time:</strong></span> <?php echo $totalTime; ?></li><?php endif; ?>
		</ul>
	<?php } ?>
	
<?php } ?>

