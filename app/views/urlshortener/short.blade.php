@extends('master')


@section('header')
    {{ HTML::style('/resources/css/urlshortener/main.css') }}
@stop

@section('content')



    <h1><a href='/urlshortener'>URL Shortener</a></h1>
    <div class='shortener-container'>
    	<p>Shortened URL</p>
    	<p><a href='/urlshortener/{{ $url }}'>{{ Request::root() }}/urlshortener/{{ $url }}</a></p>

    </div>

@stop
