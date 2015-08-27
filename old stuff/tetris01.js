/*
  generates a tetromino

    Tetromino: {
      x: _,
      y: _,
      squares: [ null,
                {x: _, y: _, color: _},
                {x: _, y: _, color: _},
                {x: _, y: _, color: _},
                {x: _, y: _, color: _},
                null,
                null,
                null,
                null
              ]
    }
*/

var TetrominoGenerator = (function(){

  /* Private, immutable Data Sets  */
  var prototypes = {
     L: [{ x: 0, y: 1 }, { x: 1, y: 1 },
         { x: 2, y: 1 }, { x: 2, y: 0 }],

     J: [{ x: 0, y: 0 }, { x: 0, y: 1 },
         { x: 1, y: 1 }, { x: 2, y: 1 }],

     I: [{ x: 0, y: 1 }, { x: 1, y: 1 },
         { x: 2, y: 1 }, { x: 3, y: 1 }],

     O: [{ x: 0, y: 0 }, { x: 1, y: 0 },
         { x: 0, y: 1 }, { x: 1, y: 1 }],

     Z: [{ x: 0, y: 1 }, { x: 1, y: 0 },
         { x: 1, y: 1 }, { x: 2, y: 0 }],

     S: [{ x: 1, y: 0 }, { x: 2, y: 1 },
         { x: 0, y: 0 }, { x: 1, y: 1 }],

     T: [{ x: 0, y: 1 }, { x: 1, y: 1 },
         { x: 2, y: 1 }, { x: 1, y: 0 }]
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

  /*  takes an array of squares and turns it into an array that
    represents a grid
    Example: an upright L tetromino
      its widestAxis is 3 squares (top of L to bottom), so its sparse array
      will be 3 X 3 blocks long (9) with every 3 squares representing a row.
      sparse array will represent a block like this:
      [ _, O, _,
        _, O, _,
        _, O, O  ]
      empty spaces will be set to 'null'
      This sparse array is used in the rotation of blocks
      Method works by
        * iterating though all possible points in a widestAxis x widestAxis array,
        * comparing them to the squares in a compact proto array (block starts at 0, 0)
          * if there is a match, assign that point to said match
          * if not, assign null
*/
  makeSparse = function(compactSquares){
     var widestAxis = getWidestAxis(compactSquares),
         sparseSquares = [],
         x = , //
         y = ,
         match;

     // iterate through all possible points in a widestAxis x widestAxis grid
     for (var y = 0; y < widestAxis; y++){
       for (var x = 0; x < widestAxis; x++){
         match = _.where(compactSquares, {x: x, y: y})[0];
         sparseSquares.push( match ? match : null);
       }
     }

     return sparseSquares;
  },

  /* takes an array of squares and adds x/y coordinates  */
  boardSquares = function (squares, x, y) {
      return _.map(squares, _.bind(function(square){
          return {
            x: square.x + x,
            y: square.y + y
          }
      }, this));
  },

   // calculates width and height of the passed-in squares.  returns the higher of the two
   getWidestAxis = function(squares){
       var xWidth = (_.max(squares, 'x').x + 1) - _.min(squares, 'x').x,
           yWidth = (_.max(squares, 'y').y + 1) - _.min(squares, 'y').y;

       return xWidth > yWidth ? xWidth : yWidth;
   },

   mixinColors = function(squares, type){
      // composes a function that'll mix {color: "color"} with the objects in 'squares'
      var addColor = _.partialRight(_.extend, {color: colors[type]});
      return _.map(squares, addColor);
   },

  // returns string
  randomTetrominoType = function (){
      return Object.keys(prototypes)[Math.floor(Math.random()*7)];
  },

  generateTetromino = function(x, y, type){
      if (!type)
        type = randomTetrominoType();

      return makeSparse(mixinColors(boardSquares(prototypes[type], x, y), type));
  };

  // functions with underscores are for testing only.
  return {
    _randomTetrominoType: randomTetrominoType,
    _mixinColors: mixinColors,
    _getWidestAxis: getWidestAxis,
    _makeSparse: makeSparse,
    make: generateTetromino
  }
})();
