@extends('master')

@section('header')
    {{ HTML::style('/resources/css/blackjack/blackjack.css') }}
@stop

@section('content')
    <h1>BlackJack</h1>

    <div class="blackjack-container">

        <h4>Game Status: </h4>
        <div id="game-status"></div>
        <h4>Deck Status: </h4>
        <div id="deck-status"></div>

        <div class="dealer left">
            <h2>Dealer</h2>

            <p>Cards: </p>
            <div id="dealer-cards"></div>

            <p>Cards Total: </p>
            <div id="dealer-total"></div>

            <p>Dealer Status</p>
            <div id="dealer-status"></div>

            <p>Dealer Money</p>
            <div id="dealer-money"></div>
        </div>
        <div class="player left">
            <h2>Player</h2>
            <p>Cards: </p>
            <div id="player0-cards"></div>
            <p>Cards Total: </p>
            <div id="player0-total"></div>
            <p>Player Status</p>
            <div id="player0-status"></div>
            <p>Player Money</p>
            <div id="player0-money"></div>
            <p>Player Actions</p>
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
    <div id="clear"></div>

    
    

    {{ HTML:: script('/resources/bower/jquery/dist/jquery.js') }}
    {{ HTML:: script('/resources/bower/playing-cards-js/src/playingcards.js')}}
    {{ HTML:: script('/resources/js/blackjack/blackjack2.js') }}

@stop
