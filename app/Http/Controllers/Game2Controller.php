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

		if($validator->fails())
			redirect('/game2');

		$map = $this->getMap($request->level);

		$pairs = $this->getPairs($request->level);

		$map = preg_replace_callback('/./', function($matches) use ($pairs) {

			$char = $matches[0];

			if(isset($pairs[$char]))
				return "<div class=\"tile {$pairs[$char]}\"></div>";

			return '';

		}, $map);

		return view('game2', [
			'level' => $request->level,
			'board' => $map
		]);
	}

	public function getMap($level) {
		$map = file_get_contents(resource_path('game2/maps/' . $level . '.map'));

		return $map;
	}

	public function getPairs($level) {
		return Yaml::parse(file_get_contents(resource_path('game2/pairs/' . $level . '.yml')));
	}
}
