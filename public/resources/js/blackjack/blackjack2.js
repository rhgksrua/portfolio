
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

    /**
     * Returns number of players.
     * @method  countPlayers
     * @return {Number} Number of players in current game.
     */
    countPlayers: function () {
        return this.allPlayers.length;
    },

    /**
     * Adds another deck is current deck is empty
     * 
     * @method deckEmpty
     * @return {void}
     */
    deckEmpty: function() {
        if (this.deck.cards.length < 1) {
            this.deck.create(1, 3).shuffle();
            this.replenished = true;
            this.decksUsed += 1;
        }
    },

    /**
     * Deals a single card to each player until all players have two cards.
     *
     * @method  deal
     * @return {void} 
     */
    deal: function () {
        // Adds new deck if empty
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
        this.state = 1;
    },

    /**
     * Allows players and dealer to hit.
     *
     * @method hit
     * @return {void}
     */
    hit: function () {
        this.deckEmpty();
        // Player turn.
        if (this.state === 1) {
            // Prevent busted player from hitting
            if (this.players[this.playerCursor].bust) {
                this.state = 2;
                return;

            }
            // If not bust, hit.
            var newCard = this.deck.deal()[0];
            this.players[this.playerCursor].cards.push(newCard);

        } else if (this.state === 2) {
            // Dealer turn.
            if (this.dealerbust) {
                // End of game.
                this.state = 3;
                return;

            }
            var newCard = this.deck.deal()[0];
            //console.log(newCard);
            this.dealer.cards.push(newCard);
            

        }
    },

    /**
     * Dealer hits until 17 or greater.  Also, check for bust.
     *
     * @return {void}
     */
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

    /**
     * Check if player has blackjack.  If blackjack, move to next player.
     * @return
     */
    checkPlayerBlackjack: function() {
        var i, len;
        for (i = 0, len = this.players.length; i < len; i++) {
            if (this.players[i].cardTotal() === 21) {
                this.players[i].blackjack = true;
                this.playerTurnEnd();
                this.checkWinner();
            }
        }
    },

    /**
     * Check for valid bet from players
     * @return {[type]} [description]
     */
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

    /**
     * [setBet description]
     * @return {Boolean} Returns true if bet is valid.
     */
    setBet: function () {
        var i, len
        var bet = +$('#bet').val();

        // Invalid input
        // not entered, negative.
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
            el.bet = bet;
        });
        return true;

    },

    /**
     * Resets all players hand.
     * @return {void}
     */
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

        // Hightlight current state:
        // Hightlights player box or dealer box
        if (this.state <= 1) {
            $('.player').addClass('turn-cursor');
            $('.dealer').removeClass('turn-cursor');
        } else {
            $('.player').removeClass('turn-cursor');
            $('.dealer').addClass('turn-cursor');
        }

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
        // TODO: separate output of winners

        // Enable deal button and bet input
        $('#deal').prop('disabled', false);
        $('#bet').prop('disabled', false);

        if (this.players[0].blackjack) {
            console.log('player blackjack!');
            this.players[0].money += Math.floor((+this.bet) * 1.5);
            this.dealer.money -= Math.floor((+this.bet) * 1.5);
            $('#game-status').text("Player BLACKJACK!!!!  win " + Math.floor((+this.bet) * 1.5));
            $('.player').addClass('winner');
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
            $('.dealer').addClass('winner');
            return;
        } else if (this.dealer.bust) {
            // Dealer bust
            console.log("dealer busts, player wins");
            this.players[0].money += +this.bet;
            this.dealer.money -= +this.bet;
            $('#game-status').text("Player wins " + this.bet);
            $('.player').addClass('winner');

            return;
        }

        // Compare hand values
        if (this.players[0].cardTotal() < this.dealer.cardTotal()) {
            console.log('player loses');
            this.players[0].money -= +this.bet;
            this.dealer.money += +this.bet;
            $('#game-status').text("Player loses " + this.bet);
            $('.dealer').addClass('winner');
        } else if (this.players[0].cardTotal() === this.dealer.cardTotal()) {
            $('#game-status').text("No Winner");
            $('.player').addClass('push');
            $('.dealer').addClass('push');
            console.log('PUSH');
        } else {
            console.log('player wins');
            this.dealer.money -= +this.bet;
            this.players[0].money += +this.bet;
            $('#game-status').text("Player wins " + this.bet);
            $('.player').addClass('winner');
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
        $('.player').removeClass('winner');
        $('.dealer').removeClass('winner');
        $('.player').removeClass('push');
        $('.dealer').removeClass('push');
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
