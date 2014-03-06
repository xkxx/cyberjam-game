exports.Isometric = function(Q) {
    var IsometricControls = {
        // default properties to add onto our entity
        defaults: { xspeed: 300, yspeed: 200, collsions: [], direction: 'right'},

        // called when the component is added to
        // an entity
        added: function() {
            var p = this.entity.p;

            // add in our default properties
            Q._defaults(p,this.defaults);

            // every time our entity steps
            // call our step method
            this.entity.on("step",this,"step");
        },

        step: function(dt) {
            // grab the entity's properties
            // for easy reference
            var p = this.entity.p;

            var collision = null;

            // Follow along the current slope, if possible.
            if(p.collisions !== undefined && p.collisions.length > 0 && (Q.inputs['left'] || Q.inputs['right'])) {
              if(p.collisions.length === 1) {
                collision = p.collisions[0];
              } else {
                // If there's more than one possible slope, follow slope with negative Y normal
                collision = null;

                for(var i = 0; i < p.collisions.length; i++) {
                  if(p.collisions[i].normalY < 0) {
                    collision = p.collisions[i];
                  }
                }
              }
            }

            p.direction = Q.inputs['left']  ? 'left' :
                          Q.inputs['right'] ? 'right' :  p.direction;

            if(Q.inputs['left']) {
                  if(collision) {
                    p.vx = p.xspeed * collision.normalY;
                  } else {
                    p.vx = -p.xspeed;
                  }
            } else if(Q.inputs['right']) {
              if(collision) {
                p.vx = -p.xspeed * collision.normalY;
              } else {
                p.vx = p.xspeed;
              }
            } else {
                p.vx = 0;
            }
            if (Q.inputs['up']) {
                 if(collision) {
                     p.vy = p.yspeed * collision.normalY;
                 } else {
                     p.vy = -p.yspeed;
                 }

            } else if (Q.inputs['down']) {
                 if(collision) {
                     p.vy = -p.yspeed * collision.normalY;
                 } else {
                     p.vy = p.yspeed;
                 }

            } else {
              p.vy = 0;
            }
        }
    };

    Q.component('isometricControls', IsometricControls);
};
