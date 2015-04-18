
var Game = function (players, dealer, playingCards) {

    // Set all players and deck
    this.deck = playingCards;
    this.deck.create(1, 3).shuffle();

    // contains all elements of a game of blackjack
    this.allPlayers = players.concat(dealer);
    this.playerCursor = 0;

}

Game.prototype = {

    countPlayers: function () {
        return this.allPlayers.length;
    },


    deal: function () {
        var i, j, len;
        for (j = 0; j < 2; j++) {
            for (i = 0, len = this.allPlayers.length; i < len; i++) {
                this.allPlayers[i].cards.push(this.deck.deal()[0]);
            }
        }
    },

    hit: function () {
        this.allPlayers[this.playerCursor].cards.push(this.deck.deal()[0]);
        console.log('hit');
    },

    init: function () {
        // Check bet
        // Deal Cards to players
        console.log("initialize");
        this.setBet();

    },

    reset: function () {
        for (i = 0, len = this.allPlayers.length; i < len; i++) {
            this.allPlayers[i].cards = [];
        }


    },

    setBet: function () {
        var i, len
        var bet = $('#bet').val();
        // Invalid input
        if (!bet || bet <= 0) {
            $('#errors').text("Bet Amount Invalid");
            return false;
        }

        // not enough money
        for (i = 0, len = this.allPlayers.length; i < len; i++) {
            console.log(this.allPlayers[i].money);
            if (bet > this.allPlayers[i].money) {
                $('#errors').text("Not enough money");
                return false;
            }
        }
        // Betting successful
        $('#errors').text("");


    },

    render: function () {
        // Update the board
        // Add cards
        // First, remove all cards on board.
        // Then add cards
        $('#dealer-cards').empty();
        var docFrag = $(document.createDocumentFragment());
        for (var i = 0, len = this.allPlayers[1].cards.length; i < len; i++) {
            docFrag.append($('<p></p>').text(this.allPlayers[1].cards[i].rank + this.allPlayers[1].cards[i].suit));
        }
        $('#dealer-cards').append(docFrag);


    }
}

// TODO: use single object for both player and dealer

var Player = function (element, dealer, money) {
    this.dealer = dealer;
    this.money = money || 5000;
    this.cards = [];
    this.bust = false;
    this.element = element;

}

Player.prototype = {
    cardTotal: function () {

        // if total is alrger than 21 check for aces in the hand.
        // If aces are not found, do nothing.
        // Subtract 10 for each aces iteratively and 
        if (total > 21 ) {
            var aCount = cardValue.filter(function(el) {
                return el === "A";
            });
            for (var i = 0, len = aCount.length; i < len; i++) {
                total -= 10;
                if (total <= 21) {
                    return total;
                }
            }
        }
        return total;

    }

};




var game = new Game([new Player], new Player(true), new PlayingCards);

// start game by clicking on deal button

$("#deal").on('click', function() {
    // Check bet amount
    game.init();
    game.reset();
    game.deal();
    game.render();

});

$('#hit').on('click', function () {
    if (game.state === 0) {
        return;
    }
    game.hit();
    game.check();
    game.render();
});

$('#stand').on('click', function() {
    if (game.state === 0) {
        return;
    }
    game.playerCursor = 1;
    game.hit();

    game.render(true);


})
