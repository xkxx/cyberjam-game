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
    // alternatively, if the node is a response candidate,
    // triggerText will be displayed, and activate the dialog
    // if selected
    triggerText: "",
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

var dialogs = [
    {
        trigger: "Man-click",
        message: "The coffee here is bad",
        responses: [
            {
                triggerText: "Do you know where we're going?",
                message: "It doesn’t matter. It can't be colder than the last place."
            },
            {
                triggerText: "Option 2",
                message: "Response 2"
            }
        ]
    },
    {
        trigger: "OldMan-click",
        message: "zz..zzz..",
    },
    {
        trigger: "Boy-click",
        message: "Lalala",
        responses: [
            {
                triggerText: "What are you playing?",
                message: "A game."
            },
            {
                triggerText: "Fuck you",
                message: "You too"
            }
        ]
    },
    {
        trigger: "Mom-click",
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
    {
        trigger: "goto-commons",
        ontrigger: function() {
            Q.stage().stop();
            Q.stage(1).start();
        }
    },
    {
        trigger: "goto-kitchen",
        ontrigger: function() {
            Q.stage().stop();
            Q.stage(0).start();
        }
    },
    {
        trigger: "goto-pods",
        ontrigger: function() {
            Q.stage().stop();
            Q.stage(2).start();
        }
    }
];

exports.dialogs = new DialogTree(dialogs);
