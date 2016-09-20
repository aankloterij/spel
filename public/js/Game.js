'use strict'

// constructor
var Game = function (map, canvas) {
	this.level = level;
	this.map = map.trim().split("\n");

	this.canvas = canvas;

	if (! this.canvas.getContext)  {
		console.error("Koop een browser bitch.");
		return false;
	}

	this.ctx = canvas.getContext('2d');

	this.keyHandler = new KeyHandler();
}

// Als je dit hoger zet worden de lijnen tussen blokken clearer,
// omdat hij word uitgerekt om de verticale hoogte van de viewport te matchen
// 64 is goed genoeg volgensmij
Game.prototype.BLOCKSIZE = 64;

// Hoe vaak de gameloop draait per seconde
Game.prototype.FPS = 60;

Game.prototype.PAIRS = {
	'/': 'rgba(200, 200, 255, 1)',
	'#': 'rgba(255, 100, 100, 1)',
	'?': 'rgba(255, 100, 255, 1)'
};

Game.prototype.load = function () {

	if (! this.map) {
		console.error("Geen map gevonden.");
		return false;
	}

	if (this.map.length == 0) {
		return;
	}

	// moeten we in CSS maar overflow gebruiken..
	// En dan gwn position absolute -> naar links duwen als character verder komt.
	this.canvas.height = this.map.length * this.BLOCKSIZE;
	this.canvas.width = (this.map[0].length - 1) * this.BLOCKSIZE;

	var currentChar;

	for (var y = 0; y < this.map.length; y++) {

		var drawn = 0;

		for (var x = 0; x < this.map[y].length; x++) {
			currentChar = this.map[y][x];

			if (this.map[y][x+1] != currentChar) {

				this.ctx.fillStyle = this.PAIRS[currentChar];
				this.ctx.fillRect(drawn * this.BLOCKSIZE, y * this.BLOCKSIZE, (x - drawn) * this.BLOCKSIZE, this.BLOCKSIZE);

				drawn = x;
			}
		}
	}
}

Game.prototype.loop = function () {

}

Game.prototype.getDimensions = function () {
	var width, height;

	if (this.map.length === 0) width = height = 0;

	else {
		height = this.map.length;
		width = this.map[0].length;
	}

	return {width: width, height: height};
}

class Player {
	constructor(x, y) {
		this.position = {x: x, y: y};
	}

	setMoving(dx, dy) {
		this.moving = true;
		this.direction = {x: dx, y: dy};
	}

	setStop() {
		this.moving = false;
	}
}

class KeyHandler {
	constructor() {

		// Deze map bevat als key de key die is gepressed
		// en als value de status van die key
		this.keys = {};

		$('body').on('keydown', this.keyDown);
		$('body').on('keyup', this.keyUp);

		this.keycodes = {
			spacebar: 32,
			w: 87,
			a: 65,
			s: 83,
			d: 68,
			arrow: {
				up: 38,
				down: 40,
				left: 37,
				right: 39
			},
		};

	}

	keyDown(e) {
		map[e.keyCode] = e.type == 'keydown';
	}

	keyUp(e) {
		map[e.keyCode] = e.type == 'keydown';
	}
}
