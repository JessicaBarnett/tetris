/***  ROTATION AND TRANSLATION FUNCTIONS  ***/

var tetrominoMovement = function(){

  var translateBlock = function(block, dx, dy){
        if (!_.isFinite(block.x) || !_.isFinite(block.y) || !_.isFinite(dx) || !_.isFinite(dy))
          throw new Error('argument error - expected block, and a value for dx and dy.  ~love from translateBlock');

        return {
          x: block.x + dx,
          y: block.y + dy,
          squares: translateSquares(block.squares, dx, dy)
        }
      },

  translateSquares = function(squares, dx, dy){
    return  _.map(squares, function(square){
        return _.assign(_.clone(square), {
          x: square.x + dx,
          y: square.y + dy
        });
      });
  },

  /* To rotate a block...
        - translate the block (and its squares) to origin (0, 0)
        - Compute new coordinates for all squares in the block
              forward rotation:       reverse rotation:
                new x = y               new x = y * -1
                new y = x * -1          new y = x
        - translate block back to its initial position
        See NOTES.txt for diagrams and details
  */
  rotate = function(block, reverse){
      if (!_.isFinite(block.x) || !_.isFinite(block.y))
        throw new Error('expected block. ~love from rotate');

      var squaresAtZeroCenter = translateSquares(block.squares, (-1*(block.x)), (-1*(block.y))),
          rotatedSquares = rotateAroundZeroCenter(squaresAtZeroCenter, reverse),
          moveSquaresBackToPosition = translateSquares(rotatedSquares, block.x, block.y);

      return _.assign(_.clone(block), { squares: moveSquaresBackToPosition });
  },

  /*
      This function assumes that the squares passed in have already been
      translated to origin/zero center
  */
  rotateAroundZeroCenter = function(squares, reverse){
    var r = reverse ? {x: 1, y: -1} :  {x: -1, y: 1},
        rotatedSquares = _.map(squares, function(square){
            return _.assign(_.clone(square), {
              x: (r.x * square.y),
              y: (r.y * square.x)
            });
        });

    return rotatedSquares;
  },

  /*
      finds the width of a block: 2, 3, or 4
      takes the highest x/y value (+1 to account for 0 indices) and subtracts
      the lowest x/y value.
  */
      getWidth = function(block){
        var xWidth = (_.max(block, 'x').x + 1) - _.min(block, 'x').x,
            yWidth = (_.max(block, 'y').y + 1) - _.min(block, 'y').y;

        return xWidth > yWidth ? xWidth : yWidth;
      };

  if (test) {
    return {
      translate: translateBlock,
      translateSquares: translateSquares,
      rotate: rotate,
      rotateAroundZeroCenter: rotateAroundZeroCenter,
      getWidth: getWidth
    }
  }

  return {
    translate: translateBlock,
    rotate: rotate
  };
};
