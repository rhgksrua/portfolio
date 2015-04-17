
var Game = function (players, dealer, playingCards) {

    // Set all players and deck
    this.deck = playingCards;
    this.deck.create().shuffle();
    // contains all elements of a game of blackjack
    this.allPlayers = players.concat(dealer);
    this.state = 0;

    // Game states 
    // 0: before starting
    // 1: dealt initial cards
    // 2: stopped or busted
    // 3: 
}

Game.prototype = {
    currentState: function () {
        return this.state;
    },

    countPlayers: function () {
        return this.allPlayers.length;
    },

    restart: function () {
        var i, len;
        for (i = 0, len = this.allPlayers.length; i < len; i++) {
            this.allPlayers[i].cards = [];
            this.allPlayers[i].element.empty();
        }


    },

    deal: function () {
        var i, j, len;
        this.state = 1;
        for (j = 0; j < 2; j++) {
            for (i = 0, len = this.allPlayers.length; i < len; i++) {
                this.allPlayers[i].cards.push(this.deck.deal()[0]);
            }
        }
        //console.log(this.allPlayers);
    },

    init: function () {
        this.state = 1;
        var i, j, ilen, jlen;
        var that = this;
        for (i = 0, iLen = this.allPlayers.length; i < iLen; i++) {
            (function (i, that) {
                for (j = 0, jLen = that.allPlayers[i].cards.length; j < jLen; j++) {
                    that.allPlayers[i].element.append($('<span></span>')
                        .text(that.allPlayers[i].cards[j]));

                }
                if (!that.allPlayers[i].dealer) {
                    that.allPlayers[i].element.append($('<button></button>')
                        .text("HIT"));
                    that.allPlayers[i].element.on('click', function() {
                        console.log("add a sing card to player");
                        console.log(that.allPlayers[i]);
                        that.allPlayers[i].cards.push(that.deck.deal());
                        that.render();

                    });
                    that.allPlayers[i].element.append($('<button></button>')
                        .text("STAND"));
                }
            })(i, that);
        }
        

    },

    render: function () {
        var that = this;
        this.allPlayers.forEach(function(element) {
            element.element.empty();
            element.cards.forEach(function(card) {
                element.element.append($('<span></span>')
                    .text(card));
            });

            if (!element.dealer) {
                element.element.append($('<button></button>').text("HIT").on('click', function () {
                    element.cards.push(that.deck.deal()[0]);
                    console.log("hit");
                    that.render();
                }));
            }

        });


    }
}

var Player = function (name) {
    this.dealer = false;
    this.value = 5000;
    this.cards = [];
    this.bust = false;
    this.element = $('#player-cards');

}

var Dealer = function () {
    this.dealer = true;
    this.name = name || "John The Dealer";
    this.value = 5000;
    this.cards = [];
    this.bust = false;
    this.element = $('#dealer-cards');
}

var game = new Game([new Player], new Dealer, new PlayingCards);

// start game by clicking on deal button

$(".deal").on('click', function() {
    if (game.state !== 0) {
        game.restart();
    }
    $(this).text("Restart");
    game.deal();
    game.render();


});
