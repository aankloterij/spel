<?php

namespace App;

class UnknownTileException extends \Exception {
    protected $message;

    public function __construct($msg) {
        $this->message = msg;
    }
}