
var Game = function (players, dealer, playingCards) {
    // Set all players and deck
    this.deck = playingCards;
    this.deck.create(1, 3).shuffle();

    // contains all elements of a game of blackjack
    this.dealer = dealer;
    this.players = players
    this.playerCursor = 0;
    this.errors = [];
    this.playerCount = 0;

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

    //this.render();
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

        // NEED to check bet amount here.

        if (!this.setBet()) {
            return false;
        }


        this.deckEmpty();
        var i, j, len;
        for (i = 0; i < 2 ; i++) {
            for (j = 0, len = this.players.length; j < len; j++) {
                this.players[j].cards.push(this.deck.deal()[0]);
            }
            this.dealer.cards.push(this.deck.deal()[0]);
        }

        // Show Hit stand button
        $('#hit').prop('disabled', false);
        $('#stand').prop('disabled', false);
        this.state = 1;
        return true;
    },

    /**
     * Allows players and dealer to hit.
     *
     * @method hit
     * @return {void}
     */
    hit: function () {
        var newCard;
        this.deckEmpty();
        // Player turn.
        if (this.state === 1) {
            // Prevent busted player from hitting
            if (this.players[this.playerCursor].blackjack) {
                this.playerTurnEnd();
                return;
            }
            if (this.players[this.playerCursor].bust) {
                //this.playerCursor++;
                this.playerTurnEnd();
                if (this.playerCursor >= this.playerCount) {
                    this.state = 2;
                }
                return;

            }
            // If not bust, hit.
            newCard = this.deck.deal()[0];
            this.players[this.playerCursor].cards.push(newCard);

        // Dealer turn. (Dealer is hitting)
        } else if (this.state === 2) {
            if (this.dealerbust) {
                // End of game.
                this.state = 3;
                return;
            }
            newCard = this.deck.deal()[0];
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

        this.dealer.bust = true;

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
                //this.checkWinner();
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

        // Check settings
        if (!this.setSettings()) {
            return false;
        }

        // Check bet
        // Deal Cards to players
        console.log("initialize: start blackjack");
        // Check bet amount
        return true;
    },

    /**
     * Set setting before game starts
     * 
     */
    setSettings: function () {

        var numberOfPlayers = +$('#player-count').val();
        console.log('p count', numberOfPlayers);
        console.log(!isNaN(numberOfPlayers));
        if (numberOfPlayers < 1 || isNaN(numberOfPlayers)) {
            this.errors.push('Invalid player count');
            console.log('setting error');
            return false;
        }

        this.playerCount = numberOfPlayers;
        this.addPlayerHTML(numberOfPlayers);
        this.addPlayer(numberOfPlayers);

        return true;
    },

    addPlayer: function (num) {
        var i;
        for (i = 0; i < num; i++) {
            this.players.push(new Player);
        }
    },

    addPlayerHTML: function (num) {

        var playerHTML = "";
        var actionHTML = "";
        var actionButtons = "";
        var parentPlayer = $('.players-container');
        var parentAction = $('.player-action-container');
        /*
        if (parent.length < num) {
            parent.empty();
        }
        */
        parentPlayer.empty();
        parentAction.empty();

        for (i = 0; i < num; i++) {

            playerHTML += '<div class="player player' + i + ' left">' +
                '<h2>Player ' + i + '</h2>' +
                '<p>Cards: </p>' +
                '<div id="player' + i + '-cards"></div>' +

                '<p>Cards Total: </p>' +
                '<div id="player' + i + '-total"></div>' +

                '<p>Player Status</p>' +
                '<div id="player' + i + '-status"></div>' +

                '<p>Player Money</p>' +
                '<div id="player' + i + '-money"></div>' +

                '</div>';
            actionHTML += '<div class="player-actions">' +
                '<h4>Player' + i + ' Actions</h4>' +
                '<div id="player' + i + '-actions">' +
                '<label for="bet' + i + '">Bet</label>' +
                '<input type="text" id="bet' + i + '" value="100" />' +
                '<br />' +
                '<p id=errors' + i + '"></p>';

            

            parentPlayer.append(playerHTML);
            parentAction.append(actionHTML);
            parentAction.append()
            playerHTML = "";
            actionHTML = "";

        }
        actionButtons += '<button id="hit" disabled>Hit</button>' +
                '<button id="stand" disabled>Stand</button>' +
                '</div>' +
                '</div>';
        parentAction.append(actionButtons);
        addHitEvent(this);
        addStandEvent(this);
    },

    /**
     * [setBet description]
     * @return {Boolean} Returns true if bet is valid.
     */
    setBet: function () {

        // NOTE!!!!!!!!
        // Need to set be to each players in a loop.


        var i, len, bet;
        var err = false;
        

        for (i = 0; i < this.playerCount; i++) {
            bet = +$('#bet' + i).val();
            // Invalid input
            // not entered, negative.
            if (!bet || bet <= 0) {
                $('#errors' + i).text("Bet Amount Invalid");
                err = true;
            } else if (bet > this.players[i].money) {
            // bet larger than dealer or player -> error
                $('#errors' + i).text("Not enough money");
                err = true;
            } else {
                // Set player bet.
                this.players[i].bet = bet;
            }
        }

        if (err) {
            return false;
        }


        // Betting successful
        //$('#errors').text("");
        // Set bet amount in game
        // Set bet amount in player
        return true;

    },

    /**
     * Resets all players hand.
     * @return {void}
     */
    resetHand: function () {
        // remove cards from player and dealer

        this.playerCursor = 0;

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
        for (i = 0; i < this.playerCount; i++) {
            $('#player' + i + '-status').text("");
        }
        //$('#player0-status').text("");
    },

    checkPlayerBust: function () {
        if (this.players[this.playerCursor].cardTotal() > 21) {
            this.players[this.playerCursor].bust = true;
            this.playerTurnEnd();

        } else if (this.players[this.playerCursor].cardTotal() === 21) {

            this.playerTurnEnd();
        }
    },

    playerTurnEnd: function () {
        // Disables player action.
        this.playerCursor++;
        if (game.state > 1) {
            //$('#hit').prop('disabled', true);
            //$('#stand').prop('disabled', true);
        }

        // NOTE: add visual cue to show the turn moved to next player
        console.log('turn', this.playerCursor);


    },

    render: function () {
        var playerTotal, i, j, id;

        if (this.errors.length > 0) {
            console.log(this.errors);
            return;
        }

        $('.player').removeClass('turn-cursor');

        // Hightlight current state:
        // Hightlights player box or dealer box
        if (this.state <= 1) {
            $('.player' + this.playerCursor).addClass('turn-cursor');
            $('.dealer').removeClass('turn-cursor');
        } else {
            $('.player').removeClass('turn-cursor');
            $('.dealer').addClass('turn-cursor');
        }

        var cardText = "";

        // Clear screen
        //$('#player0-status').text("");
        $('#dealer-status').text("");
        $('#dealer-cards').text("");
        $('#player0-cards').text("");

        if (this.settings.cardNumber) {
            $('.card-count').addClass("show");
        } else {
            $('.card-count').removeClass("show");
        }

        // PLAYER INFO
        for (j = 0; j < this.playerCount; j++) {
            id = '#player' + j;
            cardsId = id + '-cards';
            totalId = id + '-total';
            statusId = id + '-status';
            moneyId = id + '-money';

            for (i = 0, len = this.players[j].cards.length; i < len; i++) {
                console.log('adding card to player', i);
                cardText += this.players[j].cards[i].rank + this.players[j].cards[i].suit + " ";
            }
            $(cardsId).text(cardText);
            cardText = "";

            // Check each player for blackjack
            if (this.players[j].blackjack) {
                $(statusId).text("BLACKJACK!");
            }

            // Show total
            playerTotal = this.players[j].cardTotal();
            if (playerTotal > 0) {
                $(totalId).text(playerTotal);
            }

            // Show Bust
            if (this.players[j].bust) {
                $(statusId).text("BUST");
            }

            // Show players money
            $(moneyId).text(this.players[j].money);
        }

        // show player total card value

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

        // Show number of cards left in deck
        $('#card-count').text(this.deck.count());
        $('#deck-count').text(this.decksUsed);


    },

    nextAction: function() {

        switch (this.state) {
            case 1:
                // Player turn

                if (this.playerCursor >= this.playerCount) {
                    this.dealerTurn();
                    this.checkWinner();
                }
                
                // SKip player if blackjack
                if (this.players[this.playerCursor] && this.players[this.playerCursor].blackjack) {
                    this.playerTurnEnd();
                }
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
        var i, len;
        // TODO: separate output of winners

        // Enable deal button and bet input
        $('#deal').prop('disabled', false);
        $('#bet').prop('disabled', false);


        for (i = 0; i < this.players.length; i++) {

            id = '#player' + i;
            cardsId = id + '-cards';
            totalId = id + '-total';
            statusId = id + '-status';
            moneyId = id + '-money';

            if (this.players[i].blackjack) {
                console.log('player blackjack!');
                this.players[i].money += Math.floor((+this.players[i].bet) * 1.5);
                this.dealer.money -= Math.floor((+this.players[i].bet) * 1.5);
                $(statusId).text("BLACKJACK! win " + Math.floor((+this.players[i].bet) * 1.5));
                $('.player').addClass('winner');
                return;
            }
            
            // Check for bust
            if (this.players[i].bust) {
                // Player Bust
                console.log("player busts, player loses");
                // Give Bets
                this.players[i].money -= +this.players[i].bet;
                this.dealer.money += +this.players[i].bet;
                $(statusId).text("Player loses" + this.players[i].bet);
                return;
            } else if (this.dealer.bust) {
                // Dealer bust
                console.log("dealer busts, player wins");
                this.players[i].money += +this.players[i].bet;
                this.dealer.money -= +this.players[i].bet;
                $(statusId).text("Player wins " + this.players[i].bet);
                return;
            }

            // Compare hand values
            if (this.players[i].cardTotal() < this.dealer.cardTotal()) {
                console.log('player loses');
                this.players[i].money -= +this.players[i].bet;
                this.dealer.money += +this.players[i].bet;
                $(statusId).text("Player loses " + this.players[i].bet);
            } else if (this.players[i].cardTotal() === this.dealer.cardTotal()) {
                $(statusId).text("PUSH");
                console.log('PUSH');
            } else {
                console.log('player wins');
                this.dealer.money -= +this.players[i].bet;
                this.players[i].money += +this.players[i].bet;
                $(statusId).text("Player wins " + this.players[i].bet);
            }
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
var game = new Game([], new Player(true), new PlayingCards);

//$('#dealer-money').text(game.dealer.money);
//$('#player0-money').text(game.players[0].money);

// Start button
$('#start').on('click', function() {
    if (!game.init()) {
        return;
    } else {

    }
});

// At state 0, These steps must happen
$("#deal").on('click', function() {
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

    if (!game.deal()) {
        return false;
    }
    // Check if player has blackjack
    game.checkPlayerBlackjack();
    // render on screen
    // What to do next
    game.nextAction();
    game.render();
});

function addHitEvent(game) {
    $('#hit').on('click', function () {
        // prevent hit/stand when cards are not dealt yet
        console.log("hit clicked");
        if (game.state === 0) {
            return;
        }
        game.hit();
        game.checkPlayerBust();
        game.render();
        game.nextAction();
    });
}

function addStandEvent(game) {
    $('#stand').on('click', function() {
        // prevent hit / stand when cards are not dealt yet
        if (game.state === 0) {
            return;
        }

        // End player turn.  Goto dealer Turn
        game.playerTurnEnd();

        // state = 2 means start of dealer turn
        game.nextAction();
        //game.dealerTurn();

        game.render();
    })
}
