<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>rhgksrua</title>
	<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
	{{ HTML::style('/resources/css/reset.css') }}
	{{ HTML::style('/resources/css/urlchecker.css') }}
</head>
<body>

	<div class="container">
		<div class="home"><a href="/">HOME</a></div>
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
	</div>
	{{ HTML:: script('/resources/js/urlchecker.js') }}

</body>
</html>