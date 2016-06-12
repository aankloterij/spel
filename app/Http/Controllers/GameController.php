<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

/**
 * List and play games
 */
class GameController extends Controller {

	/**
	 * Show index page listing the games
	 *
	 * @param      Request  $r      The request object
	 */
	public function index(Request $r) {
		$levels = count(
			array_slice(scandir(resource_path('game/maps')), 2)
		);

		return view('games', ['levelcount' => $levels]);
	}
}
