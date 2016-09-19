'use strict'

var canvas, ctx;

var BLOCKSIZE = 32; // px

var PAIRS = {
	'/': 'rgba(200, 200, 255, 1)',
	'#': 'rgba(255, 200, 200, 1)'
}

$(function() {
	canvas = $('canvas#canvas').get(0);

	if(canvas.getContext)
		ctx = canvas.getContext('2d');
	else {
		console.error('Koop een browser faggot');
		return;
	}

	var map = $.ajax({
		type: "GET",
		url: "/game2/getmap/" + level,
		async: false
	}).responseText;

	console.log('Got the map from level ' + level);
	console.log('\n' + map);

	map = map.split("\n");

	var currentChar;

	for (var y = 0; y < map.length; y++) {

		var drawn = 0;

		for (var x = 0; x < map[y].length; x++) {
			currentChar = map[y][x];

			drawn++;

			if (map[y][x] && map[y][x+1] != currentChar) {

				ctx.fillStyle = PAIRS[currentChar];
				ctx.fillRect(x * BLOCKSIZE, y * BLOCKSIZE, (x - drawn) * BLOCKSIZE, BLOCKSIZE);

				drawn = 0;

			}
		}
	}

});
