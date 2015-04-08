//console.log($(window).height());

function Game(ball, walls) {
    this.drawing = $('#drawing')[0];

    //console.log(this.drawing.height);

    this.context = this.drawing.getContext('2d');
    this.screen = {
        x: this.drawing.width,
        y: this.drawing.height
    }

    this.time = 0;

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




    var currentBallHeight = this.ball.current;
    var currentHeight = $(window).height();
    var sizeY = this.screen.y;
    var time = 0.1;
    var startPos;
    var tempCurrent = this.ball.current;

    // Apply physics when border don't touch and speed less than fastest.

    console.log(this.ball.speed, this.ball.fastest);

    if (currentHeight < 500 && currentHeight >= currentBallHeight || this.ball.fastest > this.ball.speed) {
        startPos = !startPos ? tempCurrent : starPos;

        //this.ball.fastest = 0;
        //console.log("inside");
        startPos -= this.ball.fastest * 0.5 * this.time - 0.5 * this.ball.accel * this.time * this.time;


        this.time += 1 / 50 ;

        this.ball.current = startPos;


    } else {
        this.time = 0;
    }
    //console.log(startPos);


    // Apply physics when border lowers
    /*
    if (currentHeight > currentBallHeight && currentBallHeight < 500) {
        startPos = !startPos ? tempCurrent : starPos;

        //console.log(this.ball.current);
        startPos -= this.ball.fastest / 10 * this.time - this.ball.accel * this.time * this.time;

        this.time += 1 / 60 ;

        this.ball.current = startPos;

        //console.log(startPos);

    } else {
        this.time = 0;
    }
    */

    //console.log(currentHeight, currentBallHeight);

    // ball not touching the border and ball has speed

    // border is touching the ball
    if (currentHeight < this.ball.current) {
        this.ball.current = currentHeight;


    }

    if (this.ball.current > sizeY - this.ball.size) {
        this.ball.current = sizeY - this.ball.size;
    }







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
    this.accel = 9.8;

}

new Game(new Ball());

//loop();