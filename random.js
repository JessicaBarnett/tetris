//****** Random value generator *******//
var random = (function(){
  _randomNum = function(min, max) {
      return Math.floor(Math.random() * (max - min) + min) + 1 || 1; //if random number returns 0, uses 1 by default
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
      return _randomNum(-6, 5);
  };

  return {
    pos: randomPosition,
    col: randomColor,
    rad: randomRadius,
    dir: randomDirection
  }

})();




/*****   Misc Utils   *****/

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


function generateId() {
  return new Date().getUTCMilliseconds();
}
