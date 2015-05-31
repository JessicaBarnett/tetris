//****** Basic Balloon *******//

function Balloon (x, y, rad, col) {
  this.x = x || random.pos();
  this.y = y || random.pos();
  this.radius = rad || random.rad();
  this.color = col || random.col();
  this.id = generateId();
}

Balloon.prototype.draw = function(canvas){
  canvas.drawCircle(this.x, this.y, this.radius, this.color);
};

//*****  Baby Balloon  *****//

BabyBalloon.prototype = Object.create(Balloon.prototype);
BabyBalloon.prototype.construstor = BabyBalloon;

function BabyBalloon (x, y) {
  Balloon.call(this, x, y);
  this.radius = 15;
}

BabyBalloon.prototype.automate = function (){
  this.dx = random.dir();
  this.dy = random.dir();
  this.auto = true;

  this.timer = setInterval(this.step.bind(this), 50);
}

BabyBalloon.prototype.step = function() {
  this.x = this.x + this.dx;
  this.y = this.y + this.dy;
  var hasCollided = checkAllBalloonsForCollisions(this);

  //if x or y is out of bounds, reverse direction
  if (this.x > 500 || this.x < 0 || hasCollided) {
    this.dx = -(this.dx);
  }

  if (this.y > 500 || this.y < 0 || hasCollided){
    this.dy = -(this.dy);
  }

  if (!this.auto)
    clearInterval(this.timer);
}

BabyBalloon.prototype.willTurn = function(){
  return Math.floor((Math.random() * 10) > 5);
}


//*****  Collisions   *****//

//can be pre-composed with balloons array maybe?
function checkAllBalloonsForCollisions (balloon) {
  for (var i = 0; i < balloons.length; i++) {
    if (balloon.id != balloons[i].id && haveCollided(balloon, balloons[i])) {
      return true;
    }
  }
  return false;
}

// detects whether 2 circles have collided
function haveCollided (circle1, circle2) {
  // debugger;
  var distX = circle1.x - circle2.x;
  var distY = circle1.y - circle2.y;
  var distance = Math.sqrt(distX * distY + distY * distY);

  return (distance < circle1.radius + circle2.radius);
}


//****** User Balloon *******//


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


//****** Baby Balloons *******//

var balloons = [];


function addBalloon () {
  var newBalloon = new BabyBalloon(userBalloon.x, userBalloon.y);
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


/*****  Timers  *****/

function startGame(){
  var addBalloonTimer = setInterval(function() {
    canvas.clear();
    addBalloon();
    drawBalloons(canvas);
  }, 1000);


  var drawTimer = setInterval(function() {
    drawBalloons(canvas);
  }, 50);
}


startGame();
