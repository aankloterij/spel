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

var board, player;

$(function(){
	board = $('div#board');

	player = $('div#player');

	$(window).keydown(function(e) {
		e.preventDefault();

		console.debug(e);

		switch(e.keyCode) {
			// W or Arrow up
			case 87:
			case 38:
				movePlayer(player, 0, -1);
				break;

			// A or Arrow left
			case 65:
			case 37:
				movePlayer(player, -1, 0);
				break;

			// S or Arrow down
			case 83:
			case 40:
				movePlayer(player, 0, 1);
				break;

			// D or Arrow right
			case 68:
			case 39:
				movePlayer(player, 1, 0);
				break;

			default:
		}
	});
});

function movePlayer(p, dx, dy) {
	var xold, yold,
	    xnew, ynew;

	// Dit word miss heel vervelend, maar ik ga ervan uit dat (0; 0) linksboven op het bord ligt.
	// Hier begint de player dus zo lijkt het me logischer
	// Daarna wel gewoon normaal, dus als je naar beneden zou gaan word het negatief

	yold = $(p).position().top;
	xold = $(p).position().left;

	// 32 is de groote van de plaatjes
	xnew = xold + (dx * 32);
	ynew = yold + (dy * 32);

	// Don't exit the board
	xnew = Math.max(xnew, 0);
	xnew = Math.min(xnew, 1024 - 32);

	ynew = Math.max(ynew, 0);
	ynew = Math.min(ynew, 1024 - 32);

	// Fix some glitches
	if(xnew % 32 != 0)
		xnew = Math.floor(xnew / 32) * 32;

	if(ynew % 32 != 0)
		ynew = Math.floor(ynew / 32) * 32;

	$(p).css('top', ynew);
	$(p).css('left', xnew);

	// If the player collides, go back to the old position
	var hits = $(p).collision('.board.tile.wall');

	if(hits.length > 0) {
		$(p).css('top', yold);
		$(p).css('left', xold);
	}
}
