@extends('layouts.app')

@section('title')
	Level {{ $level }} - Spel2
@endsection

@section('head')
	<link rel="stylesheet" href="{{ url('/css/game2.css') }}">
	<script>var level = {{ $level }}</script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
	<script src="{{ url('/js/Game.js') }}"></script>
	<script src="{{ url('/js/game2.js') }}"></script>
@endsection

@section('body')
	<div id="container">
		<canvas id="background">
			<h1>Koop een browser faggot</h1>
		</canvas>
	</div>
@endsection
