var C = require('./constants').Constants;

exports.scenes = function(Q) {
    Q.scene("opening", function(stage) {


    });

    Q.scene("common-area", function(stage) {
        stage.insert(new Q.NPC(60, 260));

        stage.insert(new Q.Sprite({
            x: 0,
            y: 116,
            h: 232,
            w: 4536,
            asset: 'main-scene.png'
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

        stage.insert(new Q.Sprite({
            x: -200,
            y: 200,
            asset: 'ladder.png',
            type: C.SPRITE_NPC

        }));

          var player = stage.insert(new Q.Player(516, 128));

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
