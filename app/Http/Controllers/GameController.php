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

	const DECOY = '*';


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

		if (! isset($pairs['objectives'])) $pairs['objectives'] = [];
		if (! isset($pairs['decoys'])) $pairs['decoys'] = [];

		// Open the map that belongs to this game
		$rawmap = file_get_contents(resource_path('game/maps/' . $level . '.map'));

		$map = preg_replace_callback("/./", function ($matches) use ($pairs) {

			$char = $matches[0];

			if ($char == static::DECOY) {
				return '<div class="tile decoy" data-snippet="' . $this->getRandomDecoy($pairs['decoys']) . '"></div>';
			}

			elseif (isset($pairs[$char])) return '<div class="tile ' . $pairs[$char] . '"></div>';

			elseif (isset($pairs['objectives'][$char])) {
				return '<div class="tile objective" data-order="'
					. $this->getOrder($char, $pairs['objectives'])
					. '" data-snippet="' . $pairs['objectives'][$char] . '"></div>';
			}

			return '';

		}, $rawmap);

		return view('game', ['board' => $map, 'level' => $level, 'rawmap' => substr(json_encode(array_values(explode(PHP_EOL, $rawmap))), 1, -1)]);
	}

	protected function getOrder($char, $objectives) {
		$keys = array_keys($objectives);

		return array_flip($keys)[$char];
	}

	protected function getRandomDecoy($decoys) {
		if (empty($decoys)) {
			return '';
		}

		return array_rand(array_flip($decoys));
	}
}
