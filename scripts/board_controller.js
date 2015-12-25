var boardCtrl = (function(){

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
    		shiftRow(board, _.min(lines));
    		return board;
    }

    function shiftRow(board, start){
    		_.each(board.squares, function(square){
    				if (square.y < start)
    					return square.y = square.y+1
    		});
    }




})();
