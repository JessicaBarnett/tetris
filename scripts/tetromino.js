// require(tetromino/tetrominoGenerator);
// require(tettomino/tetrominoMovement);


var Tetromino = (function(){

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

  /*
    returns translate, and rotate functions
  */
  generator = tetrominoGenerator(prototypes, colors),

  /*
    returns translate, and rotate functions
  */
  move = tetrominoMovement();

  return {
    rotate: move.rotate,
    translate: move.translate,
    make: generator.make
  }

})();
