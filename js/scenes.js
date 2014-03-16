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

        var player = new Q.Player(0, 116);
        var boy = new Q.NPC("Boy", -50, 116, "boy.png", "talk to the boy"); 
        var oldman = new Q.NPC("OldMan", -150, 100, "oldman-chair.png", "nudge old man"); 
        var terminal = new Q.NPC("Chell", stage.width/2 - 104, 124,"terminal0.png", "login");
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

          var player = new Q.Player(stage.width/2, 116);
          var man = new Q.NPC("Man", -180, 100, "man.png", "talk to coffee-token"); 
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
          var bg = new Q.Sprite({
              x: stage.width / 2,
              y: stage.height / 2, 
              z: 0,
              h: stage.height,
              w: stage.width,
              asset: 'terminal-scene.png',
              type: 0 // !!important! You MUST specify Sprite type
          });
            
          var portal_right = new Q.Portal(stage.width / 2, "pods");
          //var portal_left = new Q.Portal(-stage.width / 2, "commons", player); NEEDS TO LEAD TOP OF SHIP

          //stage.insert(portal_left);
          stage.insert(portal_right);
          stage.insert(bg);
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
