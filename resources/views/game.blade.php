@extends('layouts.app')

@section('title')
	Level {{ $level }} - Spel
@endsection

@section('head')
	<link rel="stylesheet" href="{{ url('/css/game.css') }}">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
	<script src="{{ url('/js/jquery-collision.min.js') }}"></script>
	<script src="{{ url('/js/game1.js') }}"></script>
@endsection

@section('body')
	<div id="board" class="board">
		<div id="player" data-x="1" data-y="0"><div class="hitbox"></div></div>
		{!! $board !!}
	</div>

	<div class="right">
	<span id="helper" class="helper">-</span>
		<ul id="goals" class="goals"></ul>
	</div>

	<script type="text/javascript">
		map = {!! $jsonmap !!};
	</script>
@endsection
