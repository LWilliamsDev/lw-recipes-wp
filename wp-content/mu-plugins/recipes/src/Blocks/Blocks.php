<?php 

namespace Recipes\Blocks;

final class Blocks {

	private const BLOCKS = [
		'hero-image',
		'hero-image-heading',
		'hero-image-subtitle',
		'hero-image-cta',
		'home-template',
		'latest-recipes',
		'page-template',
		'recipe',
		'recipe-complex',
		'recipe-complex-ingredient',
		'recipe-complex-ingredients',
		'recipe-complex-instructions',
		'recipe-content',
		'recipe-listing',
		'recipe-overview',
		'recipe-post-nav',
		'recipe-related',
		'recipe-search',
		'recipe-simple',
		'recipe-simple-ingredients',
		'recipe-simple-instructions',
		'recipe-taxonomy',
		'recipe-template',
		'header',
		'social-media-item',
		'social-media',
		'footer'
	];

	public function __construct() {
		add_action('init', [$this, 'register_blocks']);
		add_filter( 'render_block_core/template-part', [$this, 'remove_core_template_part_wrapper'], 10, 2 );
		add_action( 'init', [$this, 'add_page_template'], 20 );
	}

	public function register_blocks(): void {
		foreach (self::BLOCKS as $block) {
			register_block_type(RECIPES_PATH . 'blocks/build/' . $block);
		}
	}

	/**
 	 * Filters the content of a 'core/template-part' block.
 	 *
	 * @phpstan-param array{attrs: array<string, mixed>} $block
 	 *
 	 * @param string $block_content The block content.
 	 * @param array  $block         The full block, including name and attributes.
 	 * @return string
 	 * 
 	 * Credit to https://github.com/alleyinteractive/create-wordpress-theme for most of this 
 	 * function. Removes the wrapper, div.wp-site-blocks, from the front end	
 	 */
	
	public function remove_core_template_part_wrapper( $block_content, $block ) {

		$proc = new \WP_HTML_Tag_Processor( $block_content );

		if ( true === $proc->next_tag() ) {
			$block_content = trim( $block_content );

			// Remove opening tag.
			$block_content = substr(
				$block_content,
				strpos( $block_content, '>' ) + 1
			);

			// Remove closing tag.
			$block_content = substr(
				$block_content,
				0,
				strlen( $block_content ) - strlen( "</{$proc->get_tag()}>" ),
			);

			$block_content = trim( $block_content );
		}


	return $block_content;
	}
    

    /**
 	 * Add Page template block to Page post type
 	 */ 
	
	public function add_page_template() {
		// Get the existing post type object for 'page'
    	$post_type_object = get_post_type_object( 'page' );

    	if ( $post_type_object ) {
        	/**
         	 * Define your block template array.
         	 * Structure: [ 'block/name', [ attributes ], [ child_blocks ] ]
         	 */
        	$post_type_object->template = [
            	[ 'lw-recipes/page-template']
        	];

        	/**
         	 * Lock the template down.
         	 * Options:
         	 * 'all'     - Prevents adding new blocks, moving existing ones, or deleting them.
         	 * 'insert'  - Allows moving blocks around, but prevents adding or deleting them.
         	 * false     - (Default) Allows full editing freedom; the template is just a starting point.
         	 */
        	$post_type_object->template_lock = 'all';
    	}
	}
}