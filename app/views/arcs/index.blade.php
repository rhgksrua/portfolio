@extends('master')

@section('header')

    <link rel="stylesheet" href="/resources/css/arcs/arcs.css">
@stop

@section('content')
    <h1>Arcs</h1>
    <div class="container">
      <canvas id="drawing" width="300" height="300"></canvas>
      <div id="controls">
        <button id="add">Add</button>
        <button id="remove">Remove</button>
      </div>
    </div>
    
    

    
   
    {{ HTML:: script('/resources/js/blackjack/blackjack2.js') }}

@stop