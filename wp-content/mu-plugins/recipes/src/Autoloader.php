<?php

namespace Recipes;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Autoloader {

	public static function register(): void {
		spl_autoload_register( [ self::class, 'autoload' ] );
	}

	private static function autoload( string $class ): void {
		$prefix = __NAMESPACE__ . '\\';

		if ( strncmp( $class, $prefix, strlen( $prefix ) ) !== 0 ) {
			return;
		}

		$relative = substr( $class, strlen( $prefix ) );

		$file = __DIR__ . '/'
			. str_replace( '\\', '/', $relative )
			. '.php';

		if ( file_exists( $file ) ) {
			require_once $file;
		}
	}
}