var C = require('./constants').Constants,
    dialogs = require('./dialogs').dialogs,
    Isometric = require('./isometric').Isometric,
    Player = require('./player').Player,
    scenes = require('./scenes').scenes;

var Q = Quintus({ development: true, imagePath: "assets/"})
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
    .include([Isometric, Player, scenes])
    .setup('gameCanvas', {height: 350, width: 700})
    .controls(true)
    .touch();

Q.ctx.imageSmoothingEnabled = false;
Q.ctx.webkitImageSmoothingEnabled = false;
Q.ctx.mozImageSmoothingEnabled = false;

Q.gravityY = 0;
Q.gravityX = 0;

Q.Sprite.extend("NPC", {
    init: function(x, y) {
        this._super({
            x: x,
            y: y,
            z: C.SPRITE_NPC,
            type: C.SPRITE_NPC,
            collisionMask: C.SPRITE_BLOCKER,
            asset: "npc.png",
            name: "Chell"
        });
    }

});

Q.input.on("action", function() {
    if(Q.npcNearby) {
        dialogs.emit(Q.npcNearby+"-click");
    }
});

Q.load(['player.png', 'npc.png', 'action.png', 'ladder.png'], function() {
    //extend to include all sprites
    //Q.compileSheets("player.png", "player.json");
    Q.sheet("player",
        "player.png",
        {
            tilew: 10,
            tileh: 17,
            w: 120,
            h:17
        });

    Q.stageScene("common-area");
});
