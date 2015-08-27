//***********         CANVAS         ***********//
//*     Abstract drawing functions go here     *//

var canvas = (function(){
  var element,
      ctx,
      w,
      h,
  drawSquare = function(x, y, width, height, color){
      ctx.strokeStyle = 'white';
      ctx.fillStyle = color || 'gray';
      ctx.lineWidth = 2;
      ctx.fillRect(x, y, width, height);
      ctx.strokeRect(x, y, width, height);
      drawCoordinates(x, y, width); //for debugging
  },
  clear = function(){
      ctx.fillStyle = 'aliceblue';
      ctx.fillRect(0, 0, w, h);
  },
  //for debugging
  drawCoordinates = function(x, y, width){
    var coordinateString = x/width+','+y/width;
    ctx.fillStyle = 'black';
    ctx.fillText(coordinateString, x+3, y+15, width);
  },
  init = function(canvasSelector){
      element = document.getElementById(canvasSelector);
      ctx = element.getContext('2d');
      w = element.width;
      h = element.height;
      clear();
  };

  return {
    drawSquare : drawSquare,
    clear : clear,
    init : init,
  }
})();
canvas.init('gameBoard');


/*Utility*/

/* draw squares */
function drawSquares(squares){
  function coordinates(point){
      var blockWidth = 25;
      return (point * blockWidth);
  }

  _.forEach(squares, function(square){
      if (square) {
        canvas.drawSquare(coordinates(square.x), coordinates(square.y), 25, 25, square.color);
      }
  });
}

/* logs squares */
function logSquares(squares){
  console.log(_.map(squares, function(square){
    if (square)
      return '( ' + square.x + ', ' + square.y +' )';
  }));
}

/* random number */
function randomNum(highest){
  return Math.abs(Math.floor( Math.random() * highest ));
}

/* tests */
//
// /* generate 10 blocks and place them randomly on the board */
// function generate10(){
//   var newMino,
//       squaresArray = [];
//   for (var i = 0; i < 10; i++) {
//       newMino = TGen.make(randomNum(3), randomNum(10));
//       squaresArray = squaresArray.concat(newMino.squares);
//   }
//   return squaresArray;
// }
