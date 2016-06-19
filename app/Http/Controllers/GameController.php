<?php

namespace App\Http\Controllers;

use App\Game;

use Validator;
use Illuminate\Http\Request;

use Symfony\Component\Yaml\Yaml;

/**
 * List and play games
 */
class GameController extends Controller {

	/**
	 * Show index page listing the games
	 *
	 * @param      Request  $r      The request object
	 */
	public function index(Request $request) {
		$levels = count(
			array_slice(scandir(resource_path('game/maps')), 2)
		);

		return view('games', ['levelcount' => $levels]);
	}

	/**
	 * Show a game by level
	 *
	 * @param      Request  $r      The request object
	 */
	public function game(Request $request) {
		// Get the validator for the URL parameter
		$validator = Validator::make(
			['level' => $request->level],
			['level' => 'numeric|required']
		);

		// Redirect to the homepage
		if($validator->fails())
			return redirect('/game');
		$level = $request->level;

		$tiles = '';

		$pairfile = resource_path('game/pairs/' . $level . '.yml');

		// default pairs
		$pairs = [
			'#' => 'wall',
			'/' => 'grass',
			'@' => 'exit',
		];

		if (file_exists($pairfile)) $pairs = array_merge($pairs, Yaml::parse(file_get_contents($pairfile)));

		// Open the map that belongs to this game
		$file = file(resource_path('game/maps/' . $level . '.map'));

		// Foreach line in file
		foreach($file as $y => $line) {
			$line_split = str_split($line);

			$tiles .= '<div class="board row">';

			// Foreach character in line
			foreach($line_split as $x => $char) {

				if (array_key_exists($char, $pairs)) {

					// Voor objectives
					if (preg_match('/a-z0-9/', $char)) { // a-z0-9 = 0123456789abcdefgh etc..

						if (! is_numeric($char)) $char = ord($char) - 86; // a = 10; b = 11; etc..

						$char = (int) $char;

						if (! isset($pairs[$char])) continue;

						$tiles .= "<div class=\"board tile objective\" data-order=\"{$char}\" data-snippet=\"{$pairs[$char]}\"></div>";
					}

					else $tiles .= "<div class=\"board tile {$pairs[$char]}\"></div>";
				}

				else {
					// spawn een bs ding?
				}
			}

			$tiles .= "</div>\n";

		}

		return view('game', ['board' => $tiles, 'level' => $level]);
	}
}
