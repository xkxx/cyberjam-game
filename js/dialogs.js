/*
 This file contains the dialog list/tree logic

 A dialog node is a standard JavaScript object.
 The format is as follows:

{
    // a signal that triggers the dialog.
    // can be the player clicking on a NPC, or a timed event
    // keep in mind that the signal is global, thus the dialog
    // will be activated even if it's inside a nested tree
    trigger: "",
    // if set to true, the dialog persists after its message is
    // dismissed. The scene expires when it is closed or when
    // a new scene is loaded
    isScene: false,
    // alternatively, if the node is a response candidate,
    // triggerText will be displayed, and activate the dialog
    // if selected
    triggerText: "",
    // or, triggerInline can be used if the dialog should be
    // triggered by a signal when its parent is triggered.
    triggerInline: "",
    // the dialog content to be displayed
    // Will display in multiple "slides" if is multiline
    // Won't display anything if empty
    message: "",
    // signal to trigger when the dialog is active
    emit: "",
    // function to execute when the dialog is active.
    ontrigger: function(dialog) {},
    // list of reponse candidates to select from.
    // each response is a new dialog node
    responses: []
}

example:

var NPC1 = {
    trigger: "npc1-click",
    message: "Hello. What's up?",
    responses: [
        {
            triggerText: "Nothing. Bye",
            message: "Bye!"
        },
        {
            triggerText: "Lend me 10 bucks",
            message: "Not again..."
            ontrigger: function(dialog) {
                dialog.remove(); // removes dialog forever
            }
        }
    ]
}

*/

var DialogTree = require('./dialog-impl').DialogTree;

var day1 = {
    trigger: 'day1-start',
    isScene: true,
    //message: "Here we go",
    responses: [
    {
        triggerInline: "Man-click",
        message: "The coffee here is bad",
        responses: [
            {
                triggerText: "Do you know where we're going?",
                message: "It doesn’t matter. It can't be colder than the last place."
            },
            {
                triggerText: "...",
            }
        ]
    },
    {
        triggerInline: "OldMan-click",
        message: "zz..zzz..",
    },
    {
        triggerInline: "Chell-click",
        message: "Hi there",
        emit: "goto-terminal",
        responses: [
            {  triggerText: "logs",
                message: "Insufficient priveleges",
                responses: [{
                    triggerText: "back",
                    emit: "Chell-click"
                }]
            },
            {
                triggerText: "about",
                message: "This is your captain, android make YR2088 specialized in human management, etc. Sleeping pods by ID, allow the passenger to utilize Hyper v.9.8 the interface between the ship’s network and the greater outer-verse. Mail is the primary means of communication between passengers and the captain. Emergencies/notifications will appear upon login. At the front of the shuttle, you can directly interact with me. Welcome aboard.",
                responses: [ 
                    {
                        triggerText: "back",
                        emit: "Chell-click"
                    }
                ]
            },
            { 
                triggerText: "...",
                emit: "goto-commons"
            }
         ]
    },
    {
        triggerInline: "Boy-click",
        message: "Lalala",
        responses: [
            {
                triggerText: "What are you playing?",
                message: "A game."
            },
            {
                triggerText: "...",
            }
        ]
    },
    {
        triggerInline: "Mom-click",
        message: "I should have had an abortion.",
        responses: [
            {
                triggerText: "That's terrible.",
                message: "I'll just simulate it in my pod."
            },
            {
                triggerText: "Want me to kill him?",
                message: "Eh, not right now."
            }
        ]
    },
    ] // end of responses
};

var dialogs = [
    day1,
    {
        trigger: "goto-commons",
        ontrigger: function() {
            Q.stage(5).start();
            Q.stage().stop();
            Q.activeStage = 5;
        }
    },
    {
        trigger: "goto-kitchen",
        ontrigger: function() {
            Q.stage(3).start();
            Q.stage().stop();
            Q.activeStage = 3;
        }
    },
    {
        trigger: "goto-pods",
        ontrigger: function() {
            Q.stage(2).start();
            Q.stage().stop();
            Q.activeStage = 2;
        }
    },
    {
        trigger: "goto-closet",
        ontrigger: function() {
            Q.stage(1).start();
            Q.stage().stop();
            Q.activeStage = 1;
        }
    },
    {
        trigger: "goto-terminal",
        ontrigger: function() {
            if (Q.activeStage != 4) {
            Q.stage(4).start();
            Q.stage().stop();
            Q.activeStage = 4;
            }
        }
    },
    {
        trigger: "goto-outside",
        ontrigger: function() {
            Q.stage(0).start();
            Q.stage().stop();
            Q.activeStage = 0;
        }
    },
];

exports.dialogs = new DialogTree(dialogs);
