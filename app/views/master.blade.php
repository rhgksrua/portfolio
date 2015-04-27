<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
	{{ HTML::style('/resources/css/reset.css') }}
	@section('maincss')
	{{ HTML::style('/resources/css/main.css') }}
	@show
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
	@show

	@section('content')
		Main content

	@show
	@section('footer')
		<footer>
			<div class="footer-container top-divider">
				2015 rhgksrua
			</div>
			<script>
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

				ga('create', 'UA-61535736-2', 'auto');
				ga('send', 'pageview');

			</script>
		</footer>
	@show
	</div>
</body>
</html>