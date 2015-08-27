var board = (function(){

  var board = [],
      cols = 10,
      rows = 20,

      _convertToSquares = function(func, block){
          return func(block.squares);
      },

      addSquares = function(squares){
          squares.each(function(square){
              board.push(square);
          })
      },

      hasHitBottom = function(squares) {
        //if any of the blocks has a y coordinate that is higher than the bottom (20) return true;
        return _.reduce(squares, function(result, square){
          if (bottom[square.x] && square.y >= bottom[square.x])
            return true;
          return result;
        }, false);
      },

      hasHitLeft = function(squares) {
        return _.reduce(squares, function(result, square){
          if (square.x > 0) {
            return result;
          }
          return true;
        }, false)
      },

      hasHitRight = function(squares) {
        return _.reduce(squares, function(result, square){
          if (square.x <= cols) {
            return result;
          }
          return true;
        }, false);
      };

  return {
      addBlock: _.partial(_convertToSquares, addSquares),
      hasHitLeft: _.partial(_convertToSquares, hasHitLeft),
      hasHitRight: _.partial(_convertToSquares, hasHitRight)
  }

})();
