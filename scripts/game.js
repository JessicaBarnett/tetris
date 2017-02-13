/**
 *  Using 'Simplified commonJs Wrapping'
 *  http://requirejs.org/docs/whyamd.html#sugar
 */

/*
    I just don't like referring to filterCollisions by
    board.filterCollisions.  the board isn't filtering its own collisions.
    board is literally just an object.

    Want some sort of differentiation between the base object, and the
    code that manipulates it.

    It's like, there are 3 distinct pieces here:
    * the generators that create board and tetromino objects
    * transformers that take the board/square and returns a modified one
    * comparison tests

*/

define(function(require) {
    var $ = require('jquery'),
        _ = require('lodash'),
        debug = require('utility/debug'),
        canvas = require('utility/canvas'),
        Tetromino = require('tetromino/tetromino'),
        Board = require('board/board');

    /*
        Exposing everything purely for debugging purposes
     */
    if (debug.test) {
        window.$ = $;
        window._ = _;
        window.debug = debug;
        window.canvas = canvas;
        window.Tetromino = Tetromino;
        window.Board = Board;
    }

    var board = Board.make(20, 11),
        block = Tetromino.make(5, -2);

    /*
        Acts on an array of blocks - not on a tetromino or a board specifically
        'blocksThatHaventCollided'?
        'movableBlocks'?
     */
    var filterCollisions = function(newBlock, oldBlock, board) {
        if (Tetromino.hasCollided(newBlock, board))
          return oldBlock;
        else
          return newBlock;
    };

		canvas.init('gameBoard');
    canvas.drawSquares(board.squares);
    canvas.drawSquares(block.squares);

    $(document).keydown(function(e){
      var key = e.which,
          newBlock = null;

      /* L */
      if (key === 37) {
        newBlock = Tetromino.translate(block, -1, 0);
        block = filterCollisions(newBlock, block, board);
      }
      /* R */
      else if (key === 39){
        newBlock = Tetromino.translate(block, 1, 0);
        block = filterCollisions(newBlock, block, board);
      }
      /* U - Soft drop */
      else if (key === 38){
        newBlock = Tetromino.translate(block, 0, -1);
        block = filterCollisions(newBlock, block, board);
      }
       /* D */
      else if (key === 40){
        newBlock = Tetromino.translate(block, 0, 1);
        if (Tetromino.hasLanded(newBlock, board)){
          // console.log('generating new block!');
          board.squares = board.squares.concat(block.squares);
          block = Tetromino.make(5, -2);
        }
        else {
            block = filterCollisions(newBlock, block, board)
        }
      }
      /* W */
      else if (key === 87) {
        newBlock = Tetromino.rotate(block, false);
        block = filterCollisions(newBlock, block, board);

      }
      /* Q */
      else if (key === 81) {
        newBlock = Tetromino.rotate(block, true);
        block = filterCollisions(newBlock, block, board);

      }
      /* Space */
      else if (key === 32) {
        newBlock = block;
        /* repeats the translate function until the block collides */
        while (!Tetromino.hasLanded(newBlock, board)) {
            block = newBlock;
            newBlock = Tetromino.translate(newBlock, 0, 1);
        }
      }

      if (Board.hasClearedRows(board)){
          console.log('you cleared a row!');
          var lines = Board.findClearedLines(board);
          board = Board.removeClearedLines(board, lines);
      }

      newBlock = null;
      canvas.clear();

      canvas.drawSquares(board.squares);
      canvas.drawSquares(block.squares);
      debug.printBlock(block);
    });
});
