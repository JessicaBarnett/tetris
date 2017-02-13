
/***  Collision tests  ***/

define(['lodash'], function( _ ) {

    var hasHitLeft = function(block) {
        var leftBounds = 0;
        return _.reduce(block.squares, function(result, square){
          if (square.x >= leftBounds) {
            return result;
          }
          return true;
        }, false )
      },

    hasHitRight = function(block, board) {
      var rightBounds = board.cols;
      return _.reduce(block.squares, function(result, square){
        if (square.x <= rightBounds) {
          return result;
        }
        return true;
      }, false);
    },

    hasHitBottom = function(block, board){
        var bottomBounds = board.rows;
        return _.reduce(block.squares, function(result, square){
          if (square.y <= bottomBounds) {
            return result;
          }
          return true;
        }, false);
    },

    hasHitSquares = function (block, board) {
      return _.reduce(block.squares, function(result, square){
        if (_.find(board.squares, {x: square.x, y: square.y}))
          return true;
        else
          return result;
      }, false);
    },

    hasLanded = function (block, board) {
      if (hasHitBottom(block, board))
          return true;

      return _.reduce(block.squares, function(result, square){
        if (_.find(board.squares, {x: square.x, y: square.y}))
          return true;
        else
          return result;
      }, false);
    },

    hasCollided = function (block, board) {
      if (hasLanded(block, board)) {
          // console.log('has landed!!');
      }

       if (hasHitLeft(block)){
        // console.log('collision - has hit left');
        return true;
       }

      if (hasHitRight(block, board)){
        // console.log('collision - has hit right');
        return true;
      }

      if (hasHitBottom(block, board)){
        // console.log('collision - has hit bottom');
        return true;
      }

      if (hasHitSquares(block, board)) {
        // console.log('collision - has hit squares');
        return true;
      }

      return false;
    };

    return {
        // hasHitRight: hasHitRight, /* debug only */
        // hasHitLeft: hasHitLeft, /* debug only */
        // hasHitBottom: hasHitBottom, /* debug only */
        // hasHitSquares: hasHitSquares, /* debug only */
        hasCollided: hasCollided,
        hasLanded: hasLanded
    };
});
