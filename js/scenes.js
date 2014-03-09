var C = require('./constants').Constants;

exports.scenes = function(Q) {

//  Q.scene("opening", function(stage) {
//      var player = stage.insert(new Q.Player(0, 0));
//  });

    Q.scene("commons", function(stage) {
        stage.width = 1832;
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
            asset: 'action.png',
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
        var boy = new Q.NPC("Boy", -50, 116, "boy.png"); 
        var terminal = new Q.NPC("Chell", stage.width/2 - 112, 116,"terminal0.png");
        var portal_left = new Q.Portal(-stage.width / 2, "kitchen");

        stage.insert(portal_left);
        stage.insert(bg);
        stage.insert(back_wall);
        stage.insert(front_wall);
        stage.insert(terminal);
        stage.insert(boy);
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

          var portal_left = new Q.Portal(-stage.width / 2, "pods");
          var portal_right = new Q.Portal(stage.width / 2, "commons");
          var player = new Q.Player(stage.width/2, 116);

          stage.insert(portal_left);
          stage.insert(portal_right);
          stage.insert(actionButton);
          stage.insert(bg);
          stage.insert(back_wall);
          stage.insert(front_wall);
          stage.insert(player);
          stage.insert(entrance_left);
          stage.insert(entrance_right);
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
              asset: "wall-entrance.png",
              type: 0
          });

          var portal_left = new Q.Portal(-stage.width / 2, "commons");
          var portal_right = new Q.Portal(stage.width / 2, "kitchen");
          var player = new Q.Player(stage.width/2, 116);

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
