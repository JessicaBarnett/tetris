//*** Tests ***//

//Note: Check key codes: $(document).keydown(function(e){console.log(e.which)})

// Visual test for blocks
function testBlocks(){
  var i = 0;
  for (tetrino in tetrinos) {
    i+= 1;
    setTimeout((function(){
      var block = tetrinos[tetrino];
      return function(){
        canvas.clear();
        drawTetrino(block);
      }
    })(), i*1000)
  }
}
