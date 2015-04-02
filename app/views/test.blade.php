@extends('master')

@section('resources')
    <script type="text/javascript" src="/resources/bower/jquery/dist/jquery.js"></script>
    <script src="/resources/bower/angular/angular.js"></script>
    <script>

        var customInterpolate = angular.module('customInterpolatationApp', []);
        customInterpolate.config(function($interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        });

        customInterpolate.controller('DemoController', function() {


        });
    </script>

@stop

@section('content')
    <div ng-app="customInterpolatationApp" class="app-container">
        <div ng-controller="DemoController">
            [[1 + 2]]
        </div>


    </div>

<!--
	<p> This is a test</p>
    <div ng-app="App" ng-controller="DemoController">
        <p>name: <input type="text" ng-model="name"></p>
        <p>[[name]]</p>
    </div>
    <script type="text/javascript">
        var a = $("p").text();
        alert(a);

    </script>
-->


@stop