var C = require('./constants').Constants,
    dialogs = require('./dialogs').dialogs,
    Isometric = require('./isometric').Isometric,
    Player = require('./player').Player;

var Q = Quintus({imagePath: "assets/"})
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
    .include([Isometric, Player])
    .setup('gameCanvas', {height: 350, width: 700})
    .controls(true)
    .touch();

Q.gravityY = 0;
Q.gravityX = 0;

Q.Sprite.extend("NPC", {
    init: function(x, y) {
        this._super({
            x: x,
            y: y,
            z: C.SPRITE_NPC,
            type: C.SPRITE_NPC,
            collisionMask: C.SPRITE_BLOCKER || C.SPRITE_VIEWRANGE,
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

Q.scene("testlevel", function(stage) {
    stage.insert(new Q.NPC(60, 260));
    var player = stage.insert(new Q.Player(0, 260));

    window.stage = stage;

    var actionButton = new Q.UI.Button({
        asset: 'action.png',
        x: 0,
        y: 100,
        hidden: true
    }, function() {
        dialogs.emit(Q.npcNearby+"-click");
    });

    stage.actionButton = actionButton;

    stage.insert(actionButton);

    stage.add("viewport").follow(player, {x: true, y: false});
});



Q.load(['player.png', 'npc.png', 'action.png'], function() {
    // Q.compileSheets("player.png", "player.json");

    Q.stageScene("testlevel");



});
