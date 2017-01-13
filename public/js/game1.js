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

var board, player, hitbox, objective, goal, list, helper, finished, noClip;

noClip = false;

var keyLoops = {

	interval: 50,

	loops: [],

	addIfNotAdded: function (movement) {
		if (! this.loops[movement.direction]) {
			this.loops[movement.direction] = setInterval(function () {
				movePlayer(player, movement.dx, movement.dy);
			}, this.interval);

			console.log("Added keyloop: " + movement.direction);
		}
	},

	remove: function (direction) {

		if (this.loops[direction]) {
			clearInterval(this.loops[direction]);
			this.loops[direction] = null;

			console.log("Removed keyloop: " + direction);
		}
	},

	removeAll: function () {

		for (var index in this.loops) {
			if (this.loops[index]) this.remove(index);
		}
	}
};

$(function() {
	board = $('#board');
	player = $('#player');
	hitbox = $('#player .hitbox');
	goal = $('.objective').size();
	list = $('#goals');
	helper = $('#helper');
	objective = 0;
	finished = false;

	urlpath = window.location.pathname.split('/');

	switch(urlpath[urlpath.length - 1]) {
		case '1':
			alert('In dit level ga je de basis van een HTML document opstellen\nPak alle tags in de goede volgorde op om het level te halen!');
			break;

		case '2':
			alert('In dit bestand ga je een PHP script maken die aftelt van 16 naar 0');
			break;

		default:
			break;
	}

	$(window).on('keydown', function (e) {

		// Als je het spel al uitgespeeld hebt kun je niet meer bewegen.
		// Dit schakelt alle event handling uit voor elke keydown toets, weet
		// niet of dat invloed heeft op e.v.t. invoering van highscore, omdat
		// ik geen e.preventDefault() roep.
		if (finished) return;

		if (movement = getDxDy(e.which)) {
			e.preventDefault();

			keyLoops.addIfNotAdded(movement);
		}
	});

	$(window).on('keyup blur', function (e) {

		if (movement = getDxDy(e.which)) keyLoops.remove(movement.direction);

		if (e.type === "blur") keyLoops.removeAll();

	});

});

function getDxDy(key) {
	switch (key) {
		case 87: // w
		case 38: // arrow up
			return {dx: 0, dy: -1, direction: 'N'}; // north

		case 65: // a
		case 37: // arrow left
			return {dx: -1, dy: 0, direction: 'W'}; // west

		case 83: // s
		case 40: // arrow down
			return {dx: 0, dy: 1, direction: 'S'}; // south

		case 68: // d
		case 39: // arrow right
			return {dx: 1, dy: 0, direction: 'E'}; // east

		default:
			return null;
	}
}

// Deze "collide*" closures zijn functies die worden geroepen dmv collideIf.
// Hier kun je een character of regex geven, en dan zoekt die functie uit
// of de speler collide met dat ding dat met de gegeven string of regex overeenkomt.
// Als dit zo is wordt de closure uitgevoerd zodat nog verder gecontroleerd
// kan worden of de speler uberhaubt kan colliden met dit ding.
// return True als dat kan (wel collision, dus kan er niet op staan), False
// als dat niet kan (geen collision -> kan er wel op staan.)
var collideExit = function (x, y) {

	if (objective === goal) {
		notify('Je hebt het level gehaald!');

		var urlpath = window.location.pathname.split('/');
		var levelgetal;
		var asdf;

		switch(levelgetal = urlpath[urlpath.length - 1]) {
			case '1':
				alert('In dit level heb je een HTML document opgesteld\nHTML documenten vormen de basis van alle web paginas\n Ga door naar het volgende level om PHP code te schrijven om je web paginas te laten leven!');

				asdf = window.location.href.split('/');
				asdf[asdf.length - 1] = '2';

				window.location.href = asdf.join('/');

				break;

			case '2':
				alert('In dit level heb je je eerste stukje PHP code geschreven!\nDeze code telt af van 16 naar 0\n en print elk getal op de pagina.');
				break; // Deze stonden er altijd al maar dat staat niet in git

			default:
				break;
		}

		finished = true;
		return false;
	}

	notify('Je hebt nog niet alle snippets code opgepakt. :c');

	return true;
};

var collideObjective = function (x, y) {

	// Kut manier om het n-de element uit het bord te halen (waar de speler naartoe gaat.)
	var item = $('#board .tile:eq(' + (y * (map.length - 1) + x) + ')');

	// Als dit item nog niet opgepakt moet worden
	if (item.data('order') > objective) {
		notify('Je moet eerst nog andere snippets oppakken voordat deze past.');

		// location.reload();

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

	// Dit word miss heel vervelend, maar ik ga ervan uit dat (0; 0) linksboven op het bord ligt.
	// Hier begint de player dus zo lijkt het me logischer
	// Daarna wel gewoon normaal, dus als je naar beneden zou gaan wordt
	// y positief (top in CSS stelt afstand van bovenkant in)

	xold = p.data('x');
	yold = p.data('y');

	xnew = xold + dx;
	ynew = yold + dy;

	// Ziek if-statement lol
	if (outOfBounds(xnew, ynew, map)
		|| (! noClip && collideWith(xnew, ynew, map, '#'))
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
		helper.text('-');
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

function notify(message) {

	// Release alle toetsen, zodat speler niet constant in dat ding blijft lopen.
	keyLoops.removeAll();

	console.log("Send notification: " + message);
	alert(message);
}
