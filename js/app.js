var Q = Quintus()
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, Audio")
    .setup('gameCanvas')
    .controls(true)
    .touch();

Q.Sprite.extend("Player", {
   init: function() {
     this.add("2d, platformerControls");
   }
 });
