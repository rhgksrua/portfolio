@extends('master')

@section('resources')
    <script type="text/javascript" src="/resources/bower/jquery/dist/jquery.js"></script>
    <script src="/resources/bower/angular/angular.js"></script>
    <script src="/resources/bower/angular-resource/angular-resource.js"></script>
    <script src="/resources/js/tutorialsangular/services.js"></script>
    <script src="/resources/js/tutorialsangular/app.js"></script>

@stop

@section('content')
    <div class="app-container" ng-app="tutorialsApp" ng-controller="TutorialsController">
        <h1><a href="/tutorials">Tutorials</a></h1>
        <form action="/tutorials/search" method="get">
            <input type="text" name="search" class="search">
            <input type="submit">

        </form>

        <div class="tutorials-container">
            [[1 + 2]]

        </div>
    </div>

@stop