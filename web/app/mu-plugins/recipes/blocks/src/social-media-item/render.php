<?php

namespace Recipes\Blocks\SocialMediaItem;

use Recipes\Blocks\BlockHelper;
use Timber\Timber;

$is_block_editor = BlockHelper::is_in_block_editor();

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) { 
	$social_media = [
		'facebook' => array(
			'img' => get_template_directory_uri() . '/assets/img/fb.svg',
			'alt' => 'Facebook icon'
		),
		'instagram' => array(
			'img' => get_template_directory_uri() . '/assets/img/instagram.svg',
			'alt' => 'Instagram icon'
		),
		'linkedin' => array(
			'img' => get_template_directory_uri() . '/assets/img/linked-in.svg',
			'alt' => 'LinkedIn icon'
		),
		'youtube' => array(
			'img' => get_template_directory_uri() . '/assets/img/youtube.svg',
			'alt' => 'YouTube icon'
		)
	]; 

	$link = $attributes['item']['site'];
	$icon_attr = $attributes['item']['icon'];
	$icon = null;
	$alt = null;

	if (!empty($social_media[$icon_attr])) {
		$icon = $social_media[$icon_attr]['img'];
		$alt = $social_media[$icon_attr]['alt'];
	}

		Timber::render('social-media-item/view.twig',
    [
        'link' => $link,
        'icon' => $icon,
        'alt' => $alt
    ]
);


 } ?>

