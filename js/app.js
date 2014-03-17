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

Q.actionUI = new Vue({
        el: "#action-ui",
        data: {
            content: "",
            showAction: true,
        }
});

Q.input.keyboardControls({
    LEFT: "left",
    RIGHT: "right",
    UP: "up",
    DOWN: "down",
    SPACE: "action",
    X: "action",
    ENTER: "action",
    ESC: "leave"
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

Q.animations('terminal-scene', {
    flicker: { frames: [0,1], rate: 1/5}
});

Q.animations('burner', {
    burn: { frames: [0,1,2,3,4,5], rate: 1/7}
});

Q.Sprite.extend("Burner",  {
    init: function(x, y, frameStart) {
        this._super({
            x: x,
            y: y,
            z: y,
            sheet: "burner",
            sprite: "burner",
            frame: frameStart,
            type:0
        });
        this.add("animation");
    },
    step: function(dt) { this.play("burn"); }
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
Q.input.on('leave', function() {dialogs.emit('leave');});

Q.load(['player.png','man-sheet.png','oldman-chair.png', 'commons-scene.png', 'wall-entrance.png','wall-entrance-flip.png', 'npc.png', 'action.png', 'ladder.png', 'kitchen-scene.png', 'closet-scene.png', 'outside-scene.png', 'burner-sheet.png', 'sleeping-scene.png', 'terminal-scene.png', 'terminal-sheet.png', 'boy-sheet.png' ], function() {

    Q.sheet("player",
        "player.png",
        {
            tilew: 64,
            tileh: 128,
            w: 192,
            h: 128
        });
    Q.sheet("boy",
        "boy-sheet.png",
        {
            tilew: 40,
            tileh: 80,
            w: 160,
            h: 80
        });

    Q.sheet("man",
        "man-sheet.png",
        {
            tilew: 48,
            tileh: 136,
            w: 384,
            h: 136
        });


    Q.sheet("terminal-scene",
        "terminal-scene.png",
        {
            tilew: 700,
            tileh: 232,
            w: 1400,
            h: 232
        });

    Q.sheet("terminal",
        "terminal-sheet.png",
        {
            tilew: 96,
            tileh: 144,
            w: 480,
            h: 144
        });

    Q.sheet("burner",
        "burner-sheet.png",
        {
            tilew: 20,
            tileh: 28,
            w: 120,
            h: 28
        });

    Q.activeStage = 5;
    var commonsScene = Q.stageScene("commons", 5);  
    var terminalScene = Q.stageScene("terminal", 4);
    var kitchenScene = Q.stageScene("kitchen", 3);
    var podsScene = Q.stageScene("pods", 2);
    var closetScene = Q.stageScene("closet", 1);
    var outsideScene = Q.stageScene("outside", 0);

    setTimeout(function(){
        kitchenScene.stop();
        podsScene.stop();
        closetScene.stop();
        terminalScene.stop();
        outsideScene.stop();
        dialogs.emit('day1-start');
    }, 100);


    //Q.day(1).day(2).day(3).day(4);

});

//Q.day = function(day) {
//    //stage all day scenes
//    //display load stage
//    //set timeout
//    //
//    //var scenes = Q.days[day] //scenes is an array
//    //for (var i = 0; i < scenes.length; i++) {
//    //   Q.stageScene(scenes[i], i);
//    //}
//    //
//}

window.Q = Q;
exports.Q = Q;
