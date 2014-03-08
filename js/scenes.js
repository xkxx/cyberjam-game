var C = require('./constants').Constants;

exports.scenes = function(Q) {
    Q.scene("opening", function(stage) {
        var player = stage.insert(new Q.Player(0, 0));

    });

//  Scene prototype    
//  Q.scene("commons", function(stage) {
//      // bg
//      stage.insert(new Q.Sprite({ //(x,y) is the center of the sprite
//          x: 0, 
//          y: 116,
//          h: 232,
//          w: ,
//          asset: '',
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

//      var player = stage.insert(new Q.Player(0, 0));
//  });


    Q.scene("commons", function(stage) {
        // bg
        stage.insert(new Q.Sprite({
            x: 0,
            y: 116,
            h: 232,
            w: 1832,
            asset: 'commons-scene.png',
            type: 0 // !!important! You MUST specify Sprite type
        }));

        // back wall
        stage.insert(new Q.Sprite({
            x: 0,
            y: 32,
            h: 1,
            w: 1832, 
            type: C.SPRITE_BLOCKER
        }));

        // front wall
        stage.insert(new Q.Sprite({
            x: 0,
            y: 200,
            h: 1,
            w: 1832,
            type: C.SPRITE_BLOCKER
        }));

        var player = stage.insert(new Q.Player(0, 116));
        stage.width = 1832;
        stage.height = 232;
        stage.add("viewport");
    });

    Q.scene("sleeping", function(stage) {
        var player = stage.insert(new Q.Player(0, 0));
    });

    Q.scene("pod", function(stage) {
        var player = stage.insert(new Q.Player(0, 0));
    });

    Q.scene("kitchen", function(stage) {
        var player = stage.insert(new Q.Player(0, 0));
    });

    Q.scene("closet", function(stage) {
        var player = stage.insert(new Q.Player(0, 0));
    });

    Q.scene("closing", function(stage) {
        var player = stage.insert(new Q.Player(0, 0));
    });


    Q.scene("common-area", function(stage) {

        stage.insert(new Q.Sprite({
            x: 0,
            y: 116,
            h: 232,
            w: 4536,
            asset: 'main-scene.png',
            type: 0 // !!important! You MUST specify Sprite type
        }));

        // back wall
        stage.insert(new Q.Sprite({
            x: 0,
            y: 32,
            h: 1,
            w: 4536,
            type: C.SPRITE_BLOCKER
        }));

        // front wall
        stage.insert(new Q.Sprite({
            x: 0,
            y: 200,
            h: 1,
            w: 4536,
            type: C.SPRITE_BLOCKER
        }));

        var entrance_1 = new Q.Entrance(-1900, 116);
        var entrance_2 = new Q.Entrance(-204, 116);
        var entrance_3 = new Q.Entrance(516, 116);

        // prevent player from getting ahead of the camera
        stage.insert(new Q.Sprite({
            x: 0,
            y: 345,
            h: 1,
            w: 1000,
            type: C.SPRITE_BLOCKER
        }));

        stage.insert(new Q.NPC("Chell", 60, 130));
        stage.insert(new Q.Portal(-150, 100, 'ladder.png', null));

          var player = stage.insert(new Q.Player(516, 128));

        var actionButton = new Q.UI.Button({
            asset: 'action.png',
            x: 0,
            y: 100,
            hidden: true
        }, function() {
            Q.npcNearby.click();
        });
        stage.actionButton = actionButton;
        stage.insert(actionButton);

        stage.insert(entrance_1);
        stage.insert(entrance_2);
        stage.insert(entrance_3);

        stage.add("viewport").follow(player, {x: true, y: false});
    });

    Q.scene("sleeping-area", function(stage) {
        var player = stage.insert(new Q.Player(0, 260));

        // back wall
        stage.insert(new Q.Sprite({
            x: 0,
            y: 100,
            h: 1,
            w: 1000,
            type: C.SPRITE_BLOCKER
        }));

        // prevent player from getting ahead of the camera
        stage.insert(new Q.Sprite({
            x: 0,
            y: 345,
            h: 1,
            w: 1000,
            type: C.SPRITE_BLOCKER
        }));

        var actionButton = new Q.UI.Button({
            asset: 'action.png',
            x: 0,
            y: 100,
            hidden: true
        }, function() {
            dialogs.emit(Q.npcNearby+"-click");
        });
        stage.actionButton = actionButton;
        stage.insert(actionButton);

        stage.add("viewport").follow(player, {x: true, y: false});
    });

    Q.scene("ending", function(stage) {
        var player = stage.insert(new Q.Player(0, 260));

        stage.add("viewport");
    });
};
