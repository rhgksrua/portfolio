@extends('master')

@section('header')
    {{ HTML::style('/resources/css/tutorials/showadd.css') }}
    {{ HTML::style('/resources/css/tutorials.css') }}
@stop

@section('content')
    <div class="showadd-container">
        <h2>Add a Tutorial</h2>

        @if ($added && $success)
        <div> ADDED! </div>
        <div class="tutorial-container">
            <div class="title-container">
                <h3><a href="{{ $inputs["link"] }}">{{ $inputs["title"] }}<span class="tutorial-source">Website name</span></a></h3>
            </div>
            <div class="tutorial-url">{{ $inputs["link"] }}</div>
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
        @elseif ($added && !$success)
        <div> FAILED TO ADD </div>
        @endif


        <form action='/tutorials/add' method='post'>
            <input type="text" name="title" placeholder="Title">
            <br >
            <input type="text" name="link" placeholder="URL">
            <br >
            <input type="date" name="date" placeholder="Date of Tutorial">
            <br >
            <input type="text" name="uses" placeholder="Uses">
            <br >
            <input type="text" name="demo" placeholder="Demo">
            <br >
            <input type="text" name="difficulty" placeholder="Difficulty">
            <br >
            <input type="text" name="prerequisites" placeholder="Prerequisites">
            <br >
            <input type="text" name="summary" placeholder="summary">
            <br >
            <input type="submit">


        </form>


    </div>

@stop