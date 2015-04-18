
var Game = function (players, dealer, playingCards) {

    // Set all players and deck
    this.deck = playingCards;
    this.deck.create(1, 3).shuffle();

    // contains all elements of a game of blackjack
    this.allPlayers = players.concat(dealer);
    this.playerCursor = 0;
    this.state = 0;

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
        if (this.allPlayers[this.playerCursor].bust) {
            console.log('player bust, not more hits');
            return;

        }
        var newCard = this.deck.deal()[0];
        //console.log(newCard);
        this.allPlayers[this.playerCursor].cards.push(newCard);
        console.log('hit');
    },

    dealerTurn: function() {
        while (this.allPlayers[1].cardTotal() < 17) {
            console.log('total: ', this.allPlayers[1].cardTotal());
            console.log(this.allPlayers[1].cards);
            this.hit();
        } 

        if (this.allPlayers[1].cardTotal() > 21) {
            this.allPlayers[1].bust = true;
            // game ended
        }
        this.state = 2;




    },

    init: function () {
        // Check bet
        // Deal Cards to players
        console.log("initialize");
        if (!this.setBet()) {
            return false;
        }
        return true;
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
            //console.log(this.allPlayers[i].money);
            if (bet > this.allPlayers[i].money) {
                $('#errors').text("Not enough money");
                return false;
            }
        }
        // Betting successful
        $('#errors').text("");
        return true;

    },

    render: function () {
        // Update the board
        // Add cards
        // First, remove all cards on board.
        // Then add cards

        // Clear screen
        $('#player0-status').text("");
        

        // DEALER CARDS
        $('#dealer-cards').empty();
        var docFrag = $(document.createDocumentFragment());
        for (var i = 0, len = this.allPlayers[1].cards.length; i < len; i++) {
            //console.log(this.allPlayers[1].cards);

            var cardText = this.allPlayers[1].cards[i].rank + this.allPlayers[1].cards[i].suit;

            if (i === 0 && this.state < 2) {
                //console.log(this.state);
                cardText = '??';
            } 
            docFrag.append($('<p></p>').text(cardText));
        }
        $('#dealer-cards').append(docFrag);

        // PLAYER CARDS
        $('#player0-cards').empty();
        var docFrag = $(document.createDocumentFragment());
        for (var i = 0, len = this.allPlayers[0].cards.length; i < len; i++) {
            docFrag.append($('<p></p>').text(this.allPlayers[0].cards[i].rank + this.allPlayers[0].cards[i].suit));
        }
        $('#player0-cards').append(docFrag);

        // player total card value
        $('#player0-total').text(this.allPlayers[0].cardTotal());

        if (game.state >= 2) {
            $('#dealer-total').text(this.allPlayers[1].cardTotal());
        } else {
            $('#dealer-total').text("");
        }

        if (this.allPlayers[0].bust) {
            $('#player0-status').text("BUST");
        }



    },

    checkWinner: function() {
        if (this.allPlayers[0].bust) {
            console.log("player loses");
        } else if (this.allPlayers[1].bust) {
            console.log("player wins");
        }
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


/*
        var total = this.cards.reduce(function(p, c, i, a) {
            console.log(p.value, c.value);
            return p.value + c.value;

        });
*/

        var total = 0;
        for (var i = 0, len = this.cards.length; i < len; i++) {
            total += this.cards[i].value;
        }



        // if total is alrger than 21 check for aces in the hand.
        // If aces are not found, do nothing.
        // Subtract 10 for each aces iteratively and 
        if (total > 21 ) {
            var aCount = this.cards.filter(function(el) {
                return el.rank === "A";
            });
            for (var i = 0, len = aCount.length; i < len; i++) {
                total -= 10;
                if (total <= 21) {
                    return total;
                }
            }
        }

        if (total > 21) {
            this.bust = true;
        } else {
            this.bust = false;
        }

        return total;

    }

};




var game = new Game([new Player], new Player(true), new PlayingCards);

// start game by clicking on deal button

$("#deal").on('click', function() {
    // Check bet amount
    if (!game.init()) {
        return;
    } else {
        game.state = 0;

        game.reset();
        game.deal();
        game.render();
        // cards dealt;
        game.state = 1;
        game.playerCursor = 0;

    }

});

$('#hit').on('click', function () {
    if (game.state === 0) {
        return;
    }
    game.hit();

    game.render();
});

$('#stand').on('click', function() {
    if (game.state === 0) {
        return;
    }
    game.playerCursor = 1;
    game.dealerTurn();

    game.render(true);

    game.checkWinner();


})
