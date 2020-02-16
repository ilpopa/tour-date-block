<?php
/**
 * Plugin Name: Tour Block
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: Tour dates Gutenberg block
 * Author: Vilppu Simila
 * Author URI: github/ilpopa
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
