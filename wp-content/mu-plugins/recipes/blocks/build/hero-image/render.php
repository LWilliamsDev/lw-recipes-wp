<?php

use Recipes\Blocks\BlockHelper;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) {


	$image = wp_get_attachment_image($attributes['imageID'], 'full', false, ['class' => 'col-span-full row-span-full absolute top-0 left-0 w-full h-full object-cover']);
	$heading = empty($attributes['heading']) ? 'My Hero Title' : wp_kses_post($attributes['heading']);
	$headingLevelAttribute = empty($attributes['headingLevel']) ? 1 : $attributes['headingLevel'];
	$headingLevel = 'h' . (string) $headingLevelAttribute;

	$subtitle = empty($attributes['subtitle']) ? '' : wp_kses_post($attributes['subtitle']);
	$cta = empty($attributes['cta']) ? '' : wp_kses_post($attributes['cta']);

?>

<section class="hero grid h-[358px] md:h-[717px]">
			<div class="hero row-span-full col-span-full relative">
				<?php echo $image; ?>
				<div class="bg-(--color-tan) block w-full h-full opacity-80 absolute left-0 top-0"></div>
			</div>
			<div class="row-span-full col-span-full relative z-2 text-center self-center">
				<<?php echo $headingLevel;?> class="font-roboto-condensed text-4xl md:text-6xl uppercase text-(--color-green) mb-[10px] md:mb-[20px]">
					<?php echo $heading; ?>
				</<?php echo $headingLevel; ?>>
				<?php if (!empty($subtitle)) :?>
					<p class="text-color(--color-dark-green) text-sm md:text-2xl mb-[15px] md:mb-[20px]">
						<?php echo $subtitle; ?>
					</p>
				<?php endif; ?>
				<?php if (!empty($cta)) : ?>
					<p class="hero-image__cta"><?php echo $cta; ?></p>
				<?php endif; ?>
			</div>
		</section>

<?php } ?>

