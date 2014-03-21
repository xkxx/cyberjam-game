var C = require('./constants').Constants;

// example component
// ^^^^^^^^^^^^^^^^^
// components generally have a method that matches their name
// this method serves as a way to initialize their state
// ex. the fourway component requires the .fourway method to
//     be called with an initial speed
// 
// Crafty.c('name', function() {
//       init: function() {
//           this.requires("component1, ... , componentN")
//               .componen1(...)
//               .componenN(...);
//       }
//       methods: ...
// });

exports.components = function() {

    Crafty.c('NPC', { 
        init: function() {
            this.requires('2D, Canvas' /* add component for interaction */);
        }
    });

    Crafty.c('Player', {
        init: function() {
            this.requires('2D, Canvas, Sprite, Fourway, Collision')
                .fourway(1);

        }),
        player: 
        function(p) {

        }
    }

//              x: x,
//              y: y,
//              scale: (scale == undefined) ? C.PLAYER_SCALE : scale,
//              z: y + C.PLAYER_HEIGHT,
//              sheet: "player",
//              sprite: "player",
//              speed: 100,
//              type: C.SPRITE_PLAYER,
//              collisionMask: C.SPRITE_BLOCKER

//  Crafty.sprite(24, 16, "assets/bottom-burner-sheet.png", { BottomBurner: [0,0] });
//  for (var i = 0; i < 7; i++) {
//      Crafty.e("2D, Canvas, SpriteAnimation, BottomBurner").reel('Burning', 1000/2, 0, 0, 4)
//          .animate('Burning', -1)
//          .attr({x:-12 + 18 * 4 * i, y:152, z:1});
//  }
}
