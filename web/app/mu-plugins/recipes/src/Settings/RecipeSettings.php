<?php

namespace Recipes\Settings;

final class RecipeSettings {

	const OPTION_KEY = 'lw_recipes_settings';

	public function __construct() {
		add_action('admin_menu', [$this, 'add_settings_page']);
		add_action('admin_init', [$this, 'register_settings']);
	}

	public function add_settings_page() {
		add_options_page(
			__('Recipes Settings', 'lw_recipes'),
			__('Recipes', 'lw_recipes'),
			'manage_options',
			'lw-recipes-settings',
			[$this, 'render_settings_page']
		);
	}

	public function register_settings() {

		register_setting(
			'lw_recipes_settings_group',
			self::OPTION_KEY,
			[$this, 'sanitize_settings']
		);

		add_settings_section(
			'lw_recipes_main_section',
			__('General Settings', 'lw_recipes'),
			function () {
				echo '<p>' . esc_html__('Main configuration for Recipes.', 'lw_recipes') . '</p>';
			},
			'lw-recipes-settings'
		);

		add_settings_field(
			'listing_page_id',
			__('Recipe Listing Page', 'lw_recipes'),
			[$this, 'render_listing_page_field'],
			'lw-recipes-settings',
			'lw_recipes_main_section'
		);
	}

	public function render_settings_page() {
		?>
		<div class="wrap">
			<h1><?php esc_html_e('Recipes Settings', 'lw_recipes'); ?></h1>

			<form method="post" action="options.php">
				<?php
				settings_fields('lw_recipes_settings_group');
				do_settings_sections('lw-recipes-settings');
				submit_button();
				?>
			</form>
		</div>
		<?php
	}

	public function render_listing_page_field() {

		$options = get_option(self::OPTION_KEY);
		$selected = isset($options['listing_page_id']) ? (int) $options['listing_page_id'] : 0;

		$pages = get_pages([
			'sort_order'  => 'ASC',
			'sort_column' => 'post_title',
		]);

		echo '<select name="' . esc_attr(self::OPTION_KEY) . '[listing_page_id]">';

		echo '<option value="0">' . esc_html__('— Select a page —', 'lw_recipes') . '</option>';

		foreach ($pages as $page) {
			printf(
				'<option value="%d" %s>%s</option>',
				(int) $page->ID,
				selected($selected, $page->ID, false),
				esc_html($page->post_title)
			);
		}

		echo '</select>';
	}

	public function sanitize_settings($input) {

		$sanitized = [];

		$sanitized['listing_page_id'] = isset($input['listing_page_id'])
			? absint($input['listing_page_id'])
			: 0;

		return $sanitized;
	}
}