console.log($(window).height());

var loop = function() {
    console.log($(window).height());
    requestAnimationFrame(loop);

}


//loop();