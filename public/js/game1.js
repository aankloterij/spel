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

var board, player, hitbox, objective, goal, list, helper, finished, moveLoop;
var dx, dy;


const INTERVAL = 1;

$(function(){
	board = $('div#board');

	player = $('div#player');

	hitbox = $('#player .hitbox');

	goal = $('.objective').size();

	list = $('#goals');

	helper = $('#helper');

	objective = 0;

	finished = false;

	var moveLoop = setInterval(function() {
		if (dx !== 0 || dy !== 0) movePlayer(player, dx, dy);
	}, INTERVAL);

	$(window).on('keydown', function (e) {
		if (finished) return;

		switch(e.keyCode) {
      // W or Arrow up
      case 87:
      case 38:
          e.preventDefault();
          dx = 0; dy = -1;
          break;

      // A or Arrow left
      case 65:
      case 37:
          e.preventDefault();
          dx = -1; dy = 0;
          break;

      // S or Arrow down
      case 83:
      case 40:
          e.preventDefault();
          dx = 0; dy = 1;
          break;

      // D or Arrow right
      case 68:
      case 39:
          e.preventDefault();
          dx = 1; dy = 0;
          break;
   	}

	});

	$(document).on('keyup', function (e) {
		switch (e.keyCode) {
			case 87:
			case 38:
			case 65:
			case 37:
			case 83:
			case 40:
			case 68:
			case 39:
				dx = 0; dy = 0;
				e.preventDefault();
				break;
		}
	});
});

// Deze "collide*" closures zijn functies die worden geroepen dmv collideIf.
// Hier kun je een character of regex geven, en dan zoekt die functie uit
// of de speler collide met dat ding dat met de gegeven string of regex overeenkomt.
// Als dit zo is wordt de closure uitgevoerd zodat nog verder gecontroleerd
// kan worden of de speler uberhaubt kan colliden met dit ding.
// return True als dat kan (wel collision, dus kan er niet op staan), False
// als dat niet kan (geen collision -> kan er wel op staan.)
var collideExit = function (x, y) {
	if (objective === goal) {
		alert('Je hebt het level gehaald!');
		finished = true;

		window.clearInterval(moveLoop);

		return false;
	}

	alert('Je hebt nog niet alle snippets code opgepakt. :c');

	return true;
};

var collideObjective = function (x, y) {
	// Kut manier om het n-de element uit het bord te halen (waar de speler naartoe gaat.)
	var item = $('#board .tile:eq(' + (y * (map.length - 1) + x) + ')');

	console.log(item);

	// Als dit item nog niet opgepakt moet worden
	if (item.data('order') > objective) {
		alert('Je moet eerst nog andere snippets oppakken voordat deze past.');

		return true;
	}

	// Als dit het item is dat opgepakt moet worden (vanaf hier kun je er doorheen lopen)
	else if (item.data('order') === objective) {
		// Dit item moet opgepakt worden.
		objective++;
		list.append($('<li></li>').text(item.data('snippet')));
		item.removeClass('objective').addClass('grass');
	}

	// Als order < objective, dan is het item al opgepakt, en
	// kun je er gewoon doorheen lopen.

	return false;
};

function movePlayer(p, dx, dy) {
	var xold, yold,
	    xnew, ynew;

	if (typeof map === 'undefined') return;

	console.log(map);

	xold = p.data('x');
	yold = p.data('y');

	xnew = xold + dx;
	ynew = yold + dy;

	// Ziek if-statement lol
	if (outOfBounds(xnew, ynew, map)
		|| collideWith(xnew, ynew, map, '#')
		|| collideIf(xnew, ynew, map, /\d/, collideObjective)
		|| collideIf(xnew, ynew, map, '@', collideExit)) return;

	// Verander de coordinaten van de speler.
	p.data('x', xnew);
	p.data('y', ynew);

	p.css({left: xnew * 32, top: ynew * 32});


	// Regel de 3x3 hitbox om de speler heen (voor het highlighten van objectives)
	var nearby;

	// Hitbox = 3x3 around player
	if ((nearby = hitbox.collision('.board .tile.objective')).length > 0) {
		nearby.addClass('highlighted');

		helper.text(nearby.get(0).dataset.snippet);
	}

	else {
		// Als er geen objectives naast de speler meer zijn, haal alle highlights weg.
		// Dit gaat kapot als er meerdere objectives tegelijkertijd in de hitbox kunnen zijn.
		// Zorg er daarom ook voor dat er altijd maar 1 objective tegelijkertijd
		// naast de speler kan zijn.
		$('.board .tile.objective').removeClass('highlighted');
		helper.text('-')
	}

}

// Out of bounds controle
function outOfBounds(x, y, map) {
	var ymax = map.length - 1;
	var xmax = map[0].length - 1;

	return x > xmax || y > ymax || x < 0 || y < 0;
}

// Als iets collide met een (string of regex) op de map zoals die in
// resources staat. Regex kan gebruikt worden voor objectives (\d voor getal)
// string kan gebruikt worden voor exit, wall (@ of # respectievelijk) etc..
function collideWith(x, y, map, condition) {
	if (typeof condition === 'string') {
		return map[y][x] === condition;
	}

	return condition.test(map[y][x]);
}

// Handige functie om collision te doen, met logic die ernaast uitgevoerd kan
// worden. Zo kunnen we dus een exit alleen laten colliden als je nog niet
// alles hebt opgepakt.
function collideIf(x, y, map, condition, closure) {
	return collideWith(x, y, map, condition) && closure(x, y);
}
