<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

/**
 * Shows the homepage
 */
class HomeController extends Controller {

	/**
	 * Show index page
	 *
	 * @param      Request  $r      The request object
	 */
	public function index(Request $r) {
		return view('home');
	}
}
