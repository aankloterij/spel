@extends('layouts.app')

@section('title')
	Listing games
@endsection

@section('body')
	{{-- TODO Dit alles kan beter een tabel zijn met 2 columns voor de linenr en de code --}}
	<div class="code">
		<p>
			<span class="format linenr"> 1 </span>
			<span class="format gray italics">
				/**
			</span>
		</p>

		<p>
			<span class="format linenr"> 2 </span>
			<span class="format gray italics">
				&nbsp;* Click a level to start the game!
			</span>
		</p>

		<p>
			<span class="format linenr"> 3 </span>
			<span class="format gray italics">
				&nbsp;*/
			</span>
		</p>

		<p>
			<span class="format linenr"> 4 </span>
			<span class="format">
				&nbsp;
			</span>
		</p>

		<p>
			<span class="format linenr"> 5 </span>
			<span class="format red">$games</span>
			<span class="format white">&nbsp;= </span>
			<span class="format gray">[</span>
		</p>

		@for($i=0; $i < $levelcount ; $i++)
			<p class="link">
				<span class="format linenr"> {{ $i + 6 }} </span>
				<span class="format purple">
					<a href="{{ url('/game/' . ($i + 1)) }}">
						&emsp;&apos;Level {{ $i + 1 }}&apos;</a></span>
				@if($i + 1 < $levelcount)
					<span class="format white">&#44;</span>
				@endif
			</p>
		@endfor

		<p>
			<span class="format linenr"> {{ $levelcount + 6 }} </span>
			<span class="format gray">];</span>
		</p>


		<p>
			<span class="format linenr"> {{ $levelcount + 7 }} </span>
			<span class="format">&nbsp;</span>
		</p>
	</div>
@endsection
