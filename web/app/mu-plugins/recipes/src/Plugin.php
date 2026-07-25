<?php

namespace Recipes;

use Recipes\Assets\Assets;
use Recipes\Blocks\Blocks;
use Recipes\Blocks\BlockAssets;
use Recipes\PostType\Recipe;
use Recipes\Rest\Menu;
use Recipes\Rest\Recipe as RecipeEndpoint;
use Recipes\Settings\RecipeSettings;
use Recipes\Taxonomy\Allergen;
use Recipes\Taxonomy\Course;
use Recipes\Taxonomy\Diet;
use Recipes\Taxonomy\Protein;


final class Plugin {

	private static ?Plugin $instance = null;

	public static function instance(): Plugin {
		if (self::$instance === null) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct() {
		$this->init();
	}


	private function init(): void {
		new Assets();
		new Blocks();
		new BlockAssets();
		new Recipe();
		new Menu();
		new RecipeEndpoint();
		new Allergen();
		new Course();
		new Diet();
		new Protein();
		new RecipeSettings();

	}

	/**
	 * Prevent people from creating a duplicate instance of this class
	 * */

	private function __clone() {}

	public function __unserialize(array $data): void {
		throw new \LogicException('Cannot unserialize singleton.');

	}

}