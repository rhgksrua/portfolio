@extends('master')


@section('header')
    {{ HTML::style('/resources/css/urlshortener/main.css') }}
@stop

@section('content')



    <h1><a href='/urlshortener'>URL Shortener</a></h1>
    <div class='input-container'>
        <form action='/urlshortener' method='post'>
            <input id='url' type='text' name='url' placeholder='Enter URL Here'>
            <input id='btn' type='submit' value='Shorten!'>
        </form>
    </div>

@stop
