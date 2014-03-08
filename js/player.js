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
                collisionMask: C.SPRITE_NP
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
        walk: { frames: [0,1,2], rate: 1/5},
        stand: { frames: [0] }
    });

    Q.Sprite.extend("Player", {
        init: function(x, y) {
            this._super({
                x: x,
                y: y,
                scale: C.PLAYER_SCALE,
                z: y,
                sheet: "player",
                sprite: "player",
                speed: 1000,
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

           this.p.z = this.p.y;

           if (this.p.direction == 'left') {
               this.frontVision.set(this.p.x - this.p.cx, this.p.y);
               this.backVision.set(this.p.x + this.p.cx, this.p.y);
           }
           else {
               this.frontVision.set(this.p.x + this.p.cx, this.p.y);
               this.backVision.set(this.p.x - this.p.cx, this.p.y);
           }

           if (this.p.vx < 0) {
               this.p.flip = "x";
           } else if (this.p.vx > 0) {
               this.p.flip = "";
           } 

           if (this.p.vx != 0 || this.p.vy != 0) {
               this.play("walk");
           } else {
               this.play("stand");
           }


           var nearby = this.stage.search(this.frontVision);
           nearby = nearby || this.stage.search(this.backVision);

           if(nearby) {
              this.stage.actionButton.set({
                  x: nearby.obj.p.x,
                  y: nearby.obj.p.y - nearby.obj.p.cy - 40,
                  hidden: false
              });
              Q.npcNearby = nearby.obj;
           }

           else {
               this.stage.actionButton.hide();
           }
       }
     });
};
