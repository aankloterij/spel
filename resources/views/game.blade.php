@extends('layouts.app')

@section('title')
	Level {{ $level }} - Spel
@endsection

@section('head')
	<link rel="stylesheet" href="{{ url('/css/game.css') }}">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
	<script src="{{ url('/js/jquery-collision.min.js') }}"></script>
	<script src="{{ url('/js/game.js') }}"></script>
@endsection

@section('body')
	<div id="board">
		<div id="player"></div>
		{!! $board !!}
	</div>
@endsection
