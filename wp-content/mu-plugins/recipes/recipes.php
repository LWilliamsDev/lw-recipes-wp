<?php 

/**
 * Plugin Name: LW Recipes
 * Author: Lisa Williams
 * Plugin URI: https://lisawilliams.net
 * Description: Set up a recipe custom post type with REST endpoint.
 * Text Domain: lw_recipes
 */

namespace Recipes;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define('RECIPES_PATH', plugin_dir_path(__FILE__));
define('RECIPES_URL', plugin_dir_url(__FILE__));

require_once __DIR__ . '/src/Autoloader.php';

Autoloader::register();

Plugin::instance();
