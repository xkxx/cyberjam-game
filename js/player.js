var C = require('./constants').Constants;

exports.Player = function(Q) {
    var ViewRange = function(range) {
        var ViewRange = {
            p: {
                x: 0,
                y: 0,
                cx: C.PLAYER_WIDTH/2,
                cy: C.PLAYER_HEIGHT/2,
                w: range,
                h: C.PLAYER_HEIGHT,
                type: C.SPRITE_VIEWRANGE,
                collisionMask: C.SPRITE_NPC
            },
           // grid: {}
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
                z: C.SPRITE_PLAYER,
                asset: "player.png", // placeholder
                speed: 100,
                type: C.SPRITE_PLAYER,
                collisionMask: C.SPRITE_BLOCKER
            });

            this.frontViewRange = new ViewRange(50);
            this.backViewRange = new ViewRange(20); // FIXME: should by dynamic

            // setup view range sprites
            this.add("2d, isometricControls");
       },
       step: function(dt) {

           this.frontViewRange.set(this.p.x + this.p.cx, this.p.y);
           this.backViewRange.set(this.p.x - this.p.cx, this.p.y);

           var npc = this.stage.search(this.frontViewRange);
           npc = npc || this.stage.search(this.backViewRange);

           if(npc) {
              this.stage.actionButton.set({
                  x: npc.obj.p.x,
                  y: npc.obj.p.y - 80, // FIXME: hardcoded
                  hidden: false
              });
              Q.npcNearby = npc.obj.p.name;
           }

           else {
               this.stage.actionButton.hide();
               Q.npcNearby = null;
           }


       }
     });
};
