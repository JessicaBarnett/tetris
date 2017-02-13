/**
 * Tetromino API
 * Creates a clearer interface for getting at all the functions
 * that act on Tetrominos.
 */
define(function(require) {

    var generator = require('tetromino/tetromino_generator'),

        movement = require('tetromino/tetromino_movement'),

        collisions = require('tetromino/tetromino_collision');

    return _.assign({}, collisions, movement, generator);
});
