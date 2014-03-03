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
    content: "",
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
            content: "Bye!"
        },
        {
            triggerText: "Lend me 10 bucks",
            content: "Not again..."
            ontrigger: function(dialog) {
                dialog.remove(); // removes dialog forever
            }
        }
    ]
}

*/

var DialogTree = require('./dialog-impl').DialogTree;

// your dialogs here...

dialogs = [];

exports.dialogs = new DialogTree(dialogs);
