@extends('master')

@section('header')
    {{ HTML::style('/resources/css/tutorials/tutorials.css') }}
@stop

@section('content')

    <h1>Tutorials</h1>
    <form action="/tutorials/search" method="get">
        <input type="text" name="search" class="search">
        <input type="submit">

    </form>
    @if (Session::get('message'))
    <div class="flash">{{ Session::get('message') }}</div>
    @endif
    @foreach ($tutorials as $tutorial)

    <div class="tutorial-container">
        <div class="title-container">
            <h3><a href="/tutorials/{{ $tutorial->id }}">{{ $tutorial->title }} from <span class="tutorial-source">{{ $tutorial->site_name }}</span></a></h3>
        </div>
        <div class="tutorial-url"><a href="{{ $tutorial->link }}">{{ $tutorial->link }}</a></div>

    </div>
    @endforeach

@stop