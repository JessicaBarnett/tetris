



/*
 * inits a constructor function that can be called with new Tetromino(type, x, y)
*/
var Tetromino = (function initTetrominoConsructor (){
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

  /* takes an array of squares and adds x/y coordinates  */
  moveSquares = function (squares, x, y) {
      return _.map(squares, _.bind(function(square){
          return {
            x: square.x + x,
            y: square.y + y
          }
      }, this));
  },
  /*resulting func needs proto, rotation, reverse*/
  rotateSquares = (function (){

      nextInSequence = function (oldPosition, reverse) {
          var sequence = [0, 1, 2, 5, 8, 7, 6, 3];

          if (oldPosition === 4) // if this is a center square, it keeps the same index
            return oldPosition;

          if (reverse)
            sequence.reverse(); //this is destructive and only works because sequence is redefined every time nextinsequece is called

          var newPosition = sequence.indexOf(oldPosition) + 2; //rotation moves 2 steps forward in sequence

          if (newPosition >= sequence.length) // if new position is outside of the sequence
            newPosition = newPosition - sequence.length; // go to the beginning

          return sequence[newPosition];
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
      makeSparse = function(protoSquares){
         var widestAxis = getWidestAxis(protoSquares),
             sparseSquares = [],
             match;

         // iterate through all possible points in a widestAxis x widestAxis grid
         for (var y = 0; y < widestAxis; y++){
           for (var x = 0; x < widestAxis; x++){
             match = _.where(protoSquares, {x: x, y: y})[0];
             sparseSquares.push( match ? match : null);
           }
         }

         return sparseSquares;
      },

       // calculates width and height of the passed-in squares.  returns the higher of the two
       getWidestAxis = function(squares){
           var xWidth = (_.max(squares, 'x').x + 1) - _.min(squares, 'x').x,
               yWidth = (_.max(squares, 'y').y + 1) - _.min(squares, 'y').y;

           return xWidth > yWidth ? xWidth : yWidth;
       },

      /* recursive  */
      rotateBlock = function(sparseSquares, rotation, reverse){
          var newBlock = [];

          _.each(sparseSquares, function(square, index){
              newBlock[nextInSequence(index, reverse)] = square;
          });

          //if we're at the 0th rotation, sens it back.  else go a step deeper in recursive loop.
          return rotation ? rotateBlock(newBlock, (rotation-1), reverse) : newBlock;
      };

      return function getRotatedBlock(proto, rotation, reverse){
          return _.compact(rotateBlock(makeSparse(proto), rotation, reverse));
      };
  })();

  // Constructor function
  function Tetromino(type, x, y){
      this.x = x;
      this.y = y;
      this.rotation = 0; //integer 0 - 3.
      this.type = type; //constant
      this.proto = prototypes[type]; //constant
  }

  /* has access to this.x and this.y, both of which are dynamic */
  Tetromino.prototype.squares = function(squares){
  // 1. transforms proto squares into current rotation (using sparseProtoSquares)
  // 2. transforms proto squares into the current x/y location.

    return moveSquares(rotateSquares(this.proto, this.rotation, this.reverse), this.x, this.y);
  };

  return Tetromino; //return constructor
})();


var l = new Tetromino('L', 3, 4);
