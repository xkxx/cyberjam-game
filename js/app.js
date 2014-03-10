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

//When uncommented wierd artifacts appear in animation
Q.ctx.imageSmoothingEnabled = false;
Q.ctx.webkitImageSmoothingEnabled = false;
Q.ctx.mozImageSmoothingEnabled = false;

Q.gravityY = 0;
Q.gravityX = 0;

Q.input.keyboardControls({
    LEFT: "left",
    RIGHT: "right",
    UP: "up",
    DOWN: "down",
    SPACE: "action",
    X: "action",
    ENTER: "action",
    ESC: "action"
});

//the overlay entrance the char walks beneath
Q.Sprite.extend("Entrance", {
    init: function(x, y) {
        this._super({
            x: x,
            y: y,
            z: y + 116, //y + height
            w: 112,
            h: 232,
            asset: "wall-entrance.png",
            name: "wall-entrance"
        });
    },
});

Q.input.on("action", function() {
    if(Q.npcNearby && !dialogs.currentDialog) {
        Q.npcNearby.click();
    } else if (dialogs.currentDialog) {
        dialogs.ui.kbSelect();
    }
});

Q.input.on('up', function() {dialogs.ui.kbUp();});
Q.input.on('down', function() {dialogs.ui.kbDown();});

Q.load(['player.png', 'commons-scene.png', 'wall-entrance.png','wall-entrance-flip.png', 'npc.png', 'action.png', 'ladder.png',
        'kitchen-scene.png', 'closet-scene.png', 'sleeping-scene.png', 'terminal-scene.png', 'terminal0.png', 'boy.png' ], function() {
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
//  Q.sheet("terminal",
//      "terminal.png",
//      {
//      });

    var kitchenScene = Q.stageScene("kitchen", 0);
    var commonsScene = Q.stageScene("commons", 1);
    var podsScene = Q.stageScene("pods", 2);
    var closetScene = Q.stageScene("closet", 3);
    var terminalScene = Q.stageScene("terminal", 4);
    var outsideScene = Q.stageScene("outside", 5);

    setTimeout(function(){
        kitchenScene.stop();
        podsScene.stop();
        closetScene.stop();
        terminalScene.stop();
        outsideScene.stop();
        Q.activeStage = 5;
        Q.stage().start();
    }, 100);

});

exports.Q = Q;
