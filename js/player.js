var C = require('./constants').Constants;

exports.Player = function(Q) {
    var ViewRange = function(range) {
        var ViewRange = {
            p: {
                x: 0,
                y: 0,
                cx: 0,
                cy: 0,
                w: range,
                h: C.PLAYER_HEIGHT
            },
            grid: {}
        };
        ViewRange.set = function(x, y) {
                this.p.x = x;
                this.p.y = y;
        };
        return ViewRange;
    };

    Q.Sprite.extend("Player", {
        init: function(x, y) {
            this._super({
                x: x,
                y: y,
                z: C.SPRITE_PLAYER,
                asset: "player.png", // placeholder
                speed: 100,
                type: C.SPRITE_PLAYER,
                collisionMask: C.SPRITE_BLOCKER
            });

            this.frontViewRange = new ViewRange(50);
            this.backViewRange = new ViewRange(20);

            // setup view range sprites
            this.add("2d, isometricControls");
       }
     });
};
