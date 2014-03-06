var C = require('./constants').Constants;

exports.Player = function(Q) {
    var Vision = function(range) {
        var Vision = {
            p: {
                x: 0,
                y: 0,
                cx: range/2,
                cy: C.PLAYER_HEIGHT/2,
                w: range,
                h: C.PLAYER_HEIGHT,
                collisionMask: C.SPRITE_NPC
            },
           // grid: {}
        };
        Vision.set = function(x, y) {
                this.p.x = x;
                this.p.y = y;
        };
        return Vision;
    };

    Q.Sprite.extend("Player", {
        init: function(x, y) {
            this._super({
                x: x,
                y: y,
                z: C.SPRITE_PLAYER,
                asset: "player.png", // placeholder
                speed: 100,
                type: C.SPRITE_PLAYER,
                collisionMask: C.SPRITE_BLOCKER
            });

            this.frontVision = new Vision(50);
            this.backVision = new Vision(20);

            // setup view range sprites
            this.add("2d, isometricControls");
       },
       step: function(dt) {

           if (this.p.direction == 'left') {
               this.p.flip = 'x';
               this.frontVision.set(this.p.x - this.p.cx, this.p.y);
               this.backVision.set(this.p.x + this.p.cx, this.p.y);
           }
           else {
               this.p.flip = '';
               this.frontVision.set(this.p.x + this.p.cx, this.p.y);
               this.backVision.set(this.p.x - this.p.cx, this.p.y);
           }

           var nearby = this.stage.search(this.frontVision);
           nearby = nearby || this.stage.search(this.backVision);

           Q.npcNearby = null;

           if(nearby) {
              this.stage.actionButton.set({
                  x: nearby.obj.p.x,
                  y: nearby.obj.p.y - nearby.obj.p.cy - 40,
                  hidden: false
              });
              if (nearby.obj.p.type == C.SPRITE_NPC) {
                  Q.npcNearby = nearby.obj.p.name;
              }
           }

           else {
               this.stage.actionButton.hide();
           }


       }
     });
};
