// require(canvas);
// require(tetris);




//controller-type functions
function filterCollisions(newBlock, oldBlock, board){
	if (collision.hasCollided(newBlock, board))
		return oldBlock;
	else
		return newBlock;
}


function hasClearedRows(board){
		var rowSquares;
		for (var row = board.rows; row > 0; row--) {
				rowSquares = _.filter(board.squares, {'y': row});
				if ((rowSquares.length-1) === board.cols )
					return true;
		}
		return false;
}

function findClearedLines(board){
		var clearedLines = [],
				rowSquares;

		for (var row = board.rows; row > 0; row--) {
				rowSquares = _.filter(board.squares, {'y': row});
				if ((rowSquares.length-1) === board.cols) {
						clearedLines.push(row);
				}
		}

		return clearedLines;
}

function removeClearedLines(board, lines){
		// TODO: point system piece can go here
		// shift all other rows down by one x
		_.each(lines, function(line){
				board.squares = _.reject(board.squares, {'y': line});
		});
		shiftRow(board, _.max(lines));
		return board;
}

/*
 * start = the number of the lowest cleared line
*/
function shiftRow(board, start){
		// want to clear rows 10-13
		// start = 13, meaning there can be no block

		_.each(board.squares, function(square){
				if (square.y < start)
					square.y = square.y+1;
		});
}


/*
 *  INTERACTION
 *
*/


var board = GameBoard.make(20, 11);
var block = Tetromino.make(5, -2);


canvas.drawSquares(board.squares);
canvas.drawSquares(block.squares);

// block and board both have squares, so either can be passed in here
canvas.drawSquares(block);

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
		if (collision.landed(newBlock, board)){
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
		while (!collision.landed(newBlock, board)) {
				block = newBlock;
		    newBlock = Tetromino.translate(newBlock, 0, 1);
		}
	}

	if (hasClearedRows(board)){
			console.log('you cleared a row!');
			var lines = findClearedLines(board);
			board = removeClearedLines(board, lines);
	}

	newBlock = null;
  canvas.clear();

	canvas.drawSquares(board.squares);
  canvas.drawSquares(block.squares);
  printBlock(block);
});
