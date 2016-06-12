<?php

namespace App;

class TileManager {
    protected $tiles;

    public function __construct() {
        $charcodes = Yaml::parse(file_get_contents(resource_path('game/tiles.yml')));

        foreach($charcodes as $key => $value) {
            $filename = public_path() . '/img/bmp/' . $value . 'png';

            if(!is_file($filename)) {
                throw new UnknownTileException("The tile '{$key}' has an invalid sprite ('{$value}')");
            }
        }
    }
}