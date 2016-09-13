<?php

/**
 * Show the start page
 */
Route::get('/', 'HomeController@index');

/**
 * List all games
 */
Route::get('/game', 'GameController@index');

/**
 * Show a game level
 */
Route::get('/game/{level}', 'GameController@game');

/**
 * The second game, because Marc wants it
 */
Route::get('/game2', 'Game2Controller@index');
Route::get('/game2/{level}', 'Game2Controller@game');

Route::get('/meme', function() {
	// meme
	return redirect('https://www.google.nl/url?sa=t&rct=j&q=&esrc=s&source=web&cd=8&cad=rja&uact=8&ved=0ahUKEwi3-ImWhYzPAhVDLhoKHVbnBxMQuAIISTAH&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ&usg=AFQjCNEPGa2VKuL0GefK_nkQoh9csTD8OA&sig2=RruvEHW8QiVJzEWEVVRiYA');
});
