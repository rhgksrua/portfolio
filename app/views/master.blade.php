<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
	{{ HTML::style('/resources/css/reset.css') }}
	{{ HTML::style('/resources/css/main.css') }}
	@section('header')
	{{ HTML::style('/resources/css/urlchecker.css') }}

	<title>rhgksrua</title>
	@show
</head>
<body>
	<div class="container">
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