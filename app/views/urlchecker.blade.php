@extends('master')

@section('header')
	{{ HTML::style('/resources/css/urlchecker.css') }}
@stop

@section('content')

	
	<h1>URL Checker<span><img class="loading hide" src="/resources/img/spin.gif" alt="loading..."></span></h1>


	<div class="input-container">
		<div class="close" id="close">
			<div class="close-left"></div>
			<div class="close-right"></div>
		</div>
		<input id="url" type="text" name="url" placeholder="Enter Url Here">
	</div>
	
	
	<input type="submit" id="btn" type="submit" value="Check">
	
	
	<div class="results">
	</div>
	
	{{ HTML:: script('/resources/js/urlchecker.js') }}
	
@stop
