<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
	{{ HTML::style('/resources/css/reset.css') }}
	@section('maincss')
	{{ HTML::style('/resources/css/main.css') }}
	@stop
	@section('header')
	{{ HTML::style('/resources/css/urlchecker.css') }}


	<title>rhgksrua</title>


	<!-- Add additional resources here -->
	@show
	@section('resources')

	@show
</head>
<body>
	@section('login')
	<div class="home">
		<a href="/">HOME</a>
		@if ( Auth::check())
		<a href="/logout">LOGOUT</a>
		@endif
	</div>
	<div class="container">
	@stop

	@section('content')
		Main content

	@show
	@section('footer')
		<footer>
			<div class="footer-container top-divider">
				Copyright © 2015 rhgksrua.  All rights reserved.
			</div>
		</footer>
	@show
	</div>
</body>
</html>