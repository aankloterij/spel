'use strict'

var canvas;

// load maps
$(function () {

	canvas = $('#background').get(0);

	$.ajax({
		type: 'GET',
		url: '/game2/getmap/' + level,
		success: start
	});
});

var game;

function start(data) {

	game = new Game(data, canvas);

	// game.BLOCKSIZE = Math.floor(document.body.clientHeight / game.getDimensions().height);
	game.BLOCKSIZE = 16;

	console.log(game.getDimensions().height);

	game.load();
}