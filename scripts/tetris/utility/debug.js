/**
 *   Debug Utilities and Configuration
 */

define(['jquery', 'lodash'], function($, _) {
    var  test = true,
         testBlocks = ['L', 'J', 'O', 'I', 'Z', 'S'],

        /* prints block coordinates and square coordinates to the debugPanel */
        printBlock = function (block){
            var $debugPanel = $('#debugPanel');
            $debugPanel.html('<p>Block: ( '+block.x+', '+block.y+' )</p><p>Squares: </p>');
            _.each(block.squares, function(square){
                $debugPanel.append('<p> ( '+square.x+', '+square.y+' ) </p>');
            });
        },

      /* logs squares */
      logSquares = function(squares){
        console.log(_.map(squares, function(square){
          if (square)
            return '( ' + square.x + ', ' + square.y +' )';
        }));
      },

      expectError = function(condition, message){
          if (test && condition()) {
              throw new Error(message);
          }
      };

      return {
          test: test,
          testBlocks: testBlocks,
          logSquares: logSquares,
          printBlock: printBlock,
          expectError: expectError
      }
});
