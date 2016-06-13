@extends('layouts.app')

@section('title')
	Spel - Who says learning can't be fun?
@endsection

@section('head')
	<link rel="stylesheet" href="{{ url('/css/game.css') }}">
@endsection

@section('body')
	<div id="board">
		{!! $board !!}
	</div>
@endsection
