//***********         CANVAS         ***********//
//*     Abstract drawing functions go here     *//

define(['utility/debug'], function (debug) {
    var element,
        ctx,
        w,
        h,

    drawSquare = function(x, y, width, height, color){
        ctx.strokeStyle = 'white';
        ctx.fillStyle = color || 'gray';
        ctx.lineWidth = 2;
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
        // drawCoordinates(x, y, width); //for debugging
    },

    /*
        this is more specific to a Board-specific canvas than a general canvas
        note: both block and board both have a 'squares' key, so either can be passed in here
     */
    drawSquares = function (squares){
        function coordinates(point){
            var blockWidth = 25; /* hard coded block width */
            return (point * blockWidth);
        }

        _.forEach(squares, function(square){
            if (square) {
              drawSquare(coordinates(square.x), coordinates(square.y), 25, 25, square.color);
            }
        });
    },

    clear = function(){
        ctx.fillStyle = 'aliceblue';
        ctx.fillRect(0, 0, w, h);
    },

    /*
        Adds (x, y) coordinates inside each square
    */
    drawCoordinates = function(x, y, width){
        var coordinateString = x/width+','+y/width;
        ctx.fillStyle = 'black';
        ctx.fillText(coordinateString, x+3, y+15, width);
    },

    init = function(canvasSelector){
        element = document.getElementById(canvasSelector);
        ctx = element.getContext('2d');
        w = element.width;
        h = element.height;
        clear();
    };

    return {
        drawSquare : drawSquare, /* debug only */
        drawSquares: drawSquares,
        clear : clear,
        init : init
    }
});
