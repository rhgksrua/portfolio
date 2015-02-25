@extends('master')

@section('header')
    {{ HTML::style('/resources/css/tutorials/showadd.css') }}
    {{ HTML::style('/resources/css/tutorials/tutorials.css') }}
@stop

@section('content')
    
    <div class="showadd-container">
        <h1>Add a Tutorial</h1>
        <a href="/tutorials">Back to Tutorials</a>

        @if ($added && $success)
        
        <div class="tutorial-container">
            <div class="added">ADDED!</div>
            <div class="title-container">
                <h3><a href="http://{{ $inputs["link"] }}">{{ $inputs["title"] }}  FROM <span class="tutorial-source">{{ $inputs["sitename"] }}</span></a></h3>
            </div>
            <div class="tutorial-url"><a href="http://{{ $inputs["link"] }}">{{ $inputs["link"] }}</a></div>
            <div class="tutorial-date">{{ isset($date) ? $date : '' }}</div>
            <div class="tutorial-uses">
                <h4 class="uses">Uses:</h4>
                <ul>
                    @foreach($usings as $using)
                    <li class="multiples">{{ $using }}</li>
                    @endforeach
                </ul>
            </div>
            <div class="demo-available">Live Demo: {{ $inputs["demo"] == 0 ? "No" : "Yes" }}</div>
            <div class="tutorial-difficulty">
                Difficulty: 
                @if ($inputs["difficulty"] == 0)
                    <span>Easy</span>
                @elseif ($inputs["difficulty"] == 1)
                    <span>Intermediate</span>
                @else
                    <span>Advanced</span>
                @endif
            </div>
            <div class="tutorial-prerequisite">
                <h5>Prerequisite</h5>
                <div class="multiples">{{ $inputs["prerequisites"] }}</div> 
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
            <input class="date" type="text" name="date_month" placeholder="Month (MM)" value="{{ Input::old('date_month') }}">
            <input class="date" type="text" name="date_day" placeholder="Day (DD)" value="{{ Input::old('date_day') }}">
            <input class="date" type="text" name="date_year" placeholder="Year (YYYY)" value="{{ Input::old('date_year') }}">

            <br />
            <input type="text" id="uses" name="uses" placeholder="Uses (separated by comma)" value="{{ Input::old('uses') }}">
            {{ $errors->first('uses') }}
            <br >
            <span>Demo: </span>
            <input type="radio" name="demo" value="1">Yes
            <input type="radio" name="demo" value="0">No
            {{ $errors->first('demo') }}
            <br >
            <span>Difficulty: </span>
            <input type="radio" name="difficulty" value="0">Beginner
            <input type="radio" name="difficulty" value="1">Intermediate
            <input type="radio" name="difficulty" value="2">Advanced
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