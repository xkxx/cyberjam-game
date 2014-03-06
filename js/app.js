var C = require('./constants').Constants,
    dialogs = require('./dialogs').dialogs,
    Isometric = require('./isometric').Isometric,
    Player = require('./player').Player,
    scenes = require('./scenes').scenes;

var Q = Quintus({ development: true, imagePath: "assets/"})
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
    .include([Isometric, Player, scenes])
    .setup('gameCanvas', {height: 200, width: 400})
    .controls(true)
    .touch();

//When uncommented wierd artifacts appear in animation
//Q.ctx.imageSmoothingEnabled = false;
//Q.ctx.webkitImageSmoothingEnabled = false;
//Q.ctx.mozImageSmoothingEnabled = false;

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
            tilew: 28,
            tileh: 64,
            w: 336,
            h:64
        });

    Q.stageScene("common-area");
});
