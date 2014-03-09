var C = require('./constants').Constants,
    dialogs = require('./dialogs').dialogs,
    Isometric = require('./isometric').Isometric,
    Player = require('./player').Player,
    NPC = require('./npc').NPC,
    Portal = require('./portal').Portal,
    scenes = require('./scenes').scenes;

var Q = Quintus({ development: true, imagePath: "assets/"})
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
    .include([Isometric, Player, NPC, Portal, scenes])
    .setup('gameCanvas')
    .controls(true)
    .touch();

window.Q = Q;

//When uncommented wierd artifacts appear in animation
//Q.ctx.imageSmoothingEnabled = false;
//Q.ctx.webkitImageSmoothingEnabled = false;
//Q.ctx.mozImageSmoothingEnabled = false;

Q.gravityY = 0;
Q.gravityX = 0;


Q.input.on("action", function() {
    if(Q.npcNearby) {
        Q.npcNearby.click();
    }
});

Q.load(['player.png', 'commons-scene.png', 'wall-entrance.png','wall-entrance-flip.png', 'npc.png', 'action.png', 'ladder.png',
        'kitchen-scene.png' ], function() {
    //extend to include all sprites
    //Q.compileSheets("player.png", "player.json");
    Q.sheet("player",
        "player.png",
        {
            tilew: 64,
            tileh: 128,
            w: 192,
            h: 128
        });

    Q.stageScene("commons");
});
