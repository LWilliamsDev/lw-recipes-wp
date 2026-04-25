<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$is_block_editor = is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) {


	$image = wp_get_attachment_image($attributes['imageID'], 'full', false, ['class' => 'col-span-full row-span-full absolute top-0 left-0 w-full h-full object-cover']);

?>

<section class="hero grid h-[358px] md:h-[717px]">
			<div class="hero row-span-full col-span-full relative">
				<?php echo $image; ?>
				<div class="bg-(--color-tan) block w-full h-full opacity-80 absolute left-0 top-0"></div>
			</div>
			<div class="row-span-full col-span-full relative z-2 text-center self-center">
				<?php echo $content; ?>
			</div>
		</section>

<?php } ?>

