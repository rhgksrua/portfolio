
var Game = function (players, dealer, playingCards) {
    // Set all players and deck
    this.deck = playingCards;
    this.deck.create(1, 3).shuffle();

    // contains all elements of a game of blackjack
    this.dealer = dealer;
    this.players = players
    this.playerCursor = 0;

    // state:
    // 0: cards dealt -> check for blackjack
    // 1: player turn -> hit/stand -> bust or goto dealer turn
    // 2: dealer turn -> hit until 17 or bust -> goto check winner
    // 3: check winner -> show everything -> check winner


    this.state = 0;
    this.replenished = false;
    this.bet = 0;
    this.decksUsed = 1;
    this.settings = {
        cardNumber: false,
        cardCounting: false
    };

    this.render();
}

Game.prototype = {

    countPlayers: function () {
        return this.allPlayers.length;
    },

    deckEmpty: function() {
        if (this.deck.cards.length < 1) {
            console.log("deck is empty add new deck");
            this.deck.create(1, 3).shuffle();
            this.replenished = true;
            this.decksUsed += 1;
        }
    },

    deal: function () {
        this.deckEmpty();
        var i, j, len;
        for (j = 0; j < 2; j++) {
            for (i = 0, len = this.players.length; i < len; i++) {
                this.players[i].cards.push(this.deck.deal()[0]);
            }
            this.dealer.cards.push(this.deck.deal()[0]);
        }

        // Show Hit stand button
        $('#hit').prop('disabled', false);
        $('#stand').prop('disabled', false);
        console.log("buttons enabled");
        this.state = 1;
    },

    hit: function () {
        this.deckEmpty();
        if (this.state === 1) {

            // Prevent busted player from hitting
            if (this.players[this.playerCursor].bust) {
                console.log('player bust, player cannot hit');
                this.state = 2;
                return;

            }
            var newCard = this.deck.deal()[0];
            //console.log(newCard);
            this.players[this.playerCursor].cards.push(newCard);
            console.log('player hit');

        } else if (this.state === 2) {
            if (this.dealerbust) {
                console.log('dealer bust, dealer cannot hit');
                this.state = 3;
                return;

            }
            var newCard = this.deck.deal()[0];
            //console.log(newCard);
            this.dealer.cards.push(newCard);
            console.log('dealer hit');

        }
    },

    dealerTurn: function() {
        this.state = 2;
        while (this.dealer.cardTotal() < 17) {
            this.hit();
        } 

        if (this.dealer.cardTotal() > 21) {
            this.dealer.bust = true;
            // game ended
        }



        this.state = 3;
    },

    checkPlayerBlackjack: function() {
        var i, len;
        console.log("checking bj");
        for (i = 0, len = this.players.length; i < len; i++) {
            if (this.players[i].cardTotal() === 21) {
                console.log("found black jack in player");
                this.players[i].blackjack = true;
                //this.state = 3;
                //this.nextAction();
                this.playerTurnEnd();
                this.checkWinner();
            }

        }

    },

    init: function () {

        // Check settings
        this.settings.cardNumber = $('#show-card-number').prop('checked');
        console.log('checked: ', this.settings.cardNumber);



        // Check bet
        // Deal Cards to players
        console.log("initialize: start blackjack");
        // Check bet amount
        if (!this.setBet()) {
            return false;
        }
        return true;
    },

    setBet: function () {
        var i, len
        var bet = +$('#bet').val();

        // Invalid input
        // not entered, negative, -> error
        if (!bet || bet <= 0) {
            $('#errors').text("Bet Amount Invalid");
            return false;
        }

        // bet larger than dealer or player -> error
        for (i = 0, len = this.players.length; i < len; i++) {
            if (bet > this.players[i].money) {
                $('#errors').text("Not enough money");
                return false;
            }
        }
        // Betting successful
        $('#errors').text("");
        // Set bet amount in game
        this.bet = bet;
        // Set bet amount in player
        this.players.forEach(function(el) {
            console.log("setting player bet", bet);

            el.bet = bet;
        });
        return true;

    },

    resetHand: function () {
        // remove cards from player and dealer

        // Clear player
        this.players.forEach(function(el) {
            el.cards = [];
            el.bust = false;
            el.blackjack = false;
        });

        // Clear dealer
        this.dealer.cards = [];
        this.dealer.blackjack = false;
        this.dealer.bust = false;

        // Clear screen status
        $('#dealer-status').text("");            
        $('#player0-status').text("");
    },


    checkPlayerTurnEnd: function () {
        // Check player end
        // If player stands go to dealer's turn
        // If player busts, show dealer hand and get winner
        if (this.allPlayers[0].bust === true) {
        }

    },

    checkPlayerBust: function () {
        if (this.players[0].cardTotal() > 21) {
            this.players[0].bust = true;
            this.playerTurnEnd();
            this.state = 3;
            this.checkWinner();
        } else if (this.players[0].cardTotal() === 21) {
            this.state = 3;
            this.playerTurnEnd();
            this.checkWinner();
        }
    },

    playerTurnEnd: function () {
        // Disables player action.
        $('#hit').prop('disabled', true);
        $('#stand').prop('disabled', true);

    },

    render: function () {

        var cardText = "";

        // Clear screen
        $('#player0-status').text("");
        $('#dealer-status').text("");
        $('#dealer-cards').text("");
        $('#player0-cards').text("");

        if (this.settings.cardNumber) {
            $('.card-count').addClass("show");
        } else {
            $('.card-count').removeClass("show");
        }

        
        // PLAYER CARDS
        for (var i = 0, len = this.players[0].cards.length; i < len; i++) {
            cardText += this.players[0].cards[i].rank + this.players[0].cards[i].suit + " ";
        }
        $('#player0-cards').text(cardText);

        // Player blackjack
        // End player turn and move to dealer turn
        if (this.players[0].blackjack) {
            $('#player0-status').text("BLACKJACK!");
        }

        // show player total card value
        var playerTotal = this.players[0].cardTotal();
        if (playerTotal > 0) {
            $('#player0-total').text(this.players[0].cardTotal());
        }

        // DEALER CARDS
        cardText = "";
        for (var i = 0, len = this.dealer.cards.length; i < len; i++) {

            if (this.state < 2 && i === 0) {
                //console.log(this.state);
                cardText += '?? ';
            }  else {
                cardText += this.dealer.cards[i].rank + this.dealer.cards[i].suit + " ";
            }
        }
        console.log(cardText);
        $('#dealer-cards').text(cardText);

        // Only show dealer total when player stands or busts
        if (this.state >= 2) {
            $('#dealer-total').text(this.dealer.cardTotal());
        } else {
            $('#dealer-total').text("");
        }

        // Checking player bust and change game state
        if (this.players[0].bust) {
            $('#player0-status').text("BUST");
        }
        if (this.dealer.bust) {
            $('#dealer-status').text("BUST");
        }

        // when deck is empty this.replenished is set to true in deckEmpty
        // check if new deck has been created and add it to the DOM.
        if (this.replenished) {
            $('#deck-status').text('New deck created');
            this.replenished = false;
        } else {
            $('#deck-status').text('');
        }

        $('#dealer-money').text(this.dealer.money);
        $('#player0-money').text(this.players[0].money);

        // Show number of cards left in deck
        $('#card-count').text(this.deck.count());
        $('#deck-count').text(this.decksUsed);


    },

    nextAction: function() {

        switch (this.state) {
            case 1:
                // Player turn
                break;
            case 2:
                this.dealerTurn();
                this.checkWinner();
                break;
            case 3:
                // game has ended
                break;
            default:
                // Do nothing
        }

    },

    checkWinner: function(state) {

        // Enable deal button and bet input
        $('#deal').prop('disabled', false);
        $('#bet').prop('disabled', false);

        if (this.players[0].blackjack) {
            console.log('player blackjack!');
            this.players[0].money += Math.floor((+this.bet) * 1.5);
            this.dealer.money -= Math.floor((+this.bet) * 1.5);
            $('#game-status').text("Player BLACKJACK!!!!  win " + Math.floor((+this.bet) * 1.5));
            return;
        }
        
        // Check for bust
        if (this.players[0].bust) {
            // Player Bust
            console.log("player busts, player loses");
            // Give Bets
            this.players[0].money -= +this.bet;
            this.dealer.money += +this.bet;
            $('#game-status').text("Player loses" + this.bet);
            return;
        } else if (this.dealer.bust) {
            // Dealer bust
            console.log("dealer busts, player wins");
            this.players[0].money += +this.bet;
            this.dealer.money -= +this.bet;
            $('#game-status').text("Player wins" + this.bet);
            return;
        }

        // Compare hand values
        if (this.players[0].cardTotal() < this.dealer.cardTotal()) {
            console.log('player loses');
            this.players[0].money -= +this.bet;
            this.dealer.money += +this.bet;
            $('#game-status').text("Player loses" + this.bet);
        } else if (this.players[0].cardTotal() === this.dealer.cardTotal()) {
            $('#game-status').text("No Winners");
            console.log('PUSH');
        } else {
            console.log('player wins');
            this.dealer.money -= +this.bet;
            this.players[0].money += +this.bet;
            $('#game-status').text("Player wins" + this.bet);
        }

        // A round of blackjack has ended
    }
}

// TODO: use single object for both player and dealer

var Player = function (element, dealer, money) {
    this.dealer = dealer;
    this.money = money || 5000;
    this.cards = [];
    this.bust = false;
    this.element = element;
    this.bet = 0;
    this.blackjack = false;

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

        // Set bust status for player or dealer
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
// 2: dealer turn. Check winner
// 3: game ended.

// Start Blackjack
var game = new Game([new Player], new Player(true), new PlayingCards);

//$('#dealer-money').text(game.dealer.money);
//$('#player0-money').text(game.players[0].money);


// At state 0, These steps must happen
$("#deal").on('click', function() {
    if (!game.init()) {
        // Check bet amount
        return;
    } else {
        $('#game-status').text("");
        $('#bet').prop('disabled', true);
        // Valid bet
        // 
        // Remove previous hand
        game.resetHand();
        // Deal cards
        game.deal();
        // Check if player has blackjack
        game.checkPlayerBlackjack();
        // render on screen
        game.render();
        // What to do next
        game.nextAction();
    }
});

$('#hit').on('click', function () {
    // prevent hit/stand when cards are not dealt yet
    if (game.state === 0) {
        return;
    }
    game.hit();
    game.checkPlayerBust();
    game.render();
    game.nextAction();
});

$('#stand').on('click', function() {
    // prevent hit / stand when cards are not dealt yet
    if (game.state === 0) {
        return;
    }

    // End player turn.  Goto dealer Turn
    game.playerTurnEnd();

    // state = 2 means start of dealer turn
    game.state = 2;
    game.nextAction();
    //game.dealerTurn();

    game.render();
})
