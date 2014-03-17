var C = require('./constants').Constants;

exports.scenes = function(Q) {

//  Q.scene("opening", function(stage) {
//      var player = stage.insert(new Q.Player(0, 0));
//  });

    Q.scene("commons", function(stage) {
        stage.width = 1288;
        stage.height = 232;
        stage.add("viewport");

        // bg
        var bg = new Q.Sprite({
            x: 0,
            y: stage.height / 2,
            h: stage.height,
            w: stage.width,
            asset: 'commons-scene.png',
            type: 0 // !!important! You MUST specify Sprite type
        });


        var actionButton = new Q.UI.Button({
            x: 0,
            y: 100,
            hidden: true
        }, function() {
            Q.npcNearby.click();
        });
        stage.actionButton = actionButton;

        // back wall
        var back_wall = new Q.Sprite({
            x: 0,
            y: 32,
            h: 1,
            w: stage.width,
            type: C.SPRITE_BLOCKER
        });

        // front wall
        var front_wall = new Q.Sprite({
            x: 0,
            y: 200,
            h: 1,
            w: stage.width,
            type: C.SPRITE_BLOCKER
        });

        // entrance left
        var entrance = new Q.Sprite({
            x: -stage.width / 2 + 112 / 2 + 24,
            y: stage.height / 2,
            z: stage.height,
            w: 112,
            h: 232,
            asset: "wall-entrance.png",
            type: 0
        });

        Q.animations('terminal', { flicker: { frames: [0,1,2,3,4], rate: 1/5}});
        var terminal = new Q.NPC({ 
            name:"Chell",
            sprite:"terminal",
            sheet:"terminal",
            x:stage.width/2 - 104,
            y:124,
            z:124,
            action:"login" 
        });
        terminal.add("animation");
        terminal.play("flicker");

          Q.animations('boy', { 
              squirm: { frames: [0,1,2,3],loop:false, rate: 1},
              squirmBack: { frames: [3,2,1,0],loop:false, rate: 1}
          });

          var boy = new Q.NPC({ 
              name:"Boy",
              sprite:"boy",
              sheet:"boy",
              x:-50,
              y:116,
              z:116,
              action:"talk to the boy" 
          });

          boy.add("animation");
          boy.play("squirm");
          boy.step = function(dt) {
              if ((Q.stage().time |0) % 10 == 0) {
                  if (boy.p.frame == 0) {
                      boy.play("squirm") 
                  } else if (boy.p.frame == 3) {
                      boy.play("squirmBack");
                  }
              }
          };


        var player = new Q.Player(0, 116);
        var oldman = new Q.NPC({ name:"OldMan",x:-150,y:100,z:100,asset:"oldman-chair.png",action:"nudge old man" }); 
        var portal_left = new Q.Portal(-stage.width / 2, "kitchen");

        stage.insert(portal_left);
        stage.insert(bg);
        stage.insert(back_wall);
        stage.insert(front_wall);
        stage.insert(terminal);
        stage.insert(boy);
        stage.insert(oldman);
        stage.insert(player);
        stage.insert(entrance);
        stage.insert(actionButton);
    }, {sort: true});

     Q.scene("kitchen", function(stage) {
          stage.width = 700;
          stage.height = 232;
          stage.add("viewport");

          var actionButton = new Q.UI.Button({
              asset: 'action.png',
              x: 0,
              y: 100,
              hidden: true
          }, function() {
              Q.npcNearby.click();
          });
          stage.actionButton = actionButton;
  
          // bg
          var bg = new Q.Sprite({
              x: 0,
              y: stage.height / 2, 
              z: 0,
              h: stage.height,
              w: stage.width,
              asset: 'kitchen-scene.png',
              type: 0 // !!important! You MUST specify Sprite type
          });
  
          // back wall
          var back_wall = new Q.Sprite({
              x: 0,
              y: 32,
              h: 1,
              w: stage.width,
              type: C.SPRITE_BLOCKER
          });
  
          // front wall
          var front_wall = new Q.Sprite({
              x: 0,
              y: 200,
              h: 1,
              w: stage.width,
              type: C.SPRITE_BLOCKER
          });
  
          // entrance right
          var entrance_left = new Q.Sprite({
              x: stage.width / 2 - 112 / 2,
              y: stage.height / 2,
              z: stage.height,
              w: 112,
              h: 232, 
              asset: "wall-entrance.png",
              type: 0
          });
  
          // entrance left
          var entrance_right = new Q.Sprite({
              x: -stage.width / 2 + 112 / 2,
              y: stage.height / 2,
              z: stage.height,
              w: 112,
              h: 232, 
              asset: "wall-entrance-flip.png",
              type: 0
          });


          Q.animations('man', { 
              drink: { frames: [0,1,2,3,3,3,2,1,0],loop:false, rate: 1/5},
              handSlide: { frames: [4,5,6,7,6,5,4],loop:false, rate: 1/3}
          });

          var man = new Q.NPC({ 
              name:"Man",
              sprite:"man",
              sheet:"man",
              x:-180,
              y:100,
              z:100,
              action:"talk to coffee-token" 
          });
          man.add("animation");
          man.play("handSlide");
          man.step = function(dt) {
              if ((Q.stage().time |0) % 5 == 0 && (man.p.frame == 0 || man.p.frame == 4)) {
                  (Math.round(Math.random()) == 1) ? man.play("drink") : man.play("handSlide");
              }
          };


          var player = new Q.Player(stage.width/2, 116);
          var portal_left = new Q.Portal(-stage.width / 2, "pods");
          var portal_right = new Q.Portal(stage.width / 2, "commons");

          stage.insert(portal_left);
          stage.insert(portal_right);
          stage.insert(bg);
          stage.insert(back_wall);
          stage.insert(front_wall);
          stage.insert(man);
          stage.insert(player);
          stage.insert(entrance_left);
          stage.insert(entrance_right);
          stage.insert(actionButton);
     }, {sort: true} );
 

    Q.scene("pods", function(stage) {
          stage.width = 1840;
          stage.height = 232;
          stage.add("viewport");

          var actionButton = new Q.UI.Button({
              asset: 'action.png',
              x: 0,
              y: 100,
              hidden: true
          }, function() {
              Q.npcNearby.click();
          });
          stage.actionButton = actionButton;
  
          // bg
          var bg = new Q.Sprite({
              x: 0,
              y: stage.height / 2, 
              z: 0,
              h: stage.height,
              w: stage.width,
              asset: 'sleeping-scene.png',
              type: 0 // !!important! You MUST specify Sprite type
          });
  
          // back wall
          var back_wall = new Q.Sprite({
              x: 0,
              y: 32,
              h: 1,
              w: stage.width,
              type: C.SPRITE_BLOCKER
          });
  
          // front wall
          var front_wall = new Q.Sprite({
              x: 0,
              y: 200,
              h: 1,
              w: stage.width,
              type: C.SPRITE_BLOCKER
          });
  
          // entrance right
          var entrance_right = new Q.Sprite({
              x: stage.width / 2 - 112 / 2,
              y: stage.height / 2,
              z: stage.height,
              w: 112,
              h: 232, 
              asset: "wall-entrance.png",
              type: 0
          });
  
          // entrance left
          var entrance_left = new Q.Sprite({
              x: -stage.width / 2 + 112 / 2 + 32,
              y: stage.height / 2,
              z: stage.height,
              w: 112,
              h: 232, 
              asset: "wall-entrance.png",
              type: 0
          });

          var player = new Q.Player(stage.width/2, 116);
          var portal_left = new Q.Portal(-stage.width / 2, "closet");
          var portal_right = new Q.Portal(stage.width / 2, "kitchen");

          stage.insert(portal_left);
          stage.insert(portal_right);
          stage.insert(actionButton);
          stage.insert(bg);
          stage.insert(back_wall);
          stage.insert(front_wall);
          stage.insert(player);
          stage.insert(entrance_left);
          stage.insert(entrance_right);

    }, {sort: true});

    Q.scene("closet", function(stage) {
          stage.width = 700;
          stage.height = 232;
          stage.add("viewport");

          var actionButton = new Q.UI.Button({
              asset: 'action.png',
              x: 0,
              y: 100,
              hidden: true
          }, function() {
              Q.npcNearby.click();
          });
          stage.actionButton = actionButton;
  
          // bg
          var bg = new Q.Sprite({
              x: 0,
              y: stage.height / 2, 
              z: 0,
              h: stage.height,
              w: stage.width,
              asset: 'closet-scene.png',
              type: 0 // !!important! You MUST specify Sprite type
          });
  
          // back wall
          var back_wall = new Q.Sprite({
              x: 0,
              y: 32,
              h: 1,
              w: stage.width,
              type: C.SPRITE_BLOCKER
          });
  
          // front wall
          var front_wall = new Q.Sprite({
              x: 0,
              y: 200,
              h: 1,
              w: stage.width,
              type: C.SPRITE_BLOCKER
          });
  
          // entrance right
          var entrance_right = new Q.Sprite({
              x: stage.width / 2 - 112 / 2,
              y: stage.height / 2,
              z: stage.height,
              w: 112,
              h: 232, 
              asset: "wall-entrance.png",
              type: 0
          });
  

          var player = new Q.Player(stage.width/2, 116);
          var portal_right = new Q.Portal(stage.width / 2, "pods");
          var portal_left = new Q.Portal(-stage.width / 2, "outside"); 

          stage.insert(portal_left);
          stage.insert(portal_right);
          stage.insert(actionButton);
          stage.insert(bg);
          stage.insert(back_wall);
          stage.insert(front_wall);
          stage.insert(player);
          stage.insert(entrance_right);

    }, {sort: true});

    Q.scene("terminal", function(stage) {
          stage.width = 700;
          stage.height = 232;
          stage.add("viewport");

          var actionButton = new Q.UI.Button({
              asset: 'action.png',
              x: 0,
              y: 100,
              hidden: true
          }, function() {
              Q.npcNearby.click();
          });
          stage.actionButton = actionButton;

          // bg
          Q.Sprite.extend("Terminal", {
             init: function() {
                this._super({
                      x: stage.width / 2,
                      y: stage.height / 2, 
                      z: 0,
                      h: stage.height,
                      w: stage.width,
                      sheet: 'terminal-scene',
                      sprite: 'terminal-scene',
                      frame: 0,
                      type: 0 // !!important! You MUST specify Sprite type
                });
                this.add("animation"); 
              },
              step: function(dt) {this.play("flicker");}
          });

          var portal_right = new Q.Portal(stage.width / 2, "pods");
          //var portal_left = new Q.Portal(-stage.width / 2, "commons", player); NEEDS TO LEAD TOP OF SHIP

          //stage.insert(portal_left);
          stage.insert(portal_right);
          stage.insert(new Q.Terminal());
          stage.insert(actionButton);
    }, {sort: true});

    Q.scene("outside", function(stage) {
          stage.width = 700;
          stage.height = 232;
          stage.add("viewport");

          var actionButton = new Q.UI.Button({
              asset: 'action.png',
              x: 0,
              y: 100,
              hidden: true
          }, function() {
              Q.npcNearby.click();
          });
          stage.actionButton = actionButton;
  

          // bg
          var bg = new Q.Sprite({
            x: 0,
            y: stage.height / 2,
            z: 0,
            h: stage.height,
            w: stage.width,
            asset: 'outside-scene.png',
            type: 0 // !!important! You MUST specify Sprite type
          });
  
          // back wall
          var back_wall = new Q.Sprite({
              x: 0,
              y: 60,
              h: 1,
              w: stage.width,
              type: C.SPRITE_BLOCKER
          });
  
          // front wall
          var front_wall = new Q.Sprite({
              x: 240,
              y: 125,
              h: 1,
              w: stage.width,
              type: C.SPRITE_BLOCKER
          });

          var player = new Q.Player(stage.width/2, 87, .5);
          var burner1 = new Q.Burner(111, 224, 1);
          var burner2 = new Q.Burner(183, 224, 3);
          var burner3 = new Q.Burner(255, 224, 5);
          var burner4 = new Q.Burner(327, 224, 6);
          player.p.xspeed /= 2;
          player.p.yspeed /= 2;
          var portal_right = new Q.Portal(stage.width / 2, "closet");
          //var portal_left = new Q.Portal(-stage.width / 2, "commons", player); NEEDS TO LEAD TOP OF SHIP

          //stage.insert(portal_left);
          stage.insert(portal_right);
          stage.insert(actionButton);
          stage.insert(bg);
          stage.insert(back_wall);
          stage.insert(front_wall);
          stage.insert(player);
          stage.insert(burner1);
          stage.insert(burner2);
          stage.insert(burner3);
          stage.insert(burner4);

    }, {sort: true});

 
//  Q.scene("pod", function(stage) {
//      var player = stage.insert(new Q.Player(0, 0));
//  });

//  Q.scene("kitchen", function(stage) {
//      var player = stage.insert(new Q.Player(0, 0));
//  });

//  Q.scene("closet", function(stage) {
//      var player = stage.insert(new Q.Player(0, 0));
//  });

//  Q.scene("closing", function(stage) {
//      var player = stage.insert(new Q.Player(0, 0));
//  });

};
