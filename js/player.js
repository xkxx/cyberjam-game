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
      
    //PROBABLY SHOULD BE MOVED
    Q.animations('player', {
        walk_left: { frames: [0,1,2], rate: 1/5},
        walk_right: { frames: [0,1,2], rate: 1/5},
        stand_right: { frames: [0] },
        stand_left: { frames: [0] }
    });

    Q.Sprite.extend("Player", {
        init: function(x, y) {
            this._super({
                x: x,
                y: y,
                scale: C.PLAYER_SCALE,
                z: C.SPRITE_PLAYER,
                sheet: "player",
                sprite: "player",
                speed: 100,
                type: C.SPRITE_PLAYER,
                collisionMask: C.SPRITE_BLOCKER
            });

            this.frontVision = new Vision(50);
            this.backVision = new Vision(20);

            // setup view range sprites
            this.add("2d, isometricControls");
            this.add("animation");
       },
       step: function(dt) {

           if (this.p.direction == 'left') {
               this.frontVision.set(this.p.x - this.p.cx, this.p.y);
               this.backVision.set(this.p.x + this.p.cx, this.p.y);
           }
           else {
               this.frontVision.set(this.p.x + this.p.cx, this.p.y);
               this.backVision.set(this.p.x - this.p.cx, this.p.y);
           }
           this.play("walk_right");

//         if (this.p.vx > 0) {
//             this.play("walk_right");
//         } else if (this.p.vx < 0) {
//             this.play("walk_left");
//         } else {
//              this.play("stand_" + this.p.direction > 0 ? "right" : "left");
//         }


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