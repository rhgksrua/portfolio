@extends('master')

@section('header')
    {{ HTML::style('/resources/css/tutorials/tutorials.css') }}
@stop

@section('content')

    <h1><a href="/tutorials">Tutorials</a></h1>
    <form action="/tutorials/search" method="get">
        <input type="text" name="search" class="search">
        <input type="submit">

    </form>
    @if (Session::get('message'))
    <div class="flash">{{ Session::get('message') }}</div>
    @endif
    <div class="tutorial-container">
        <div class="title-container">
            <h3><a href="{{ $tutorial->link }}">{{ $tutorial->title }} from <span class="tutorial-source">{{ $tutorial->site_name }}</span></a></h3>
        </div>
        <div class="tutorial-url"><a href="{{ $tutorial->link }}">{{ $tutorial->link }}</a></div>
        <div class="tutorial-date">{{ $tutorial->tutorial_created_at }}</div>
        <!--
        <div class="tutorial-posted-here">01 JAN 1900</div>
        -->
        <div class="tutorial-uses">
            <h4 class="uses">Uses:</h4>
            <ul>
                @foreach($tutorial->usings as $using)
                <li class="multiples">{{ $using->using }}</li>
                @endforeach
            </ul>
        </div>
        <div class="demo-available">Live Demo: {{ $tutorial["demo"] == 0 ? "No" : "Yes" }}</div>
        <div class="tutorial-difficulty">
            Difficulty: 
            @if ($tutorial["difficulty"] == 0)
                <span>Easy</span>
            @elseif ($tutorial["difficulty"] == 1)
                <span>Intermediate</span>
            @else
                <span>Advanced</span>
            @endif
        </div>
        <div class="tutorial-prerequisite">
            <h5>Prerequisite:</h5>
            <div class="multiples">{{ $tutorial["prerequisites"] }}</div> 
        </div>
    
        <div class="tutorial-summary">
            <h5>Summary</h5>
            <div class="multiples">
                {{ $tutorial->summary }}
            </div>
        </div>
    </div>
      

@stop