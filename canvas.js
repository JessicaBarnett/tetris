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
