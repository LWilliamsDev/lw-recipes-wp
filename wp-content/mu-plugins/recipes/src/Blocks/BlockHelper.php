<?php 

namespace Recipes\Blocks;

final class BlockHelper {

	//Check to see if we are in the block editor. Code borrowed from Advanced Custom Fields Pro
	public static function is_in_block_editor() {
		if (function_exists('get_current_screen')) {
			$screen = get_current_screen();
			if ($screen && method_exists($screen, 'is_block_editor')) {
				return $screen->is_block_editor();
			}
		}
		return false;
	}

}