//****** Random value generator *******//
var random = (function(){
  _randomNum = function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
  },
  randomPosition = function(){
      return _randomNum(100, 400);
  },
  randomColor = function(){
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },
  randomRadius = function(){
      return _randomNum(10, 50);
  },
  randomDirection = function(){
      return _randomNum(-10, 10);
  };

  return {
    pos: randomPosition,
    col: randomColor,
    rad: randomRadius,
    dir: randomDirection
  }

})();

//****** Canvas Draw functions *******//
var canvasElement = document.getElementById('canvas');
var canvas = (function(ctx, w, h){
  var context = ctx,
      width = w,
      height = h,

  drawCircle = function(x, y, radius, color){
      context.beginPath();
      context.fillStyle = color;
      context.arc(x, y, radius, 0, Math.PI*2, true);
      context.closePath();
      context.lineWidth = 0;
      context.fill();
  },
  clear = function(){
      context.fillStyle = 'aliceblue';
      context.fillRect(0, 0, width, height);
  };

  return {
    drawCircle : drawCircle,
    clear: clear
  }
})(canvasElement.getContext('2d'), canvasElement.width, canvasElement.height);
canvas.clear(); //draw board

//****** Basic Balloon *******//

function Balloon (x, y, rad, col) {
  this.x = x || random.pos();
  this.y = y || random.pos();
  this.radius = rad || random.rad();
  this.color = col || random.col();
  this.timer;
}

Balloon.prototype.draw = function(canvas){
  canvas.drawCircle(this.x, this.y, this.radius, this.color);
}

Balloon.prototype.automate = function (){
  this.dx = random.dir();
  this.dy = random.dir();
  this.auto = true;

  this.timer = setInterval(this.step.bind(this), 10);
}

Balloon.prototype.step = function() {
  this.x = this.x + this.dx;
  this.y = this.y + this.dy;

  //if x or y is out of bounds, reverse direction
  if (this.x > 500 || this.x < 0) {
    this.dx = -(this.dx)
  }

  if (this.y > 500 || this.y < 0){
    this.dy = -(this.dy);
  }

}

Balloon.prototype.willTurn = function(){
  return Math.floor((Math.random() * 10) > 5);
}


//****** Timer Functions *******//


var userBalloon = new Balloon(250, 250);
userBalloon.draw(canvas);

$('#canvas').on('mousemove', moveTowardsPointer);

function moveTowardsPointer(e){
      var speed = 10;
      if (userBalloon.x != e.offsetX || userBalloon.y != e.offsetY) {
        userBalloon.x = makeNumberMoreEqual(userBalloon.x, e.offsetX, speed);
        userBalloon.y = makeNumberMoreEqual(userBalloon.y, e.offsetY, speed);
      }
}


var balloons = [];
function addBalloon () {
  var newBalloon = new Balloon(userBalloon.x, userBalloon.y);
  newBalloon.automate();
  balloons.push(newBalloon);
  document.getElementById('count').innerHTML = balloons.length;
}

function drawBalloons(canvas) {
  canvas.clear();
  for (var i = 0; i< balloons.length; i++) {
    balloons[i].draw(canvas);
  }
  userBalloon.draw(canvas);
}

timer = setInterval(function() {
  canvas.clear();
  addBalloon();
  drawBalloons(canvas);
}, 1000);


var drawLoop = setInterval(function() {
  drawBalloons(canvas);
}, 50);




//there HAS to be a better way to do this...
function makeNumberMoreEqual (start, end, increment) {
  if (start > end) {
      if (start - end <= increment){
        return end;
      }
      else {
        return start - increment;
      }
  }
  else if (end > start) {
      if (end - start <= increment){
        return end;
      }
      else {
        return start + increment;
      }
  }

  return end;

}
//adding stuff
