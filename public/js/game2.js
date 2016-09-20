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

	console.log(game.getDimensions().height);

	game.load();

	setInterval(game.loop, 1000 / game.FPS);
}
