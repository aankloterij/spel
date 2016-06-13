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
