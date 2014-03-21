exports.scenes = function() {
    Crafty.defineScene('loading', function() {
        Crafty.background("#000");
        var loading = Crafty.e("2D, DOM, Text, Persist")
                            .attr({ w: 200, h: 20, x: 0, y: 232 })
                            .text("Loading")
                            .textColor("#FFFFFF")
                            .textFont({"family": 'pixel',
                                       "size":"15px"
                            });


        Crafty.load([ 
                     'assets/player.png','assets/man-sheet.png','assets/oldman-chair.png', 
                     'assets/commons-scene.png','assets/terminal-sheet.png','assets/boy-sheet.png',
                     'assets/wall-entrance.png','assets/wall-entrance-flip.png','assets/ladder.png', 
                     'assets/kitchen-scene.png', 'assets/closet-scene.png', 'assets/outside-scene.png', 
                     'assets/burner-sheet.png', 'assets/sleeping-scene.png', 'assets/terminal-scene.png',
                     'assets/intro-scene.png', 'assets/intro-train.png', 'assets/bottom-burner-sheet.png'
                    ],
                    function() { //after load
                        //generate sprite components from sheets
                        Crafty.sprite(64, 128, "assets/player.png", { Player: [0,0] });
                        Crafty.enterScene("commons");
                    },
                    function(assets) {//during load
                        loading.text("loaded: " + assets.loaded + "/" + assets.total + " objects");
                    },
                    function(asset) {//on error
                        console.log(asset);
       });
    })

    Crafty.defineScene('intro', function() {

        Crafty.stage.elem.style['background-image'] = 'url(assets/intro-scene.png)';
        Crafty.stage.elem.style['background-position'] = '0px 0px';
        Crafty.stage.elem.style['background-repeat'] = 'repeat-x';
        Crafty.stage.elem.style['-webkit-animation'] = 'animatedBackground 3s linear infinite';
        Crafty.stage.elem.style['-moz-animation'] = 'animatedBackground 3s linear infinite';
        Crafty.stage.elem.style['animation'] = 'animatedBackground 3s linear infinite';
 



        //tiles are 24x16
        Crafty.sprite(24, 16, "assets/bottom-burner-sheet.png", { BottomBurner: [0,0] });
        for (var i = 0; i < 7; i++) {
            Crafty.e("2D, Canvas, SpriteAnimation, BottomBurner").reel('Burning', 1000/2, 0, 0, 4)
                           .animate('Burning', -1)
                           .attr({x:-12 + 18 * 4 * i, y:152, z:1});
        }

        var train = Crafty.e("2D, Canvas, Image")
                     .attr({w: 496, h: 84, x: 0, y: 100})
                     .image("assets/intro-train.png");


    });


    Crafty.defineScene('commons', function() {
        var bg = Crafty.e("2D, Canvas, Image")
                     .attr({w: 1288, h: 232, x: 0, y: 0})
                     .image("assets/commons-scene.png");
        var boundTop = Crafty.e("Bounds").attr({ x:0, y:50, w:1288, h:1 });
//        var boundBottom = Crafty.e("Bounds").attr({ x:0, y:200, w:1288, h:1 });
        var player = Crafty.e("John");
        Crafty.viewport.follow(player);

    });

//    // CREATE ALL ANIMATIONS
//    // ^^^^^^^^^^^^^^^^^^^^^
//    Q.animations('terminal', 
//    {
//            flicker: { frames: [0,1,2,3,4], rate: 1/5}
//    });
//    Q.animations('boy',      
//    {       
//            squirm: { frames: [0,1,2,3],loop:false, rate: 1},
//            squirmBack: { frames: [3,2,1,0],loop:false, rate: 1} 
//    });
//    Q.animations('man',      
//    {   
//            drink: { frames: [0,1,2,3,3,3,2,1,0],loop:false, rate: 1/5},
//            handSlide: { frames: [4,5,6,7,6,5,4],loop:false, rate: 1/3} 
//    });
//
//    // Create ALL NPCS
//    // ^^^^^^^^^^^^^^^
//    Q.NPC.extend("Terminal", { 
//        init:function() {
//            this._super({
//                name:"Chell",
//                sprite:"terminal",
//                sheet:"terminal",
//                x:Q.stage().width/2 - 104,
//                y:124,
//                z:124,
//                action:"login" 
//            }); 
//        },
//        step: function(dt) {
//            this.play("flicker");
//        }
//    });
//
//    Q.NPC.extend("Boy", { 
//        init:function(x,y,action) {
//            this._super( {
//                  name:"Boy",
//                  sprite:"boy",
//                  sheet:"boy",
//                  x:x,
//                  y:y,
//                  z:y,
//                  action:action
//            });
//        },
//        step: function(dt) {
//            if ((Q.stage().time |0) % 10 == 0) {
//                if (this.p.frame == 0) {
//                    this.play("squirm") 
//                } else if (this.p.frame == 3) {
//                    this.play("squirmBack");
//                }
//            }
//        } 
//    });
//
//    Q.NPC.extend("Man", { 
//        init:function(x,y,action) {
//            this._super( {
//                  name:"Man",
//                  sprite:"man",
//                  sheet:"man",
//                  x:x,
//                  y:y,
//                  z:y,
//                  action:action
//            });
//        },
//        step: function(dt) {
//            //every 5 seconds as long as prev animation is finished
//            if ((Q.stage().time |0) % 5 == 0 && (this.p.frame == 0 || this.p.frame == 4)) {
//                (Math.round(Math.random()) == 1) ? this.play("drink") : this.play("handSlide");
//            }
//        }
//    });
//
//    Q.NPC.extend("OldMan", { 
//        init:function(x,y,action) {
//            this._super( { 
//                name:"OldMan",
//                x:x,
//                y:y,
//                z:y,
//                asset:"oldman-chair.png",
//                action:action 
//            });
//        }
//    });
//    
//    //ADD IN GIRL NPC
//
//    // CREATE BASE FUNCTIONS FOR EMPTY STAGES
//    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//    var commonsEmpty = function(stage) {
//            stage.width = 1288;
//            stage.height = 232;
//            stage.add("viewport");
//
//            // bg
//            var bg = new Q.Sprite({
//                x: 0,
//                y: stage.height / 2,
//                h: stage.height,
//                w: stage.width,
//                asset: 'commons-scene.png',
//                type: 0 // !!important! You MUST specify Sprite type
//            });
//
//
//            var actionButton = new Q.UI.Button({
//                x: 0,
//                y: 100,
//                hidden: true
//            }, function() {
//                Q.npcNearby.click();
//            });
//            stage.actionButton = actionButton;
//
//            // back wall
//            var back_wall = new Q.Sprite({
//                x: 0,
//                y: 32,
//                h: 1,
//                w: stage.width,
//                type: C.SPRITE_BLOCKER
//            });
//
//            // front wall
//            var front_wall = new Q.Sprite({
//                x: 0,
//                y: 200,
//                h: 1,
//                w: stage.width,
//                type: C.SPRITE_BLOCKER
//            });
//
//            // entrance left
//            var entrance = new Q.Sprite({
//                x: -stage.width / 2 + 112 / 2 + 24,
//                y: stage.height / 2,
//                z: stage.height,
//                w: 112,
//                h: 232,
//                asset: "wall-entrance.png",
//                type: 0
//            });
//
//            var portal_left = new Q.Portal(-stage.width / 2, "kitchen");
//            stage.insert(portal_left);
//            stage.insert(bg);
//            stage.insert(back_wall);
//            stage.insert(front_wall);
//            stage.insert(entrance);
//            stage.insert(actionButton);
//
//            return stage;
//    }
//
//     var kitchenEmpty = function(stage) {
//              stage.width = 700;
//              stage.height = 232;
//              stage.add("viewport");
//
//              var actionButton = new Q.UI.Button({
//                  asset: 'action.png',
//                  x: 0,
//                  y: 100,
//                  hidden: true
//              }, function() {
//                  Q.npcNearby.click();
//              });
//              stage.actionButton = actionButton;
//  
//              // bg
//              var bg = new Q.Sprite({
//                  x: 0,
//                  y: stage.height / 2, 
//                  z: 0,
//                  h: stage.height,
//                  w: stage.width,
//                  asset: 'kitchen-scene.png',
//                  type: 0 // !!important! You MUST specify Sprite type
//              });
//  
//              // back wall
//              var back_wall = new Q.Sprite({
//                  x: 0,
//                  y: 32,
//                  h: 1,
//                  w: stage.width,
//                  type: C.SPRITE_BLOCKER
//              });
//  
//              // front wall
//              var front_wall = new Q.Sprite({
//                  x: 0,
//                  y: 200,
//                  h: 1,
//                  w: stage.width,
//                  type: C.SPRITE_BLOCKER
//              });
//  
//              // entrance right
//              var entrance_left = new Q.Sprite({
//                  x: stage.width / 2 - 112 / 2,
//                  y: stage.height / 2,
//                  z: stage.height,
//                  w: 112,
//                  h: 232, 
//                  asset: "wall-entrance.png",
//                  type: 0
//              });
//  
//              // entrance left
//              var entrance_right = new Q.Sprite({
//                  x: -stage.width / 2 + 112 / 2,
//                  y: stage.height / 2,
//                  z: stage.height,
//                  w: 112,
//                  h: 232, 
//                  asset: "wall-entrance-flip.png",
//                  type: 0
//              });
//
//              var portal_left = new Q.Portal(-stage.width / 2, "pods");
//              var portal_right = new Q.Portal(stage.width / 2, "commons");
//
//              stage.insert(portal_left);
//              stage.insert(portal_right);
//              stage.insert(bg);
//              stage.insert(back_wall);
//              stage.insert(front_wall);
//              stage.insert(entrance_left);
//              stage.insert(entrance_right);
//              stage.insert(actionButton);
//              return stage;
//     }
//
//    var podsEmpty = function(stage) {
//              stage.width = 1840;
//              stage.height = 232;
//              stage.add("viewport");
//
//              var actionButton = new Q.UI.Button({
//                  asset: 'action.png',
//                  x: 0,
//                  y: 100,
//                  hidden: true
//              }, function() {
//                  Q.npcNearby.click();
//              });
//              stage.actionButton = actionButton;
//  
//              // bg
//              var bg = new Q.Sprite({
//                  x: 0,
//                  y: stage.height / 2, 
//                  z: 0,
//                  h: stage.height,
//                  w: stage.width,
//                  asset: 'sleeping-scene.png',
//                  type: 0 // !!important! You MUST specify Sprite type
//              });
//  
//              // back wall
//              var back_wall = new Q.Sprite({
//                  x: 0,
//                  y: 32,
//                  h: 1,
//                  w: stage.width,
//                  type: C.SPRITE_BLOCKER
//              });
//  
//              // front wall
//              var front_wall = new Q.Sprite({
//                  x: 0,
//                  y: 200,
//                  h: 1,
//                  w: stage.width,
//                  type: C.SPRITE_BLOCKER
//              });
//  
//              // entrance right
//              var entrance_right = new Q.Sprite({
//                  x: stage.width / 2 - 112 / 2,
//                  y: stage.height / 2,
//                  z: stage.height,
//                  w: 112,
//                  h: 232, 
//                  asset: "wall-entrance.png",
//                  type: 0
//              });
//  
//              // entrance left
//              var entrance_left = new Q.Sprite({
//                  x: -stage.width / 2 + 112 / 2 + 32,
//                  y: stage.height / 2,
//                  z: stage.height,
//                  w: 112,
//                  h: 232, 
//                  asset: "wall-entrance.png",
//                  type: 0
//              });
//
//              var portal_left = new Q.Portal(-stage.width / 2, "closet");
//              var portal_right = new Q.Portal(stage.width / 2, "kitchen");
//
//              stage.insert(portal_left);
//              stage.insert(portal_right);
//              stage.insert(actionButton);
//              stage.insert(bg);
//              stage.insert(back_wall);
//              stage.insert(front_wall);
//              stage.insert(entrance_left);
//              stage.insert(entrance_right);
//              return stage;
//    }
//
//    var closetEmpty = function(stage) {
//              stage.width = 700;
//              stage.height = 232;
//              stage.add("viewport");
//
//              var actionButton = new Q.UI.Button({
//                  asset: 'action.png',
//                  x: 0,
//                  y: 100,
//                  hidden: true
//              }, function() {
//                  Q.npcNearby.click();
//              });
//              stage.actionButton = actionButton;
//      
//              // bg
//              var bg = new Q.Sprite({
//                  x: 0,
//                  y: stage.height / 2, 
//                  z: 0,
//                  h: stage.height,
//                  w: stage.width,
//                  asset: 'closet-scene.png',
//                  type: 0 // !!important! You MUST specify Sprite type
//              });
//      
//              // back wall
//              var back_wall = new Q.Sprite({
//                  x: 0,
//                  y: 32,
//                  h: 1,
//                  w: stage.width,
//                  type: C.SPRITE_BLOCKER
//              });
//      
//              // front wall
//              var front_wall = new Q.Sprite({
//                  x: 0,
//                  y: 200,
//                  h: 1,
//                  w: stage.width,
//                  type: C.SPRITE_BLOCKER
//              });
//      
//              // entrance right
//              var entrance_right = new Q.Sprite({
//                  x: stage.width / 2 - 112 / 2,
//                  y: stage.height / 2,
//                  z: stage.height,
//                  w: 112,
//                  h: 232, 
//                  asset: "wall-entrance.png",
//                  type: 0
//              });
//      
//
//              var portal_right = new Q.Portal(stage.width / 2, "pods");
//              var portal_left = new Q.Portal(-stage.width / 2, "outside"); 
//
//              stage.insert(portal_left);
//              stage.insert(portal_right);
//              stage.insert(actionButton);
//              stage.insert(bg);
//              stage.insert(back_wall);
//              stage.insert(front_wall);
//              stage.insert(entrance_right);
//              return stage;
//    }
//
//    var terminalEmpty = function(stage) {
//              stage.width = 700;
//              stage.height = 232;
//              stage.add("viewport");
//
//              var actionButton = new Q.UI.Button({
//                  asset: 'action.png',
//                  x: 0,
//                  y: 100,
//                  hidden: true
//              }, function() {
//                  Q.npcNearby.click();
//              });
//              stage.actionButton = actionButton;
//
//              // bg
//              var bg = new Q.Sprite({
//                  x: stage.width / 2,
//                  y: stage.height / 2, 
//                  z: 0,
//                  h: stage.height,
//                  w: stage.width,
//                  sheet: 'terminal-scene',
//                  sprite: 'terminal-scene',
//                  frame: 0,
//                  type: 0 // !!important! You MUST specify Sprite type
//              });
//
//              bg.add("animation");
//              bg.play("flicker");
//
//              stage.insert(bg);
//              stage.insert(actionButton);
//              return stage;
//    }
//
//    //Actually includes everything, because it won't be reused
//    var outsideEmpty =  function(stage) {
//              stage.width = 700;
//              stage.height = 232;
//              stage.add("viewport");
//
//              var actionButton = new Q.UI.Button({
//                  asset: 'action.png',
//                  x: 0,
//                  y: 100,
//                  hidden: true
//              }, function() {
//                  Q.npcNearby.click();
//              });
//              stage.actionButton = actionButton;
//      
//
//              // bg
//              var bg = new Q.Sprite({
//                x: 0,
//                y: stage.height / 2,
//                z: 0,
//                h: stage.height,
//                w: stage.width,
//                asset: 'outside-scene.png',
//                type: 0 // !!important! You MUST specify Sprite type
//              });
//      
//              // back wall
//              var back_wall = new Q.Sprite({
//                  x: 0,
//                  y: 60,
//                  h: 1,
//                  w: stage.width,
//                  type: C.SPRITE_BLOCKER
//              });
//      
//              // front wall
//              var front_wall = new Q.Sprite({
//                  x: 240,
//                  y: 125,
//                  h: 1,
//                  w: stage.width,
//                  type: C.SPRITE_BLOCKER
//              });
//
//              var player = new Q.Player(stage.width/2, 87, .5);
//              var burner1 = new Q.Burner(111, 224, 1);
//              var burner2 = new Q.Burner(183, 224, 3);
//              var burner3 = new Q.Burner(255, 224, 5);
//              var burner4 = new Q.Burner(327, 224, 6);
//              player.p.xspeed /= 2;
//              player.p.yspeed /= 2;
//              var portal_right = new Q.Portal(stage.width / 2, "closet");
//
//              stage.insert(portal_right);
//              stage.insert(actionButton);
//              stage.insert(bg);
//              stage.insert(back_wall);
//              stage.insert(front_wall);
//              stage.insert(player);
//              stage.insert(burner1);
//              stage.insert(burner2);
//              stage.insert(burner3);
//              stage.insert(burner4);
//              return stage;
//
//    }
//
//    // CREATE FUNCTIONS BY ROOM DAY 0
//    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//    var commons0 = function(stage) {
//            stage = commonsEmpty(stage);
//            var player = new Q.Player(0, 116);
//            var oldman = new Q.OldMan(-150, 100, "nudge old man"); 
//            var terminal = new Q.Terminal();
//            var boy = new Q.Boy(-50, 116, "talk to the boy");
//
//            stage.insert(terminal);
//            stage.insert(boy);
//            stage.insert(oldman);
//            stage.insert(player);
//    }
//
//    var kitchen0 = function(stage) {
//            stage = kitchenEmpty(stage);
//            var player = new Q.Player(stage.width/2, 116);
//            var man = new Q.Man(-180, 100, "talk to the coffee guy");
//
//            stage.insert(player);
//            stage.insert(man);
//    }
//
//    var pods0 = function(stage) {
//            stage = podsEmpty(stage);
//            var player = new Q.Player(stage.width/2, 116);
//
//            stage.insert(player);
//    }
//
//    var closet0 = function(stage) {
//            stage = closetEmpty(stage);
//            var player = new Q.Player(stage.width/2, 116);
//            stage.insert(player);
//    }
//
//    var terminal0 = function(stage) {
//            stage = terminalEmpty(stage);
//    }
//
//    //Outside empty actually includes everything, because it won't be reused
//    //It will not end up in the first day
//    var outside0 = function(stage) {
//            stage = outsideEmpty(stage);
//    }
//
//    // PUSH EACH DAY'S LIST OF ROOMS EX. sceneMap[DAY][LiST OF ROOMS BY LOAD ORDER]
//    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//    
//    //day 1
//    sceneMap.push([ 
//        { 
//            name: "commons",
//            fun: commons0
//        },
//        { 
//            name: "terminal",
//            fun: terminal0
//        },
//        { 
//            name: "kitchen",
//            fun: kitchen0
//        },
//        { 
//            name: "pods",
//            fun: pods0
//        },
//        { 
//            name: "closet",
//            fun: closet0
//        },
//        { 
//            name: "outside",
//            fun: outside0
//        }
//    ]);
//
//    Q.sceneMap = sceneMap;
};
