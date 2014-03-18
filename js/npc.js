var C = require('./constants').Constants,
    dialogs = require('./dialogs').dialogs;

exports.NPC = function(Q) {
    Q.Sprite.extend("NPC", {
        init: function(p) {
            this._super(p, {
                type: C.SPRITE_NP,
                collisionMask: C.SPRITE_BLOCKER,
            });
            this.add("animation");
        },
        click: function() {
            Q.actionUI.content = "";
            dialogs.emit(this.p.name + '-click');
        }
    });
};
