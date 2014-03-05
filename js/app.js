var C = require('./constants').Constants,
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
            collisionMask: C.SPRITE_BLOCKER,
            asset: "npc.png"
        });
    }

});

Q.scene("testlevel", function(stage){
    stage.insert(new Q.NPC(60, 260));
    var player = stage.insert(new Q.Player(0, 260));

    stage.add("viewport").follow(player, {x: true, y: false});
});

Q.load(['player.png', 'npc.png'], function() {
    // Q.compileSheets("player.png", "player.json");

    Q.stageScene("testlevel");



});
