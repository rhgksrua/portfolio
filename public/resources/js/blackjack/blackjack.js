
var Game = function (players, dealer, playingCards) {

    // Set all players and deck
    this.deck = playingCards;
    this.deck.create().shuffle();
    // contains all elements of a game of blackjack
    this.allPlayers = players.concat(dealer);
    this.state = 0;
    this.playerCursor = 0;

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
            this.allPlayers[i].bust = false;
        }
        $('#dealer-total').text("");
        this.deck.create().shuffle();
        this.playerCursor = 0;


    },

    check: function () {
        // check for bust
        this.checkBust();
        


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

    hit: function () {
        if (this.allPlayers[this.playerCursor].bust === true) {
            return;
        }
        this.allPlayers[this.playerCursor].cards.push(this.deck.deal()[0]);
        console.log('hit');
    },

    checkBust: function () {
        if (this.allPlayers[this.playerCursor].cardTotal() > 21) {
            this.allPlayers[this.playerCursor].bust = true;
        }

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
            })(i, that);
        }
        

    },

    render: function (dealer) {

        // render game over if bust
        

        // hide is false after the first card of dealer.
        var hide = true;
        this.allPlayers.forEach(function(element) {
            element.element.empty();




            element.cards.forEach(function(card) {
                if (element.dealer && dealer) {

                    element.element.append($('<span></span>')
                        .text(card));
                } else if (element.dealer && hide) {
                    // First dealer card is hidden
                    element.element.append($('<span></span>')
                        .text("??"));
                    hide = false;

                } else {
                    element.element.append($('<span></span>')
                        .text(card));

                }
            });


            // show total for dealer and player
            if (element.cards.length > 1 && dealer) {
                element.element.next().text("");
                element.element.next().text(element.cardTotal());

            } else if (element.cards.length > 1 && !element.dealer) {
                element.element.next().text("");
                element.element.next().text(element.cardTotal());
            } 

        });

        for (var i = 0, len = this.allPlayers.length; i < len; i++) {
            if (this.allPlayers[i].bust === true) {
                this.allPlayers[i].element.next().next().text("BUST");
            }
        }

    }
}

// TODO: use single object for both player and dealer

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

Player.prototype = {
    cardTotal: function () {
        var cardValue = this.cards.map(function(el) {
            return el.substring(0, el.length - 1);
        });

        var total = cardValue.reduce(function(p, c, index, array) {
            console.log('prev', p);


            // Switch used to convert letters to numbers    
            switch (p) {
                case "A":
                    p = 11;
                    break;
                case "J":
                case "Q":
                case "K":
                    p = 10;
                    break;
                default:
                    p = +p;
            }

            switch (c) {
                case "A":
                    c = 11;
                    break;
                case "J":
                case "Q":
                case "K":
                    c = 10;
                    break;
                default:
                    c = +c;
            }
            return p + c;
        })

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

Dealer.prototype = {
    cardTotal: function () {
        var cardValue = this.cards.map(function(el) {
            return el.substring(0, el.length - 1);
        });

        var total = cardValue.reduce(function(p, c, index, array) {
            console.log('prev', p);


            // Switch used to convert letters to numbers    
            switch (p) {
                case "A":
                    p = 11;
                    break;
                case "J":
                case "Q":
                case "K":
                    p = 10;
                    break;
                default:
                    p = +p;
            }

            switch (c) {
                case "A":
                    c = 11;
                    break;
                case "J":
                case "Q":
                case "K":
                    c = 10;
                    break;
                default:
                    c = +c;
            }
            return p + c;
        })

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
