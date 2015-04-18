@extends('master')

@section('header')
    {{ HTML::style('/resources/css/blackjack/blackjack.css') }}
@stop

@section('content')
    <h1>BlackJack</h1>

    <div class="blackjack-container">

        <div id="game-status"></div>

        <div class="dealer">
            <h2>Dealer</h2>
            <div id="dealer-cards"></div>
            <div id="dealer-total"></div>
            <div id="dealer-status"></div>
        </div>
        <div class="player">
            <h2>Player</h2>
            <div id="player0-cards"></div>
            <div id="player0-total"></div>
            <div id="player0-status"></div>
            <div id="player0-actions">
                <label for="bet">Bet</label>
                <input type="text" id="bet" value="100" />
                <button id="hit" disabled>Hit</button>
                <button id="stand" disabled>Stand</button>
            </div>
        </div>
        <button id="deal">Deal</button>
        <p id="errors"></p>
    </div>

    
    

    {{ HTML:: script('/resources/bower/jquery/dist/jquery.js') }}
    {{ HTML:: script('/resources/bower/playing-cards-js/src/playingcards.js')}}
    {{ HTML:: script('/resources/js/blackjack/blackjack.js') }}

@stop
