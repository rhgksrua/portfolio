@extends('master')

@section('header')
    {{ HTML::style('/resources/css/tutorials/tutorials.css') }}
@stop

@section('content')

    <h1>Tutorials</h1>
    @if ($loggedIn)
    <div>LOGGED IN!!!</div>
    @endif
    @foreach ($tutorials as $tutorial)

    <div class="tutorial-container">
        <div class="title-container">
            <h3><a href="http://{{ $tutorial->link }}">{{ $tutorial->title }} from <span class="tutorial-source">{{ $tutorial->site_name }}</span></a></h3>
        </div>
        <div class="tutorial-url"><a href="http://{{ $tutorial->link }}">{{ $tutorial->link }}</a></div>
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
        <div class="demo-available">Live Demo: Yes/No</div>
        <div class="tutorial-difficulty">Difficulty: Beginner/Intermediate/Advanced</div>
        <div class="tutorial-prerequisite">
            <h5>Prerequisite</h5>
            <div class="multiples">
                {{ $tutorial->prerequisites }}
            </div>
        </div>
        
        <div class="tutorial-summary">
            <h5>Summary</h5>
            <div class="multiples">
                {{ $tutorial->summary }}
            </div>
        </div>
        @if ($loggedIn)
        <div class="delete">
            <a href="/tutorials/remove/{{ $tutorial->id }}">REMOVE</a>
        </div>
        @endif
    </div>

    @endforeach

@stop