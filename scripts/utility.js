/* configure debug */
var test = false,
    testBlocks = null;


/* logs squares */
function logSquares(squares){
  console.log(_.map(squares, function(square){
    if (square)
      return '( ' + square.x + ', ' + square.y +' )';
  }));
}

/* random number */
function randomNum(highest){
  return Math.abs(Math.floor( Math.random() * highest ));
}

/* prints block coordinates and square coordinates to the debugPanel */
function printBlock(block){
    var $debugPanel = $('#debugPanel');
    $debugPanel.html('<p>Block: ( '+block.x+', '+block.y+' )</p><p>Squares: </p>');
    _.each(block.squares, function(square){
        $debugPanel.append('<p> ( '+square.x+', '+square.y+' ) </p>');
    });
}
