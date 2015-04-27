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

    <div class="descriptiont">
        <h4>Description</h4>
        <p>
            Add or remove arcs.
        </p>

    </div>
    
    

    
   
    {{ HTML:: script('/resources/js/arcs/arcs.js') }}

@stop