'use strict'

// Dit moet een hele engine worden, dus joehooe

const GRAVITY = 9.81;

const SPEED = 5;

/**
 * Unlike the other game, the player should be able to move freely,
 * so it shouldn't have to stay aligned to the grid.
 */
class Player {
	constructor(x, y, object = $('div#player')) {
		this.object = object;

		this.setPos(x * 32, y * 32);
	}

	move(dx, dy) {
		var xnew = this.x + dx;
		var ynew = this.y + dy;

		this.setPos(xnew, ynew);
	}

	isFalling() {
		// TODO Implement physics
		return false;
	}

	setPos(x, y) {
		this.x = x;
		this.y = y;

		this.object.css({
			'bottom': this.y,
			'left': this.x
		});
	}
}

/**
	Source:
	http://stackoverflow.com/questions/5419134/how-to-detect-if-two-divs-touch-with-jquery

	var x1 = $div1.offset().left;
	var y1 = $div1.offset().top;
	var h1 = $div1.outerHeight(true);
	var w1 = $div1.outerWidth(true);
	var b1 = y1 + h1;
	var r1 = x1 + w1;
	var x2 = $div2.offset().left;
	var y2 = $div2.offset().top;
	var h2 = $div2.outerHeight(true);
	var w2 = $div2.outerWidth(true);
	var b2 = y2 + h2;
	var r2 = x2 + w2;

	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
	return true;
 */

$(function() {
	var player = new Player(2, 1);

	$(window).keydown(function(e) {

		switch(e.keyCode) {
			// W or Arrow up
			case 87:
			case 38:
				e.preventDefault();
				player.move(0, 1 * SPEED);
				break;

			// A or Arrow left
			case 65:
			case 37:
				e.preventDefault();
				player.move(-1 * SPEED, 0);
				break;

			// S or Arrow down
			case 83:
			case 40:
				e.preventDefault();
				player.move(0, -1 * SPEED);
				break;

			// D or Arrow right
			case 68:
			case 39:
				e.preventDefault();
				player.move(1 * SPEED, 0);
				break;

			default:
		}
	});
});

