// board dimensions 500 x 300
// block width: 25px
// grid fits 12 squares across, 20 squares high

//widest width of block determines bounding box
// map through and find all the consecutive x / y values.  the higher of the 2 is the height of the block
//identify center

/*  TETROMINOS   */

var tetrominos = {
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
 };

function buildMino(type, x, y){
  this.squares = makeMinoSparseArray(tetrominos[type]);
  this.x = x;
  this.y = y;
}

/*
  returns a new block with the passed color/type
*/
function newTetromino(type, x, y){
  return makeMinoSparseArray(_.map(tetrominos[type], function(square){
    return {
      x: square.x,
      y: square.y,
      color: colorGenerator.get(type),
      type: type,
      proto: tetrominos[type]
    };
  }));
}

function makeMinoSparseArray(proto){
  var width = getWidth(proto);
  var mino = [], match;
  for (var y = 0; y < width; y++){
    for (var x = 0; x < width; x++){
      match = _.where(proto, {x: x, y: y})[0];
      mino.push( match ? match : null);
    }
  }
  return mino;
}

function getWidth (block){
  var xWidth = (_.max(block, 'x').x + 1) - _.min(block, 'x').x,
      yWidth = (_.max(block, 'y').y + 1) - _.min(block, 'y').y;

  return xWidth > yWidth ? xWidth : yWidth;
}



/*
  returns a random tetromino name
*/
function randomTetromino(){
  return newTetromino(randomTetrominoName());
}

function randomTetrominoName (){
  return Object.keys(tetrominos)[Math.floor(Math.random()*7)];
}



function randomNum(highest){
  return Math.floor( Math.random() * highest );
}

// the bottom y coordinate for the column (index)
var bottom = _.map(Array(12), function(){
  return 19;
});






/***  BLOCK MOVEMENT  ***/

var move = function() {
  var moveBlock = function(block, func){
    if (isOutOfBounds(block, func)){
      return _.identity(block);
    }

    return _.map(block, func);
  },

  rotateBlock = function(block, func){
    if (isOutOfBounds(block, func)){
      return _.identity(block);
    }

    return _.map(block, function(square, index, block){
      return func(square, index);
    });
  },

  isOutOfBounds = function(block, func){
    var compactBlock = _.compact(block);
    if (func === moveLeft && hasHitLeftSide(compactBlock))
      return true;

    if (func === moveRight && hasHitRightSide(compactBlock))
      return true;

    if ((func === softDrop || func === hardDrop) && hasHitBottom(compactBlock))
      return true;

    return false;
  },

  moveRight = function(square){
    if (!square)
      return null;
    return _.assign(square, {
      x: square.x + 1,
      y: square.y
    });
  },

  moveLeft = function(square){
    if (!square)
      return null;
    return _.assign(square, {
      x: square.x - 1,
      y: square.y
    });
  },

  // this feature does not re-set the 'bottom' of the board,
  // so moving up from the bottom edge will cause errors
  moveUp = function(square){
    if (!square)
      return null;
    return _.assign(square, {
      x: square.x,
      y: square.y - 1
    });
  },

  softDrop = function(square){
    if (!square)
      return null;
    return _.assign(square, {
      x: square.x,
      y: square.y + 1
    });
  },

  hardDrop = function(square){
    if (!square)
      return null;
    bottom[square.x] -= 1; //TODO: move this functionality into its own function
    return _.assign(square, {
      x: square.x,
      y: square.y + ((bottom[square.x] + 1) - square.y)
    });
  },

  flipXY = function(square){
    if (!square)
      return null;
    return _.assign(square, {
      x: square.y,
      y: square.x
    });
  },

  rotateRight = function(square, index){
    if (!square)
      return null;

    // return _.assign(square, {
    //   x: square.x * Math.cos(95) - square.y * Math.sin(95),
    //   y: square.x * Math.sin(95) - square.y * Math.cos(95),
    // });

    return _.assign(square, {
      x: -1 * square.y,
      y: square.x
    });
  },

  rotateLeft = function(square){
    // if (!square)
    //   return null;
    return _.assign(square, {
      x: square.y,
      y: -1 * square.x
    });
  };

  return {
    moveRight: _.partialRight(moveBlock, moveRight),
    moveLeft: _.partialRight(moveBlock, moveLeft),
    moveUp: _.partialRight(moveBlock, moveUp),
    flipXY: _.partialRight(moveBlock, flipXY),
    softDrop: _.partialRight(moveBlock, softDrop),
    hardDrop: _.partialRight(moveBlock, hardDrop),
    rotateRight: _.partialRight(moveBlock, rotateRight),
    rotateLeft: _.partialRight(moveBlock, rotateLeft)
  }

}();


/***  BLOCK MOVEMENT restructure  ***/
/*

accepts a block with a .proto property that contains an array of blocks,
identical to the ones in the 'tetromino' array.

move functions calculate a block's position by adding the block's
coordinates (x, y) to the points in proto

*/


var move2 = function() {
  var moveBlock = function(block, func){
    // if (isOutOfBounds(block, func)){
    //   return _.identity(block);
    // }

    return _.map(block, func);
  },

  moveRight = function(square){
    if (!square)
      return null;


    return _.assign(square, {
      x: square.protox + 1,
      y: square.y
    });
  },

  moveLeft = function(square){
    if (!square)
      return null;
    return _.assign(square, {
      x: square.x - 1,
      y: square.y
    });
  },

  moveUp = function(square){
    if (!square)
      return null;
    return _.assign(square, {
      x: square.x,
      y: square.y - 1
    });
  },

  softDrop = function(square){
    if (!square)
      return null;
    return _.assign(square, {
      x: square.x,
      y: square.y + 1
    });
  },

  hardDrop = function(square){
    return square;
  },

  flipXY = function(square){
    return square;
  },

  rotateRight = function(square){
    return square;
  },

  rotateLeft = function(square){
    return square;
  };

  return {
    moveRight: _.partialRight(moveBlock, moveRight),
    moveLeft: _.partialRight(moveBlock, moveLeft),
    moveUp: _.partialRight(moveBlock, moveUp),
    flipXY: _.partialRight(moveBlock, flipXY),
    softDrop: _.partialRight(moveBlock, softDrop),
    hardDrop: _.partialRight(moveBlock, hardDrop),
    rotateRight: _.partialRight(moveBlock, rotateRight),
    rotateLeft: _.partialRight(moveBlock, rotateLeft)
  }

}();


/***  COLLISION TESTS  ***/

function hasHitLeftSide(block) {
  return _.reduce(block, function(result, square){
    if (square.x > 0) {
      return result;
    }
    return true;
  }, false)
}

function hasHitRightSide(block) {
  return _.reduce(block, function(result, square){
    if (square.x < 11) {
      return result;
    }
    return true;
  }, false)
}

function hasHitBottom(block) {
  //if any of the blocks has a y coordinate that is higher than the bottom (20) return true;
  return _.reduce(block, function(result, square){
    if (bottom[square.x] && square.y >= bottom[square.x])
      return true;
    return result;
  }, false);
}


/***  MISC?  ***/

/* x/y on a 22h x 8w grid
    pass in any array of squares (a tetromino block or a board array, either works)
*/

function drawSquares(squares){
  _.forEach(squares, function(square){
      if (square) {
        canvas.drawSquare(coordinates(square.x), coordinates(square.y), 25, 25, square.color);
      }
  });
}

/* logs Tetromino */

function logTetromino(block){
  return _.map(block, function(square){
    if (square)
      return '( ' + square.x + ', ' + square.y +' )';
  });
}

/* logs functions in draw tetromino */

function logFunctions(block){
  console.log('Tetromino coordinates:  ', logTetromino(block));
  // console.log('has hit bottom?  ', hasHitBottom(block));
  // console.log('has hit left side?  ', hasHitLeftSide(block));
  // console.log('has hit Right side?  ', hasHitRightSide(block));
}

/*
  gets pixel coordinates for a grid location
  ex: (5, 3) > ( 125px, 75px )
*/
function coordinates(point){
    var blockWidth = 25;
    return (point * blockWidth);
}

var board = [];
var currentBlock = randomTetromino();
logTetromino(currentBlock);
drawSquares(currentBlock);

$(document).keydown(function(e){
	var key = e.which;

  if (key === 37) /* L */
    currentBlock = move.moveLeft(currentBlock);
  else if (key === 39) /* R */
    currentBlock = move.moveRight(currentBlock);
  else if (key === 38) /* U */
    currentBlock = move.moveUp(currentBlock);
    // currentBlock = move.hardDrop(currentBlock);
  else if (key === 40) /* D */
    currentBlock = move.softDrop(currentBlock);
  else if (key === 32) /* Space */
    currentBlock = move.hardDrop(currentBlock);
  else if (key === 87)  /* W */
    currentBlock = move.rotateRight(currentBlock);
  else if (key === 81) /* Q */
    currentBlock = move.rotateLeft(currentBlock);
  else if (key === 191) /* ? */
    currentBlock = move.flipXY(currentBlock);

  canvas.clear();
  drawSquares(currentBlock);
  logFunctions(currentBlock);
  drawSquares(board);

  if (hasHitBottom(_.compact(currentBlock))){
    board = board.concat(_.compact(currentBlock));
    currentBlock = randomTetromino();
  }
});
