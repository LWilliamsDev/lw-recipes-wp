<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$is_block_editor = is_in_block_editor();

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
			'img' => get_template_directory_uri() . '/assets/img/linkedin.svg',
			'alt' => 'LinkedIn icon'
		),
		'youtube' => array(
			'img' => get_template_directory_uri() . '/assets/img/youtube.svg',
			'alt' => 'YouTube icon'
		)
	]; 

	$icon = $attributes['item']['icon'];
	?>
	
	<li><a href="<?php echo $attributes['item']['site']; ?>"><img src="<?php echo $social_media[$icon]['img']; ?>" alt="<?php echo $social_media[$icon]['alt'];?>"></a>

<?php } ?>

