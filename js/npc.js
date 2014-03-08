var C = require('./constants').Constants,
    dialogs = require('./dialogs').dialogs;

exports.NPC = function(Q) {
    Q.Sprite.extend("NPC", {
        init: function(name, x, y) {
            this._super({
                x: x,
                y: y,
                z: y,
                type: C.SPRITE_NP,
                collisionMask: C.SPRITE_BLOCKER,
                asset: "npc.png",
                name: name
            });
        },
        click: function() {
            dialogs.emit(this.p.name + '-click');
        }
    });
    
}