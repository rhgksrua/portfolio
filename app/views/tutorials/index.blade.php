@extends('master')

@section('header')
    {{ HTML::style('/resources/css/tutorials.css') }}
@stop

@section('content')

    <h1>Tutorials</h1>

    @for ($i = 0; $i < 5; $i++)

    <div class="tutorial-container">
        <div class="title-container">
            <h3><a href="">How to do stuff from <span class="tutorial-source">Website name</span></a></h3>
        </div>
        <div class="tutorial-url">www.tutorial.com</div>
        <div class="tutorial-date">Posted: 01 JAN 1899</div>
        <div class="tutorial-posted-here">01 JAN 1900</div>

        <div class="tutorial-uses">
            <h4 class="uses">Uses:</h4>
            <ul>
                <li class="multiples">Javascript</li>
                <li class="multiples">Laravel 4.2</li>
                <li class="multiples">CSS</li>
            </ul>
        </div>
        <div class="demo-available">Live Demo: Yes/No</div>
        <div class="tutorial-difficulty">Difficulty: Beginner/Intermediate/Advanced</div>
        <div class="tutorial-prerequisite">
            <h5>Prerequisite</h5>
            <ul>
                <li class="tutorial-requirements multiples">Basic JS</li>
                <li class="tutorial-requirements multiples">Basic HTML</li>
            </ul>
        </div>
        
        <div class="tutorial-summary">
            <h5>Summary</h5>
            <div class="multiples">
                This tutorial show you how to do stuff
            </div>
        </div>
    </div>

    @endfor

@stop