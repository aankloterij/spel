<?php

namespace App\Http\Controllers;

use App\Http\Requests;

use Illuminate\Http\Request;

use Validator;

use Symfony\Component\Yaml\Yaml;

class Game2Controller extends Controller {

	public function index(Request $request) {
		$levels = count(
			array_slice(scandir(resource_path('game/maps')), 2)
		);

		return view('game2s', ['levelcount' => $levels]);
	}

	public function game(Request $request) {
		$validator = Validator::make(
			['level' => $request->level],
			['level' => 'numeric|required']
		);

		return view('game2', [
			'level' => $request->level,
		]);
	}

	public function getMap(Request $request) {
		$validator = Validator::make(
			['level' => $request->level],
			['level' => 'numeric|required']
		);

		$map = file_get_contents(resource_path('game2/maps/' . $request->level . '.map'));

		return response($map)->header('Content-Type', 'text/plain');
	}

	public function getPairs(Request $request) {
		$validator = Validator::make(
			['level' => $request->level],
			['level' => 'numeric|required']
		);

		// Extra leesbaar speciaal voor Marc omdat hij het het zeker weten gaat lezen
		return response(
			json_encode(
				Yaml::parse(
					file_get_contents(
						resource_path('game2/pairs/' . $request->level . '.yml')
						)
					)
				)
			)->header('Content-Type', 'text/plain');
	}
}
