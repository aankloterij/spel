<?php

namespace App;

/**
 * A tile on the game board
 */
class Tile {
	/**
	 * The bitmap name, without extention
	 */
	protected $bitmap;

	/**
	 * The character that corresponds with this tile
	 */
	protected $character;

	/**
	 * Ctor
	 */
	public function __construct() {

	}

	/**
 	 * Return true if the character given matches this tile
 	 *
 	 * @param char  $char  The character from the map
 	 * @return boolean     If $char matches this tile
	 */

	public function matches($char) {
		return $this->character ==  $char;
	}
}
