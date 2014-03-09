var C = require('./constants').Constants;

exports.scenes = function(Q) {
//  Scene prototype
//  Q.scene("commons", function(stage) {
//      stage.width = 1832;
//      stage.height = 232;
//      stage.add("viewport");

//      // bg
//      var bg = new Q.Sprite({
//          x: 0,
//          y: stage.width / 2,
//          h: stage.height,
//          w: stage.width,
//          asset: 'commons-scene.png',
//          type: 0 // !!important! You MUST specify Sprite type
//      );

//      // back wall
//      var back_wall = new Q.Sprite({
//          x: 0,
//          y: 32,
//          h: 1,
//          w: stage.width,
//          type: C.SPRITE_BLOCKER
//      });

//      // front wall
//      var front_wall = new Q.Sprite({
//          x: 0,
//          y: 200,
//          h: 1,
//          w: stage.width,
//          type: C.SPRITE_BLOCKER
//      });

//      var player new Q.Player(0, 116);

//      stage.insert(bg);
//      stage.insert(back_wall);
//      stage.insert(front_wall);
//      stage.insert(player);

//  });
//
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
            w: 112,
            h: 232,
            asset: "wall-entrance.png",
        });

        stage.insert(new Q.NPC("Chell", 60, 130));
        stage.insert(new Q.Portal(-150, 100, 'ladder.png', null));
        var player = new Q.Player(0, 116);

        stage.insert(actionButton);
        stage.insert(bg);
        stage.insert(back_wall);
        stage.insert(front_wall);
        stage.insert(player);
        stage.insert(entrance);
    });

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
              w: 112,
              h: 232, 
              asset: "wall-entrance.png",
          });
  
          // entrance right
          var entrance_right = new Q.Sprite({
              x: -stage.width / 2 + 112 / 2,
              y: stage.height / 2,
              w: 112,
              h: 232, 
              asset: "wall-entrance-flip.png",
          });
  
          var player = new Q.Player(0, 116);
  
          stage.insert(actionButton);
          stage.insert(bg);
          stage.insert(back_wall);
          stage.insert(front_wall);
          stage.insert(player);
          stage.insert(entrance_left);
          stage.insert(entrance_right);
     });
 

//  Q.scene("sleeping-area", function(stage) {
//      // back wall
//      var back_wall = new Q.Sprite({
//          x: 0,
//          y: 32,
//          h: 1,
//          w: stage.width,
//          type: C.SPRITE_BLOCKER
//      });

//      // front wall
//      var front_wall = new Q.Sprite({
//          x: 0,
//          y: 200,
//          h: 1,
//          w: stage.width,
//          type: C.SPRITE_BLOCKER
//      });

//      // entrance right
//      var entrance_left = new Q.Sprite({
//          x: stage.width / 2 - 112 / 2,
//          y: stage.height / 2,
//          w: 112,
//          h: 232, 
//          asset: "wall-entrance.png",
//      });

//      var actionButton = new Q.UI.Button({
//          asset: 'action.png',
//          x: 0,
//          y: 100,
//          hidden: true
//      }, function() {
//          dialogs.emit(Q.npcNearby+"-click");
//      });
//      stage.actionButton = actionButton;
//      stage.insert(actionButton);

//      var player = new Q.Player(0, 116);

//      stage.insert(actionButton);
//      stage.insert(bg);
//      stage.insert(back_wall);
//      stage.insert(front_wall);
//      stage.insert(player);
//      stage.insert(entrance_left);
//      stage.insert(entrance_right);

//  });
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


//  Q.scene("common-area", function(stage) {

//      stage.insert(new Q.Sprite({
//          x: 0,
//          y: 116,
//          h: 232,
//          w: 4536,
//          asset: 'main-scene.png',
//          type: 0 // !!important! You MUST specify Sprite type
//      }));

//      // back wall
//      stage.insert(new Q.Sprite({
//          x: 0,
//          y: 32,
//          h: 1,
//          w: 4536,
//          type: C.SPRITE_BLOCKER
//      }));

//      // front wall
//      stage.insert(new Q.Sprite({
//          x: 0,
//          y: 200,
//          h: 1,
//          w: 4536,
//          type: C.SPRITE_BLOCKER
//      }));

//      var entrance_1 = new Q.Entrance(-1900, 116);
//      var entrance_2 = new Q.Entrance(-204, 116);
//      var entrance_3 = new Q.Entrance(516, 116);

//      // prevent player from getting ahead of the camera
//      stage.insert(new Q.Sprite({
//          x: 0,
//          y: 345,
//          h: 1,
//          w: 1000,
//          type: C.SPRITE_BLOCKER
//      }));

//      stage.insert(new Q.NPC("Chell", 60, 130));
//      stage.insert(new Q.Portal(-150, 100, 'ladder.png', null));

//        var player = stage.insert(new Q.Player(516, 128));












//      stage.insert(entrance_1);
//      stage.insert(entrance_2);
//      stage.insert(entrance_3);

//      stage.add("viewport").follow(player, {x: true, y: false});
//  });

//  Q.scene("sleeping-area", function(stage) {
//      var player = stage.insert(new Q.Player(0, 260));

//      // back wall
//      stage.insert(new Q.Sprite({
//          x: 0,
//          y: 100,
//          h: 1,
//          w: 1000,
//          type: C.SPRITE_BLOCKER
//      }));

//      // prevent player from getting ahead of the camera
//      stage.insert(new Q.Sprite({
//          x: 0,
//          y: 345,
//          h: 1,
//          w: 1000,
//          type: C.SPRITE_BLOCKER
//      }));

//      var actionButton = new Q.UI.Button({
//          asset: 'action.png',
//          x: 0,
//          y: 100,
//          hidden: true
//      }, function() {
//          dialogs.emit(Q.npcNearby+"-click");
//      });
//      stage.actionButton = actionButton;
//      stage.insert(actionButton);

//      stage.add("viewport").follow(player, {x: true, y: false});
//  });

//  Q.scene("ending", function(stage) {
//      var player = stage.insert(new Q.Player(0, 260));

//      stage.add("viewport");
//  });
};
