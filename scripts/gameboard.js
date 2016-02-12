
/*
    Generates a board
    board: {
        rows: _,
        cols: _,
        squares: []
    }

*/
var GameBoard = (function(){

  var generateBoard = function(rows, cols){
      return {
        rows: rows,
        cols: cols,
        squares: []
      }
  };

  return {
    make: generateBoard
  };

})();

// module.exports = BGen;
