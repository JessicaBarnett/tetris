var rotate = (function (){

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
            return rotateBlock(makeSparse(proto), rotation, reverse);  //this should eventually compact as well
    };
})();

console.log('Z')

var z = new Tetromino('Z', 0, 0);
console.log(rotate(z.proto, 1));
console.log(rotate(z.proto, 2));
console.log(rotate(z.proto, 3));
console.log(rotate(z.proto, 0));

console.log('L')

var l = new Tetromino('L', 0, 0);
console.log(rotate(l.proto, 1));
console.log(rotate(l.proto, 2));
console.log(rotate(l.proto, 3));
console.log(rotate(l.proto, 0));
//

console.log('L reversed')

console.log(rotate(l.proto, 1, true));
console.log(rotate(l.proto, 2, true));
console.log(rotate(l.proto, 3, true));
console.log(rotate(l.proto, 0, true));






  /*
    single square rotation

    clockwise!

    center square: 4
    sequence: 0, 1, 2, 5, 8, 7, 6, 3

    if square falls on a mid square:
          1, 5, 7, 3

    if square is a corner square:
          0, 2, 8, 6

    if square is center, it stays constant:
          4

      0  1  2           0  1  2  3  4  5  6  7  8
    0 o                 o, _, _, _, x, _, _, _, _
    1
    2                   0


      0  1  2           0  1  2  3  4  5  6  7  8
    0    o              _, o, _, _, x, _, _, _, _
    1
    2                   1


      0  1  2           0  1  2  3  4  5  6  7  8
    0       o           _, _, o, _, x, _, _, _, _
    1
    2                   2


      0  1  2           0  1  2  3  4  5  6  7  8
    0                   _, _, _, _, x, o, _, _, _
    1       o
    2                   5


      0  1  2           0  1  2  3  4  5  6  7  8
    0                   _, _, _, _, x, _, _, _, o
    1
    2       o           8


      0  1  2           0  1  2  3  4  5  6  7  8
    0                   _, _, _, _, x, _, _, o, _
    1
    2    o              7


      0  1  2           0  1  2  3  4  5  6  7  8
    0                   _, _, _, _, x, _, o, _, _
    1
    2 o                 6


      0  1  2           0  1  2  3  4  5  6  7  8
    0                   _, _, _, o, x, _, _, _, _
    1 o
    2                   3

  */

/*
  L tetromino rotation

    0  1  2           0  1  2  3  4  5  6  7  8
  0    o              _, o, _, _, o, _, _, o, o
  1    o
  2    o  o           1, 4, 7, 8



    0  1  2           0  1  2  3  4  5  6  7  8
  0                   _, _, _, o, o, o, o, _, _
  1 o  o  o
  2 o                 3, 4, 5, 6



    0  1  2           0  1  2  3  4  5  6  7  8
  0 o  o              o, o, _, _, o, _, _, o, _
  1    o
  2    o              0, 1, 4, 7



    0  1  2           0  1  2  3  4  5  6  7  8
  0       o           _, _, o, o, o, o, _, _, _
  1 o  o  o
  2                   2, 3, 4, 5


*/
