// Quintus is not commonjs compliant, so this is the
// most obj separation we can do
Quintus.Isometric = require('./isometric').Isometric;

var Q = Quintus({imagePath: "assets/"})
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, Isometric")
    .setup('gameCanvas', {height: 350, width: 700})
    .controls(true)
    .touch();

Q.gravityY = 0;
Q.gravityX = 0;

var SPRITE_VIEWRANGE = 1,
    SPRITE_PLAYER = 2,
    SPRITE_NPC = 4,
    SPRITE_BLOCKER = 8;

// constants

var player_height = 100;

var ViewRange = function(range) {
    var ViewRange = {
        p: {
            x: 0,
            y: 0,
            cx: 0,
            cy: 0,
            w: range,
            h: player_height
        },
        grid: {}
    };
    ViewRange.set = function(x, y) {
            this.p.x = x;
            this.p.y = y;
    };
    return ViewRange;
};

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

        this.frontViewRange = new ViewRange(50);
        this.backViewRange = new ViewRange(20);

        // setup view range sprites
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
