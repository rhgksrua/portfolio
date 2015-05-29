<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>rhgksrua</title>
	<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
	{{ HTML::style('/resources/css/reset.css') }}
	{{ HTML::style('/resources/css/home.css') }}
</head>
<body>
	<div class="container">
		<!-- Start of header: contains title and links to resources -->
		<header>
			<div class="header">
				<h1 class="below-divider">rhgksrua</h1>
			</div>
			<div class="resources">
				<ul class="resources-list">
					<li class="resource">
						<a href="">blog</a>
					</li>
					<li class="resource">
						<a href="http://codepen.io/rhgksrua">Codepen</a>
					</li>
					<li class="resource">
						<a href="https://github.com/rhgksrua">Github</a>
					</li>
				</ul>
			</div>
		</header>
		<!-- End of header -->
		<div class="content-container">
			<div class="projects">
				<h2>Projects</h2>
				<ul class="project-list">
					<li class="project">
						<a href="/urlchecker">Url Checker</a>
						<span>Check url status</span>
					</li>
					<li class="project">
						<a href="/urlshortener">Url Shortener</a>
						<span>Shorten urls</span>
					</li>
					<li class="project">
						<a href="/tutorials">Tutorials</a>
						<span>Stuff stuff stuff tutorial stuff</span>
					</li>
					<li class="project">
						<a href="/tutorials/angularjs">Tutorials with AngularJS</a>
						<span>Tutorial based on AngularJS</span>
					</li>
					<li class="project">
						<a href="/blackjack">Blackjack</a>
						<span>Simple blackjack card game with JQuery</span>
					</li>
					<li class="project">
						<a href="/arcs">Arcs</a>
						<span>Create arcs</span>
					</li>
				</ul>
			</div>
		</div>
		<footer>
			<div class="footer-container top-divider">
				Copyright © 2015 rhgksrua.  All rights reserved.
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
	</div>
</body>
