//console.log($(window).height());

function Game(ball, walls) {
    this.drawing = $('#drawing')[0];

    //console.log(this.drawing.height);

    this.context = this.drawing.getContext('2d');
    this.screen = {
        x: this.drawing.width,
        y: this.drawing.height
    }

    this.ball = ball;

    //console.log(ball.location.x);




    var that = this;

    function loop() {
        that.update();
        //console.log(that.ball.prevLocation.x, that.ball.prevLocation.y);
        //console.log(that.ball.location.x, that.ball.location.y, that.ball.speed, that.ball.fastest);
        requestAnimationFrame(loop);
    }
    loop();


}

Game.prototype.update = function() {


    this.ball.prevLocation = {
        x: this.ball.location.x,
        y: this.ball.location.y

    };
    this.ball.location = {
        x: this.ball.location.x,
        y: -1 * $(window).height() / 2
    };
    this.ball.speed = this.ball.location.y - this.ball.prevLocation.y;
    if (this.ball.fastest < this.ball.speed) {
        this.ball.fastest = this.ball.speed;
    }



    this.drawBall();

};

Game.prototype.drawBall = function() {
    //var newY = 500 - this.ball.size;


    var currentHeight = $(window).height();
    var currentBallHeight = this.ball.current;
    var sizeY = this.screen.y;

    // ball not touching the border and ball has speed

    // border is touching the ball
    if (currentHeight < this.ball.current) {
        this.ball.current = currentHeight;
    }

    // border is below the ball or moved away from the ball
    if (currentHeight > this.ball.current && this.ball.current > 500) {
        var time = 0.05;
        this.ball.current = this.ball.fastest + time * 4.95 * time * time; 

    }

    console.log(this.ball.current, this.ball.speed);





    this.context.clearRect(0, 0, 500, 800); 
    this.context.beginPath();
    //this.context.arc(this.ball.location.x, this.ball.location.y, 10, 0, 2 * Math.PI, false);
    this.context.arc(100, this.ball.current - this.ball.size, this.ball.size, 0, 2 * Math.PI, false);
    this.context.stroke();

};

Game.prototype.drawWalls = function() {

};

function Ball() {
    this.fastest = 0;
    this.location = {
        x: 100,
        y: -1 * $(window).height() / 2,
        speed: 0
    };

    this.prevLocation = {
        x: 100,
        y: this.location.y,
        speed: 0
    }
    this.current = 500;

    this.speed = 0;
    this.size = 5;

}

new Game(new Ball());

//loop();