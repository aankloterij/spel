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

		// Open the map that belongs to this game
		$file = file(resource_path('game/maps/' . $level . '.map'));

		$pairs = Yaml::parse(file_get_contents(resource_path('game/pairs/' . $level .  '.yml')));

		// Foreach line in file
		foreach($file as $y => $line) {
			$line_split = str_split($line);

			$tiles .= '<div class="board row">';

			// Foreach character in line
			foreach($line_split as $x => $char) {
				if(array_key_exists($char, $pairs))
					$tiles .= "<div class=\"board tile $pairs[$char]\"></div>";
				else
					continue;
			}

			// $tiles .= '</div>';
			$tiles .= "</div>\n";

		}

		return view('game', ['board' => $tiles]);

	}
}
