@extends('master')

@section('header')


@stop

@section('resources')
    <script src="/resources/bower/jquery/dist/jquery.js"></script>
    <style>
        html, body {
            box-sizing: border-box;
        }
        .drag-container {
            float: left;
            width: 100%;
            box-sizing:border-box;
            -moz-box-sizing:border-box;
            -webkit-box-sizing:border-box;
        }
        #drawing {
            border: 1px solid black;
            box-sizing:border-box;
            -moz-box-sizing:border-box;
            -webkit-box-sizing:border-box;
            overflow: hidden;
        }

    </style>
@stop

@section('content')
    <div class="drag-container">
        <canvas id="drawing" height="500px" width="800px"></canvas>
    </div>
@stop
@section('footer')
    <script src="/resources/js/drag/drag.js"></script>
@stop