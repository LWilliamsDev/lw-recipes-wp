<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'recipes' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Y~`m{UtE)< ieaZHJfJXl>Xf>#+VJ^LIyk<I+ED:~6{5gU{nSm%?_4Z+Z|g8/ecZ' );
define( 'SECURE_AUTH_KEY',  'gn3*R;C-KCXBEt}//@.Nnz!/x-7A@)@|0nv.eF7[cV0GG$rtI1ZARa86Qn3Fr)u*' );
define( 'LOGGED_IN_KEY',    'vgpxM)90aDb+0;z<tA-b<T0+Mj_4pX%%=9 f`n6$a&[ND.w!7XSeOR1lL1}#KjkU' );
define( 'NONCE_KEY',        '~w^IDNJQ}q#$j95dmwQK?/}w) uVwmmd$KL:Qr*NqQ5.M*[seF,kOl?[+v)Iv r:' );
define( 'AUTH_SALT',        'Xu[{;4PX=8*f9X;MLrWt>f*x<ZkLoeJKVnU[WwY`WOcp0s&A~nbI!D#{66(`SYdr' );
define( 'SECURE_AUTH_SALT', '*|[FZCb$&4Usgnwrbk>!Rwy/:yE`kvv)rPF5p=LS>IUm8bq@XTJ&OTTmj<vTcm|I' );
define( 'LOGGED_IN_SALT',   'v5iU{1J]`jW.M|p9f>SC_,.GvS7e6_Z2lm&SCch1PGWcTm8~kTM`y1$xzGb<;9Hb' );
define( 'NONCE_SALT',       'Q#j6E>D3IPU Pz*3aZ%>3 :z)8bZQ!Z4B4v[d0v*,eL6pjS^{d5B]0%fl^%CULjm' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */

define('FS_METHOD', 'direct');

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
