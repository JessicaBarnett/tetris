/*
    Generates a board, which is just an object in this format:
    board: {
        rows: _,
        cols: _,
        squares: []
    }
*/
define([ 'lodash', 'utility/debug'], function(_, debug){

    var newBoard = function(rows, cols) {
        return {
          rows: rows,
          cols: cols,
          squares: []
        }
    },

    hasClearedRows = function(board) {
        var rowSquares;
        for (var row = board.rows; row > 0; row--) {
            rowSquares = _.filter(board.squares, {'y': row});
            if ((rowSquares.length-1) === board.cols )
              return true;
        }
        return false;
    },

    findClearedLines = function(board) {
        var clearedLines = [],
            rowSquares;

        for (var row = board.rows; row > 0; row--) {
            rowSquares = _.filter(board.squares, {'y': row});
            if ((rowSquares.length-1) === board.cols) {
                clearedLines.push(row);
            }
        }

        return clearedLines;
    },

    // return board with lines shifted down and cleared lines removed
    removeClearedLines = function(board, lines) {
        // TODO: point system piece can go here
        // shift all other rows down by one x
        _.each(lines, function(line) {
            board.squares = _.reject(board.squares, {'y': line});
        });
        shiftRow(board, _.min(lines));
        return board;
    },

    /*
     * start = the number of the lowest cleared line
     * want to clear rows 10-13
     * start = 13, meaning there can be no block
    */
    shiftRow = function(board, start) {
        _.each(board.squares, function(square){
            if (square.y < start)
              return square.y = square.y+1;
        });
    };

  return {
    removeClearedLines: removeClearedLines,
    findClearedLines: findClearedLines,
    shiftRow: shiftRow,
    hasClearedRows: hasClearedRows,
    make: newBoard
  };
});
