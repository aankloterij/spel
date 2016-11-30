/**
 * Spel
 *
 * Copyright (C) 2016  Max Verbeek & Sibren Talens
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var board, player, hitbox, objective, goal, list, helper;

$(function(){
	board = $('div#board');

	player = $('div#player');

	hitbox = $('#player .hitbox');

	goal = $('.objective').size();

	list = $('#goals');

	helper = $('#helper');

	objective = 0;

	$(window).keydown(function(e) {

		switch(e.keyCode) {
			// W or Arrow up
			case 87:
			case 38:
				e.preventDefault();
				movePlayer(player, 0, -1);

			// A or Arrow left
			case 65:
			case 37:
				e.preventDefault();
				movePlayer(player, -1, 0);

			// S or Arrow down
			case 83:
			case 40:
				e.preventDefault();
				movePlayer(player, 0, 1);

			// D or Arrow right
			case 68:
			case 39:
				e.preventDefault();
				movePlayer(player, 1, 0);

			default:
		}
	});
});

function movePlayer(p, dx, dy) {
	var xold, yold,
	    xnew, ynew;

	if (typeof map === 'undefined') return;

	// Dit word miss heel vervelend, maar ik ga ervan uit dat (0; 0) linksboven op het bord ligt.
	// Hier begint de player dus zo lijkt het me logischer
	// Daarna wel gewoon normaal, dus als je naar beneden zou gaan word het negatief

	xold = p.data('x');
	yold = p.data('y');

	xnew = xold + dx;
	ynew = yold + dy;

	if (outOfBounds(xnew, ynew, map) || collision(xnew, ynew, map)) return; 

	p.data('x', xnew);
	p.data('y', ynew);

	p.css({left: xnew * 32, top: ynew * 32});

	console.log({x: x, y: y, dx: dx, dy: dy});

	var nearby;

	// Hitbox = 3x3 around player
	if ((nearby = hitbox.collision('.board .tile.objective')).length > 0) {
		nearby.addClass('highlighted');

		helper.text(nearby.get(0).dataset.snippet);
	}

	else {
		$('.board .tile.objective').removeClass('highlighted');
		helper.text('-')
	}
}

function outOfBounds(x, y, map) {
	var ymax = map.length - 1;
	var xmax = map[0].length - 1;

	return x > xmax || y > ymax || x < 0 || y < 0;
}

function collision(x, y, map) {
	return map[y][x] == '#'; // wall
}