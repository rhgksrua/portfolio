@extends('master')

@section('header')


@stop

@section('resources')
    <script src="/resources/bower/jquery/dist/jquery.js"></script>
@stop

@section('content')
    <div class="drag-container">

        <canvas id="drawing"></canvas>



    </div>

@stop

@section('footer')
    <script src="/resources/js/drag/drag.js"></script>

@stop