@extends('master')

@section('header')

    <link rel="stylesheet" media="(max-width: 600px)" href="/resources/css/blackjack/blackjack-mobile.css">
    <link rel="stylesheet" media="(min-width: 600px)" href="/resources/css/blackjack/blackjack.css">
@stop

@section('content')
    <h1>BlackJack</h1>

    <div class="blackjack-container">

        <div class="game-settings">
            <input type="checkbox" id="show-card-number" />Show number of cards left in deck
            <br />
            <input type="checkbox" id="card-counting" />Card counting

        </div>

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

        </div>
        <div class="game-info left">
            <h4>Game Info: </h4>

            <div class="card-count">
                <p>Number of cards left in deck</p>
                <div id="card-count"></div>
            </div>

            <div>
                <p>Number of decks used</p>
                <div id="deck-count"></div>
            </div>

            <div id="deck-status"></div>

        </div>
        <p id="errors"></p>
    </div>
    <div id="clear"></div>
    <div class="player-actions">
        <h4>Player Actions</h4>
        <div id="player0-actions">
            <label for="bet">Bet</label>
            <input type="text" id="bet" value="100" />
            <button id="hit" disabled>Hit</button>
            <button id="stand" disabled>Stand</button>
            <button id="deal">Deal</button>
        </div>
    </div>
    <div class="game-status">
        <h4>Game Status: </h4>
        <div id="game-status"></div>
    </div>

    
    

    {{ HTML:: script('/resources/bower/jquery/dist/jquery.js') }}
    {{ HTML:: script('/resources/bower/playing-cards-js/src/playingcards.js')}}
    {{ HTML:: script('/resources/js/blackjack/blackjack2.js') }}

@stop
