<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class Game2Controller extends Controller {

    public function game(Request $request) {

    }

    public function getMap(Request $request) {
    	$input = $request->input('level')
    }
}
