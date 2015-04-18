
var Game = function (players, dealer, playingCards) {

    // Set all players and deck
    this.deck = playingCards;
    this.deck.create(1, 3).shuffle();

    // contains all elements of a game of blackjack
    this.allPlayers = players.concat(dealer);
    this.playerCursor = 0;
    this.state = 0;
    this.replenished = false;
    this.bet = 0;

}

Game.prototype = {

    countPlayers: function () {
        return this.allPlayers.length;
    },

    deckEmpty: function() {
        if (this.deck.cards.length < 1) {
            console.log("deck is empty add new deck");
            this.deck.create(1, 3);
            this.replenished = true;
        }
    },

    deal: function () {
        this.deckEmpty();
        var i, j, len;
        for (j = 0; j < 2; j++) {
            for (i = 0, len = this.allPlayers.length; i < len; i++) {
                this.allPlayers[i].cards.push(this.deck.deal()[0]);
            }
        }
    },

    hit: function () {
        this.deckEmpty();

        // Prevent busted player from hitting
        if (this.allPlayers[this.playerCursor].bust) {
            console.log('player bust, player cannot hit');
            this.state = 2;
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

        this.state = 3;




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
        $('#hit').prop('disabled', false);
        $('#stand').prop('disabled', false);


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
        this.bet = bet;
        return true;

    },

    checkPlayerTurnEnd: function () {
        // Check player end
        // If player stands go to dealer's turn
        // If player busts, show dealer hand and get winner
        if (this.allPlayers[0].bust === true) {

        }

    },

    render: function () {
        // Update the board
        // Add cards
        // First, remove all cards on board.
        // Then add cards

        // Clear screen
        $('#player0-status').text("");
        $('#dealer-status').text("");
        $('#dealer-cards').empty();
        $('#player0-cards').empty();
        

        // DEALER CARDS
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
        var docFrag = $(document.createDocumentFragment());
        for (var i = 0, len = this.allPlayers[0].cards.length; i < len; i++) {
            docFrag.append($('<p></p>').text(this.allPlayers[0].cards[i].rank + this.allPlayers[0].cards[i].suit));
        }
        $('#player0-cards').append(docFrag);

        // show player total card value
        $('#player0-total').text(this.allPlayers[0].cardTotal());

        // Only show dealer total when player stands or busts
        // TODO: fix this
        
        if (game.state >= 2) {
            $('#dealer-total').text(this.allPlayers[1].cardTotal());
        } else {
            $('#dealer-total').text("");
        }
        

        // Checking player bust and change game state
        if (this.allPlayers[0].bust) {
            $('#player0-status').text("BUST");
            this.state = 3;
            this.checkWinner();
        }
        if (this.allPlayers[1].bust) {
            $('#dealer-status').text("BUST");
            this.checkWinner();
        }

        // when deck is empty this.replenished is set to true in deckEmpty
        // check if new deck has been created and add it to the DOM.
        if (this.replenished) {
            $('#game-status').text('New deck created');
            this.replenished = false;
        } else {
            $('#game-status').text('');

        }

        $('#dealer-total').text(this.allPlayers[1].money);


    },

    checkWinner: function() {
        $('#deal').prop('disabled', false);
        $('#hit').prop('disabled', true);
        $('#stand').prop('disabled', true);
        if (this.allPlayers[0].bust) {
            console.log("player busts, player loses");
            this.allPlayers[0].money -= +this.bet;
            this.allPlayers[1].money += +this.bet;
            return;
        } else if (this.allPlayers[1].bust) {
            console.log("dealer busts, player wins");
            this.allPlayers[1].money -= +this.bet;
            this.allPlayers[0].money += +this.bet;
            return;
        }

        if (this.allPlayers[0].cardTotal() < this.allPlayers[1].cardTotal()) {
            console.log('player loses');
            this.allPlayers[0].money -= +this.bet;
            this.allPlayers[1].money += +this.bet;
        } else if (this.allPlayers[0].cardTotal() === this.allPlayers[1].cardTotal()) {
            console.log('PUSH');
        } else {
            console.log('player wins');
            this.allPlayers[1].money -= +this.bet;
            this.allPlayers[0].money += +this.bet;
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

        // Get total value for a player
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


// game.state
// 0: cards not dealt yet
// 1: cards dealt. player turn
// 2: dealer turn
// 3: game ended. Get winner



var game = new Game([new Player], new Player(true), new PlayingCards);

// start game by clicking on deal button

$('#dealer-total').text(game.allPlayers[1].money);
$('#player0-total').text(game.allPlayers[0].money);
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
        $('#hit').prop('disabled', false);
        $('#stand').prop('disabled', false);
        $('#deal').prop('disabled', true);

    }

});

$('#hit').on('click', function () {
    // prevent hit / stand when cards are not dealt yet
    if (game.state === 0) {
        return;
    }

    game.hit();
    game.render();
});

$('#stand').on('click', function() {
    // prevent hit / stand when cards are not dealt yet
    if (game.state === 0) {
        return;
    }

    // Mover cursor to dealer
    game.playerCursor = 1;
    game.state = 2;
    game.dealerTurn();

    game.render(true);

    game.checkWinner();


})
