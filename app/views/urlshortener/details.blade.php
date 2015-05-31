@extends('master')


@section('header')
    {{ HTML::style('/resources/css/urlshortener/main.css') }}
@stop

@section('content')



    <h1><a href='/urlshortener'>URL Shortener</a></h1>
    <div class='container'>
    	<div class='link-container'>
    		<h3>Link Info</h3>
			<p>Original Url: {{ $link->url }}</p>
			<p>Short Id: {{ $link->short_url }}</p>
			<p>Date created: {{ $link->created_at }}</p>
		</div>
		<div class='details-container'>
			<h3>Details</h3>
			@foreach ($details as $detail)
			<p>Visitor IP: {{ long2ip($detail->ip) }}</p>
			<p>Count: {{ $detail->count }}</p>
			<p>Last visited date: {{ $detail->updated_at }}</p>
			@endforeach
    	</div>
    </div>

@stop
