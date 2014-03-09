var C = require('./constants').Constants,
    dialogs = require('./dialogs').dialogs;

exports.Portal = function(Q) {
    Q.Sprite.extend("Portal", {
        init: function(x, dst) {
            this._super({
                x: x,
                y: C.VIEW_HEIGHT / 2,
                w: 20,
                h: C.VIEW_HEIGHT,
                type: C.SPRITE_BLOCKER
            });
            this.dst = dst;
            this.on("hit",this,"activate");
        },
        activate: function() {
            dialogs.emit("goto-"+dst);
        }

    });

};
