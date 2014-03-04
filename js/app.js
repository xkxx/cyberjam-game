require('./isometric');

var Q = Quintus({imagePath: "assets/"})
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, Isometric")
    .setup('gameCanvas', {height: 350, width: 700})
    .controls(true)
    .touch();

Q.gravityY = 0;
Q.gravityX = 0;

var SPRITE_PLAYER = 1,
    SPRITE_NPC = 2,
    SPRITE_BLOCKER = 4;



Q.Sprite.extend("Player", {
    init: function(x, y) {
        this._super({
            x: x,
            y: y,
            z: SPRITE_PLAYER,
            asset: "player.png", // placeholder
            speed: 100,
            type: SPRITE_PLAYER,
            collisionMask: SPRITE_BLOCKER
        });
        this.add("2d, isometricControls");
   }
 });

Q.Sprite.extend("NPC", {
    init: function(x, y) {
        this._super({
            x: x,
            y: y,
            z: SPRITE_NPC,
            type: SPRITE_NPC,
            collisionMask: SPRITE_BLOCKER,
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
