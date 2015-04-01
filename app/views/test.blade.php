@extends('master')

@section('resources')
    <script type="text/javascript" src="/resources/bower/jquery/dist/jquery.js"></script>
    <script src="/resources/bower/angular/angular.js"></script>

@stop

@section('content')
	<p> This is a test</p>
    <script type="text/javascript">
        var a = $("p").text();
        alert(a);

    </script>

@stop