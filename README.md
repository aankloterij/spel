# Spel

[![Build Status](https://travis-ci.org/laravel/framework.svg)](https://travis-ci.org/laravel/framework)
[![Total Downloads](https://poser.pugx.org/laravel/framework/d/total.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Stable Version](https://poser.pugx.org/laravel/framework/v/stable.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Unstable Version](https://poser.pugx.org/laravel/framework/v/unstable.svg)](https://packagist.org/packages/laravel/framework)
[![License](https://poser.pugx.org/laravel/framework/license.svg)](https://packagist.org/packages/laravel/framework)

Wij hebben allemaal professionele hipster build tools etc zoals je hierboven kan zien

## Hoe werkt dit
Maak een map aan in `resources/game/maps/` en noem hem `$jelevel.map`. Maak hierin een mooie map, alleen `16x16` is supported. Je characters in je maps file corresponderen met een hashmap in `resources/game/pairs/`, bv `'#': grass` maakt elements met de class grass. Dan mag je die zelf lekker gaan stylen. Als je meer dan `16x16` wilt moet je nog wat dingen in `public/css/game.css` aanpassen. Het blok wat niet aangeraakt mag worden moet altijd `wall` heten.

## TODO
### game2
- Gameloop met beweging
- Collision detection
- Images

Zie ook public/test.html voor een handig example
