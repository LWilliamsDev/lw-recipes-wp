<?php

namespace Recipes\Blocks\HeroImage;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) {


	$image = wp_get_attachment_image($attributes['imageID'], 'full', false, ['class' => 'col-span-full row-span-full absolute top-0 left-0 w-full h-full object-cover']);
	$heading = empty($attributes['heading']) ? 'My Hero Title' : wp_kses_post($attributes['heading']);
	$headingLevelAttribute = empty($attributes['headingLevel']) ? 1 : $attributes['headingLevel'];
	$headingLevel = 'h' . (string) $headingLevelAttribute;

	$subtitle = empty($attributes['subtitle']) ? '' : wp_kses_post($attributes['subtitle']);
	$cta = empty($attributes['cta']) ? '' : wp_kses_post($attributes['cta']);

	$context = Timber::context();

	$context['image'] = $image;
	$context['heading'] = $heading;
	$context['headingLevel'] = $headingLevel;

	if (!empty($subtitle)) {
		$context['subtitle'] = $subtitle;
	}

	if (!empty($cta)) {
		$context['cta'] = $cta;
	}

	Timber::render('hero-image/view.twig', $context);

} ?>

