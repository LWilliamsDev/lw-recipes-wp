<?php 
/**
 * Plugin Name: LW MU Plugin Loader
 * Author: Lisa Williams
 * Plugin URI: https://lisawilliams.net
 * Description: Load the recipes plugin
 */

$mu_plugins_dir = __DIR__;

if (file_exists($mu_plugins_dir . '/recipes/recipes.php')) {
	include_once($mu_plugins_dir . '/recipes/recipes.php');
}

