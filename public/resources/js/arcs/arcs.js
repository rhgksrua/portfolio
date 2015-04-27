var App = function() {
  var numberOfArcs = 8;
  var drawing = document.getElementById('drawing');

  var context = drawing.getContext('2d');
  
  // Set of colors for arcs.  Colors are cycled.
  this.colors = ['#B97CAC', '#ED9EAE', '#ABDD93', '#E0F3A2'];
  // Cursor for colors.
  this.colorCursor = 0;
  
  // Arc center
  var center = {
    x: drawing.width / 2,
    y: drawing.height / 2
  };
  this.center = center;
  
  // Contains all the current arcs.
  this.circles = [];
  
  
  // Initialize this.circles by adding a circle.
  this.circles.push();
  if (this.circles.length < numberOfArcs) {
    for (var i = 0; i < numberOfArcs; i++) {
    addCircle(this, center);
    }
  }
  
  var that = this;
  
  // Main loop to draw circles(arcs)
  var loop = function() {
    that.update(context, drawing, center);
    that.drawCircles(context);
    requestAnimationFrame(loop);
  };
  
  loop();
}

App.prototype.update = function(context, drawing, center) {
  var i,
      len = this.circles.length;
  // ADD addition circles here
  
  
  //
  for(i = 0; i < len; i++) {
    this.circles[i].start += this.circles[i].speed;
    this.circles[i].end += this.circles[i].speed;
  }
  
  
  this.count = this.circles.length;
  
  context.clearRect (0, 0, drawing.width, drawing.height );
  
};

App.prototype.drawCircles = function(context) {
  var i,
      len = this.circles.length;
      
  for (i = 0; i < len; i++) {
    drawCircle(context, this.circles[i]);
    //console.log(this.circles[i]);
  }
};

function createCircle(center, r, start, end, cc, speed, color) {
  return {
    x: center.x,
    y: center.y,
    r: r,
    start: start,
    end: end,
    cc: cc,
    speed: speed,
    color: color || 'red'
  };
}

function removeCircle(app) {
  app.circles.pop();
}

function addCircle(app, center) {
  var count = app.circles.length;
  var start = 2 * Math.PI * Math.random();
  var end = 2 * Math.PI * Math.random();
  
  /// Short arcs less than 30% of a cricle are lengthened
  if (Math.abs(start - end) < 2 * Math.PI * 0.30) {
    start += Math.PI;
  }
  
  var speed =  0.1 * Math.random() - 0.05;
  
  // Speed up if too slow
  if (speed < 0.01 && speed > -0.01) {
    speed = Math.random() * 0.01 + 0.01;
  }
  
  app.circles.push(createCircle(center, count * 10 + 20, start, end, true, speed, app.colors[app.colorCursor % 4]))
  app.colorCursor = (app.colorCursor + 1) % 4;
}

function drawCircle(context, circle) {
  context.beginPath();
  context.arc(circle.x, circle.y, circle.r, circle.start, circle.end, circle.cc);
  context.strokeStyle = circle.color;
  context.lineWidth = 10;
  context.stroke();
}

// start
var app = new App();


var add = document.getElementById("add");
var remove = document.getElementById("remove");
add.addEventListener('click', function(e) {
  addCircle(app, app.center);
});
remove.addEventListener('click', function(e) {
  removeCircle(app);
});