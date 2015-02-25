@extends('master')

@section('header')
    {{ HTML::style('/resources/css/tutorials/showadd.css') }}
    {{ HTML::style('/resources/css/tutorials/tutorials.css') }}
@stop

@section('content')
    
    <div class="showadd-container">
        <h1>Add a Tutorial</h1>

        @if ($added && $success)
        
        <div class="tutorial-container">
            <div class="added">ADDED!</div>
            <div class="title-container">
                <h3><a href="{{ $inputs["link"] }}">{{ $inputs["title"] }} <span class="tutorial-source">{{ $inputs["sitename"] }}</span></a></h3>
            </div>
            <div class="tutorial-url">{{ $inputs["link"] }}</div>
            <div class="tutorial-date">{{ isset($date) ? $date : '' }}</div>
            <div class="tutorial-posted-here">Date of this post</div>

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
                    {{ $inputs["summary"] }}
                </div>
            </div>
        </div> 
        @elseif ($added && !$success)
        <div> FAILED TO ADD </div>
        @endif


        <form action='/tutorials/add' method='post'>
            <input type="text" name="title" placeholder="Title" value="{{ Input::old('title') }}">
            {{ $errors->first('title') }}
            <br >
            <input type="text" name="link" placeholder="URL" value="{{ Input::old('link') }}">
            {{ $errors->first('link') }}
            <br >
            <input type="text" name="sitename" placeholder="Site Name" value="{{ Input::old('sitename') }}">
            {{ $errors->first('sitename') }}
             
            <!--
            <input type="date" name="date" placeholder="Date of Tutorial" value="{{ Input::old('date') }}">
            {{ $errors->first('date') }}
        -->
            <br />
            <input type="text" name="date_month" placeholder="Month (MM)" value="{{ Input::old('date_month') }}">
            <input type="text" name="date_day" placeholder="Day (DD)" value="{{ Input::old('date_day') }}">
            <input type="text" name="date_year" placeholder="Year (YYYY)" value="{{ Input::old('date_year') }}">

            <br >
            <br />
            <input type="text" id="uses" name="uses" placeholder="Uses (separated by comma)" value="{{ Input::old('uses') }}">
            {{ $errors->first('uses') }}
            <br >
            <input type="text" name="demo" placeholder="Demo" value="{{ Input::old('demo') }}">
            {{ $errors->first('demo') }}
            <br >
            <input type="text" name="difficulty" placeholder="Difficulty" value="{{ Input::old('difficulty') }}">
            {{ $errors->first('difficulty') }}
            <br >
            <input type="text" name="prerequisites" placeholder="Prerequisites" value="{{ Input::old('prerequisites') }}">
            {{ $errors->first('prerequisites') }}
            <br >
            <textarea name="summary" placeholder="Summary">{{ Input::old("summary") }}</textarea>
            {{ $errors->first('summary') }}
            <br>
            <input type="submit">


        </form>


    </div>

@stop