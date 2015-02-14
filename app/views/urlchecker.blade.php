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
		<h1>URL Checker</h1>
		<input id="url" type="text" name="url" placeholder="Enter Url Here">
		<br />
		<div class="submit">
			<button id="submit" type="submit" value="Check">CHECK</button>
			<img class="loading hide" src="" alt="loading...">
		</div>
		<div class="results">
		</div>
	</div>
	{{ HTML:: script('/resources/js/urlchecker.js') }}

</body>