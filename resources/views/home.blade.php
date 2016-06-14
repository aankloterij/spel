@extends('layouts.app')

@section('title')
	Spel - Who says learning can't be fun?
@endsection

@section('body')
	<div class="intro">
		<img src="{{ url('img/code.svg') }}">
		<h2>Welcome <span class="format red">to</span></h2>
		<h1>Spel</h1>
		<h3>Who says learning can't be fun?</h3>
	</div>

	<div class="code">
		<p>
			<span class="format linenr">
				1
			</span>
			<span class="format gray italics">
				// Click below to start the game!
			</span>
		</p>
		<p class="link">
			<span class="format linenr">
				2
			</span>
			<span class="format orange bold">
				<a href="{{ url('/game') }}">Spel</a>
			</span>
			<span class="format white">
				<a href="{{ url('/game') }}">::</a>
			</span>
			<span class="format gray italics">
				<a href="{{ url('/game') }}">start</a>
			</span>
			<span class="format white">
				<a href="{{ url('/game') }}">();</a>
			</span>
		</p>
		<p>
			<span class="format linenr">3</span>
		</p>
	</div>
@endsection
