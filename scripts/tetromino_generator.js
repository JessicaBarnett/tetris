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

     I: [{ x: -1, y: 1 }, { x: 0, y: 1 },
         { x: 1, y: 1 }, { x: 2, y: 1 }],

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

      // composes a function that'll mix {color: "color"} with the passed-in object
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
      if (testBlocks){
          return testBlocks[Math.floor(Math.random()*testBlocks.length)];
      }

      return Object.keys(prototypes)[Math.floor(Math.random()*7)];
  },

  generateTetromino = function(x, y, type){
    if (!_.isFinite(x) || !_.isFinite(y))
      throw new Error("need both an x and a y ~ love from generate tetromino");


    var type = type ? type : randomTetrominoType(),
        x = x ? x : 4,
        y = y ? y : -2,
        proto = _.cloneDeep(prototypes[type]),
        squares = boardSquares(mixinColors(proto, type), x, y);

        return {
          x: x,
          y: y,
          squares: squares
        };
  };

  if (test) {
    return {
      prototypes: prototypes,
      colors: colors,
      mixinColors: mixinColors,
      boardSquares: boardSquares,
      randomTetrominoType: randomTetrominoType,
      make: generateTetromino
    }
  }

  return {
    make: generateTetromino
  }
})();
