<?php

namespace App;
use Symfony\Component\Yaml\Yaml;

/**
 * A tile on the game board
 */
class Game {
	/**
	 * The level difficulty, eg. 1, 2, 3...
	 */
	protected $level;

	/**
	 * The size of this level, only 16 is guaranteed to work properly ('properly')
	 */
	protected $size;

	protected $tiles;

	public function __construct($l) {
		$this->level = $l;

		$file = file(resource_path('game/maps/' . $this->level . '.map'));

		foreach($file as $line) {
			foreach(str_split($line) as $char) {

			}
		}


	}

}
