@extends('master')

@section('header')
    {{ HTML::style('/resources/css/tutorials/tutorials.css') }}
@stop

@section('resources')
    <script type="text/javascript" src="/resources/bower/jquery/dist/jquery.js"></script>

@stop

@section('content')
    <div class="app-container" ng-app="tutorialsApp" ng-controller="tutorialsController">
        <h1><a href="/tutorials">Tutorials</a></h1>
        <input ng-model="query">
        
        <div class="tutorial-container" ng-repeat="tutorial in data.tutorials | filter:query">
            <div class="title-container">
                <h3><a href="/tutorials/[[ tutorial.id ]]">[[ tutorial.title ]] from <span class="tutorial-source">[[ tutorial.site_name ]]</span></a></h3>
            </div>
            <div class="tutorial-url"><a href="http://[[tutorial.link ]]">[[tutorial.link ]]</a></div>
            <div class="tutorial-date">[[tutorial.tutorial_created_at ]]</div>
            <!--
            <div class="tutorial-posted-here">01 JAN 1900</div>
            -->
            <div class="tutorial-uses">
                <h4 class="uses">Uses:</h4>
                <ul>
                    <li class="multiples" ng-repeat="use in tutorial.usings">
                        [[use.using]]
                    </li>
                </ul>
            </div>
            <div class="demo-available">Demo Available: [[tutorial.demo | demo]]</div>
            <div class="tutorial-difficulty">
                Difficulty: [[tutorial.difficulty | diff]]
            </div>
            <div class="tutorial-prerequisite">
                <h5>Prerequisite:</h5>
                <div class="multiples">[[tutorial.prerequisites]]</div> 
            </div>
        
            <div class="tutorial-summary">
                <h5>Summary</h5>
                <div class="multiples">
                    [[tutorial.summary ]]
                </div>
            </div>
            
        </div>
    </div>
    <script src="/resources/bower/angular/angular.js"></script>
    <script src="/resources/bower/angular-resource/angular-resource.js"></script>
    <script src="/resources/js/tutorialsangular/services.js"></script>
    <script src="/resources/js/tutorialsangular/app.js"></script>
    <script src="/resources/js/tutorialsangular/controllers.js"></script>
    <script src="/resources/js/tutorialsangular/filters.js"></script>

@stop