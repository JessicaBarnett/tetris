// require(canvas);
// require(tetris);


function preventCollisions(newBlock, oldBlock, board){
	if (collision.hasCollided(newBlock, board))
		return oldBlock;
	else
		return newBlock;
}

/*TODO: make this thing!!*/
function blockLanded(){
	//return true if block has hit bottom edge,
	//OR block has hit a square on the bottom edge


}

var board = BGen.make(20, 11);
// board.squares = generate10();
board.squares.push({x: 5, y: 5, color: 'tomato'});

var block = TGen.make(5, -2);


drawSquares(board.squares);
drawSquares(block.squares);

// block and board both have squares, so either can be passed in here
drawSquares(block);

$(document).keydown(function(e){
	var key = e.which,
			newBlock = null;

	/* L */
  if (key === 37) {
		newBlock = moveT.translate(block, -1, 0);
		block = preventCollisions(newBlock, block, board);
	}
	/* R */
  else if (key === 39){
		newBlock = moveT.translate(block, 1, 0);
		block = preventCollisions(newBlock, block, board);
	}
	/* U - Soft drop */
  else if (key === 38){
		newBlock = moveT.translate(block, 0, -1);
		block = preventCollisions(newBlock, block, board);
	}
	 /* D */
  else if (key === 40){
		newBlock = moveT.translate(block, 0, 1);
		block = preventCollisions(newBlock, block, board)

		/*
		if (blockLanded)
	    board.squares = board.squares.concat(block.squares);
	    block = TGen.make(5, -2);
		*/
	}
  /* W */
	else if (key === 87) {
    newBlock = moveT.rotate(block, false);
		block = preventCollisions(newBlock, block, board);

	}
  /* Q */
  else if (key === 81) {
    newBlock = moveT.rotate(block, true);
		block = preventCollisions(newBlock, block, board);

	}
  // else if (key === 32) /* Space */
    // currentBlock = move.hardDrop(currentBlock);
	logSquares(block.squares);
	newBlock = null;
  canvas.clear();

	drawSquares(board.squares);
  drawSquares(block.squares);
});
