var C = require('./constants').Constants,
    dialogs = require('./dialogs').dialogs;

exports.NPC = function(Q) {
    Q.Sprite.extend("NPC", {
        init: function(name, x, y, asset, action) {
            this._super({
                x: x,
                y: y,
                z: y, //y + height
                type: C.SPRITE_NP,
                collisionMask: C.SPRITE_BLOCKER,
                asset: asset,
                name: name,
                action: action //"login" or "chat with Joe"
            });
        },
        click: function() {
            Q.actionUI.content = "";
            dialogs.emit(this.p.name + '-click');
        }
    });
};
