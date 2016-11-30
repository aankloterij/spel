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

		console.log(e.keyCode)

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
	xnew = Math.min(xnew, 992 - 32);

	ynew = Math.max(ynew, 0);
	ynew = Math.min(ynew, 992 - 32);

	// Make sure the player is aligned to the board
	if(xnew % 32 != 0)
		xnew = Math.floor(xnew / 32) * 32;

	if(ynew % 32 != 0)
		ynew = Math.floor(ynew / 32) * 32;

	$(p).css('top', ynew);
	$(p).css('left', xnew);

	// If the player collides, go back to the old position
	var hits = $(p).collision('.board .tile.wall');

	if(hits.length > 0) {
		$(p).css('top', yold);
		$(p).css('left', xold);
//jurryt fix deze code ff
		return;
	}

	// If the player hits an exit
	else if ($(p).collision('.board .tile.exit').length > 0) {
		if (objective == goal) {
			alert('Je hebt het level gehaald!!1');

			return;
		} else {
			alert('Je hebt nog niet alle snippets code opgepakt.');

			$(p).css('top', yold);
			$(p).css('left', xold);

			return;
		}
	}

	else if ($(p).collision('.board .tile.objective').length > 0) {
		var collision = $(p).collision('.board .tile.objective')[0];

		if (objective != collision.dataset.order) alert('Dat is de verkeerde volgorde!');
		else {

			objective++;

			list.append($('<li></li>').text(collision.dataset.snippet));

			$(collision).removeClass('objective').addClass('grass');
		}
	}

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
