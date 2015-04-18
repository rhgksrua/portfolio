@extends('master')

@section('header')
    {{ HTML::style('/resources/css/blackjack/blackjack.css') }}
@stop

@section('content')
    <h1>BlackJack</h1>

    <div class="blackjack-container">
        <button class="deal">Deal</button>

        <div class="dealer">
            <h2>Dealer</h2>
            <div id="dealer-cards">
            </div>
            <div id="dealer-total">
            </div>
            <p id="dealer-status">ok</p>
        </div>
        <div class="player">
            <h2>Player</h2>
            <div id="player-cards">

            </div>
            <div id="player-total">
            </div>
            <p id="player-status">iok</p>
        </div>
        <button id="hit">HIT</button>
        <button id="stand">STAND</button>
        


    </div>

    
    

    {{ HTML:: script('/resources/bower/jquery/dist/jquery.js') }}
    {{ HTML:: script('/resources/bower/playing-cards-js/src/playingcards.js')}}
    {{ HTML:: script('/resources/js/blackjack/blackjack.js') }}

@stop
