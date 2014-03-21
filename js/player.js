var C = require('./constants').Constants;

exports.player = function() {

    Crafty.c('John', {
        init: function() { 
            this.requires('2D, Canvas, SpriteAnimation, Fourway, Collision, Player')
                .attr({x:64, y:100, z:10})
                .fourway(5)
                .onHit("Bounds", function(data) {
                    data = data[0];
                    console.log("HIT");
                    var dx = data.overlap * data.normal.x;
                    var dy = data.overlap * data.normal.y
                    this.shift(-dx, -dy);
                })
                .reel('walk', 1000/4, 0, 0, 3)
                .reel('stand', 1000, 0, 0, 1)
                .animate('stand', -1);

            this.bind('NewDirection', function(data) {
                //moving ..
                if (data.x == 0 && data.y == 0) {
                    this.animate('stand', -1);
                } else {
                    this.animate('walk', -1);
                }

                if (data.x > 0) {
                    this.unflip('X');
                } else if (data.x < 0) {
                    this.flip('X');
                }
            });
        }
    });

    //  var Vision = function(range) {
    //      var Vision = {
    //          p: {
    //              x: 0,
    //              y: 0,
    //              cx: range/2,
    //              cy: C.PLAYER_HEIGHT/2,
    //              w: range,
    //              h: C.PLAYER_HEIGHT,
    //              collisionMask: C.SPRITE_NP
    //          },
    //         // grid: {}
    //      };
    //      Vision.set = function(x, y) {
    //              this.p.x = x;
    //              this.p.y = y;
    //      };
    //      return Vision;
    //  };

    //  //PROBABLY SHOULD BE MOVED
    //  Q.animations('player', {
    //      walk: { frames: [0,1,2], rate: 1/5},
    //      stand: { frames: [0] }
    //  });

    //  Q.Sprite.extend("Player", {
    //      init: function(x, y, scale) {
    //          this._super({
    //              x: x,
    //              y: y,
    //              scale: (scale == undefined) ? C.PLAYER_SCALE : scale,
    //              z: y + C.PLAYER_HEIGHT,
    //              sheet: "player",
    //              sprite: "player",
    //              speed: 100,
    //              type: C.SPRITE_PLAYER,
    //              collisionMask: C.SPRITE_BLOCKER
    //          });

    //          this.frontVision = new Vision(50);
    //          this.backVision = new Vision(20);

    //          // setup view range sprites
    //          this.add("2d, isometricControls");
    //          this.add("animation");
    //     },
    //     step: function(dt) {
    //         
    //         if (Q.inDialogue) {
    //             this.p.vx = this.p.vy = 0;
    //             Q.stage().viewport.scale = 2;
    //         } else {
    //             Q.stage().viewport.scale = 1;
    //         }


    //         this.p.z = this.p.y + C.PLAYER_HEIGHT/2;

    //         if (this.p.direction == 'left') {
    //             this.frontVision.set(this.p.x - this.p.cx, this.p.y);
    //             this.backVision.set(this.p.x + this.p.cx, this.p.y);
    //         } else {
    //             this.frontVision.set(this.p.x + this.p.cx, this.p.y);
    //             this.backVision.set(this.p.x - this.p.cx, this.p.y);
    //         }

    //         if (this.p.vx < 0) {
    //             this.p.flip = "x";
    //         } else if (this.p.vx > 0) {
    //             this.p.flip = "";
    //         }

    //         if (this.p.vx != 0 || this.p.vy != 0) {
    //             this.play("walk");
    //         } else {
    //             this.play("stand");
    //         }

    //         var nearby = this.stage.search(this.frontVision);
    //         nearby = nearby || this.stage.search(this.backVision);

    //         if (nearby) {
    //             Q.npcNearby = nearby.obj;
    //             if (!Q.inDialogue) {
    //                Q.actionUI.content = Q.npcNearby.p.action;
    //             }
    //         } else {
    //            Q.npcNearby = null;
    //            Q.actionUI.content = "";
    //         }

    //         var x = Math.max( -this.stage.width / 2 + C.VIEW_WIDTH / 2, this.p.x);
    //         x = Math.min(this.stage.width / 2 - C.VIEW_WIDTH / 2, x);
    //         var y = Math.max(C.VIEW_HEIGHT / 2, this.p.y);
    //         y = Math.min(this.stage.height - C.VIEW_HEIGHT / 2, y);
    //         if (this.stage.viewport == undefined) {
    //              console.log("ERROR");
    //         }
    //         if (Q.inDialogue) {
    //             x = Q.npcNearby.p.x + (this.p.x - Q.npcNearby.p.x) / 2;
    //             y = Q.npcNearby.p.y + (this.p.y - Q.npcNearby.p.y ) / 2;
    //             x = Math.max(x, -this.stage.width / 2 + C.VIEW_WIDTH / 4);
    //             y -= 30;
    //             y = Math.max(y, C.VIEW_HEIGHT/4);
    //         }

    //         this.stage.viewport.centerOn(x,y);
    //     }
    //   });
};
