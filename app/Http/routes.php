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
Route::get('/game2/{level}', 'Game2Controller@game');
Route::get('/game2/map/{level}', 'Game2Controller@getMap');
