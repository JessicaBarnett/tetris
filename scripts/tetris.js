/*  GUIDING CONCEPTS

    1. store as little state as possible
    2. don't use prototypes.  stick with plain old objects.
    3. keep arguments simple and consistent
        - uniformly pass a whole board object, and/or a whole block object


*/

/*
  generates a tetromino
    Tetromino: {
      x: _,
      y: _,
      squares: [ {x: _, y: _, color: _},
                 {x: _, y: _, color: _},
                 {x: _, y: _, color: _},
                 {x: _, y: _, color: _}
              ]
    }
*/

var TGen = (function(){

  /* Private, immutable Data Sets  */
  var prototypes = {
     J: [{ x: -1, y: 0 }, { x: 0, y: 0 },
         { x: 1, y: 0 }, { x: 1, y: -1 }],

     L: [{ x: -1, y: -1 }, { x: -1, y: 0 },
         { x: 0, y: 0 }, { x: 1, y: 0 }],

     I: [{ x: 0, y: 1 }, { x: 1, y: 1 },
         { x: 2, y: 1 }, { x: 3, y: 1 }],

     O: [{ x: 0, y: 0 }, { x: 1, y: 0 },
         { x: 0, y: 1 }, { x: 1, y: 1 }],

     Z: [{ x: -1, y: 0 }, { x: 0, y: 0 },
         { x: 0, y: 1 }, { x: 1, y: 1 }],

     S: [{ x: -1, y: 1 }, { x: 0, y: 1 },
         { x: 0, y: 0 }, { x: 1, y: 0 }],

     T: [{ x: 0, y: -1 }, { x: -1, y: 0 },
         { x: 0, y: 0 }, { x: 1, y: 0 }]
   },

  colors = {
     L: '#FFA500', // orange
     J: '#6678FF', // purply blue
     I: '#24BDFF', // cyan
     O: '#FFD700', // yellow
     S: '#4CE64C', // green
     Z: '#FF3300', // red
     T: '#FF66FF' // pink
  },

   mixinColors = function(squares, type){
      if (!squares || !type)
        throw new Error('missing parameter ~ love from mixinColors');

      // composes a function that'll mix {color: "color"} with the  passed-in object
      var addColor = (function(type){
          var color = colors[type];
          return function(square){
              return _.assign(square, {color: color});
          }
      })(type);

      return _.map(squares, addColor);
   },

  /* takes an array of squares and adds x/y coordinates  */
  boardSquares = function (squares, x, y) {
      if (!squares || !_.isFinite(x) || !_.isFinite(y))
        throw new Error('missing parameter ~ love from BoardSquares');

      return _.map(squares, _.bind(function(square){
          return _.assign(square, {
            x: square.x + x,
            y: square.y + y
          });
      }, this));
  },

  // returns string
  randomTetrominoType = function (){
      return Object.keys(prototypes)[Math.floor(Math.random()*7)];
  },

  generateTetromino = function(x, y, type){
    if (!_.isFinite(x) || !_.isFinite(y))
      throw new Error("need both an x and a y ~ love from generate tetromino");

    var type = type ? type : randomTetrominoType(),
        x = x ? x : 4,
        y = y ? y : -2,
        squares = boardSquares(mixinColors(prototypes[type], type), x, y);

        return {
          x: x,
          y: y,
          squares: squares
        };
  };

  return {
    make: generateTetromino
  }
})();

/*
    Generates a board
    board: {
        rows: _,
        cols: _,
        squares: []
    }

*/
var BGen = (function(){

  var generateBoard = function(rows, cols){
      return {
        rows: rows,
        cols: cols,
        squares: []
      }
  }

  return {
    make: generateBoard
  };

})();


/***  Rotation and Translation Functions  ***/

var moveT = (function(){

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

      rotate = function(block, reverse){
          if (!_.isFinite(block.x) || !_.isFinite(block.y))
            throw new Error('expected block. ~love from rotate');

          var squaresAtZeroCenter = translateSquares(block.squares, (-1*(block.x)), (-1*(block.y))),
              rotatedSquares = rotateAroundZeroCenter(squaresAtZeroCenter, reverse),
              moveSquaresBackToPosition = translateSquares(rotatedSquares, block.x, block.y);

          return _.assign(_.clone(block), { squares: moveSquaresBackToPosition });
      },

      rotateAroundZeroCenter = function(squares, reverse){
        // squares are assumed to be at 0 center
        var r = reverse ? {x: 1, y: -1} :  {x: -1, y: 1},
            rotatedSquares = _.map(squares, function(square){
                return _.assign(_.clone(square), {
                  x: (r.x * square.y),
                  y: (r.y * square.x)
                });
            });

        return rotatedSquares;
      },

      getWidth = function(block){
        var xWidth = (_.max(block, 'x').x + 1) - _.min(block, 'x').x,
            yWidth = (_.max(block, 'y').y + 1) - _.min(block, 'y').y;

        return xWidth > yWidth ? xWidth : yWidth;
      }

  return {
    translate: translateBlock,
    rotate: rotate
  };

})();

/***  Collision tests  ***/

var collision = (function(){

      _hasHitLeft = function(block) {
        var leftBounds = 0;
        return _.reduce(block.squares, function(result, square){
          if (square.x >= leftBounds) {
            return result;
          }
          return true;
        }, false)
      },

      _hasHitRight = function(block, board) {
        var rightBounds = board.cols;
        return _.reduce(block.squares, function(result, square){
          if (square.x <= rightBounds) {
            return result;
          }
          return true;
        }, false);
      },

      _hasHitBottom = function(block, board){
          var bottomBounds = board.rows;
          return _.reduce(block.squares, function(result, square){
            if (square.y <= bottomBounds) {
              return result;
            }
            return true;
          }, false);
      },

      _hasHitSquares = function (block, board) {
        return _.reduce(block.squares, function(result, square){
          if (_.find(board.squares, {x: square.x, y: square.y}))
            return true;
          else
            return result;
        }, false);
      },

      _hasLanded = function (block, board) {
        if (_hasHitBottom(block, board))
          return true;

        return _.reduce(block.squares, function(result, square){
          if (_.find(board.squares, {x: square.x, y: square.y+1})){
            debugger;
            return true;
          }
          else
            return result;
        }, false);
      },

      hasCollided = function (block, board) {
        if (_hasLanded(block, board)) {
            console.log('has landed!!');
        }

         if (_hasHitLeft(block)){
          console.log('collision - has hit left');
          return true;
         }

        if (_hasHitRight(block, board)){
          console.log('collision - has hit right');
          return true;
        }

        if (_hasHitBottom(block, board)){
          console.log('collision - has hit bottom');
          return true;
        }

        if (_hasHitSquares(block, board)) {
          console.log('collision - has hit squares');
          return true;
        }


        return false;
      };

      return {
        _right: _hasHitRight,
        _left: _hasHitLeft,
        _bottom: _hasHitBottom,
        _squares: _hasHitSquares,
        landed: _hasLanded,
        hasCollided: hasCollided
      }
})();
