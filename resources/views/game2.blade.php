@extends('layouts.app')

@section('title')
	Level $level - Spel2
@endsection

@section('head')
	<link rel="stylesheet" href="{{ url('/css/game2.css') }}">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
	<script src="{{ url('/js/game2.js') }}"></script>
@endsection

@section('body')
	<div id="board" class="board">
		<div id="player"></div>
		{!! $board !!}
	</div>

@endsection
