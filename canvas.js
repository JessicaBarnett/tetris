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
    init : init
  }
})();
canvas.init('gameBoard');
