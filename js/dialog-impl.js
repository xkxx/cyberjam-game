var EventEmitter = require('./events').EventEmitter;

var DialogNode = {
    remove: function(item) {
        if(!item) {
            this.parent.remove(this);
        }
        else {
            if (this.responses) {
                var index = this.responses.indexOf(item);
                if (index != -1) {
                    this.responses.splice(index, 1);
                }
            }
        }
    }
};



var DialogTree = function(list) {
    var process = function(list, parent) {
        if (!list) {
            return;
        }

        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (!item instanceof DialogNode) {
                // we assume the chil nodes have been processed
                // if the parent node has.
                item.prototype = DialogNode;
                item.parent = list;
                if (item.trigger) {
                    this.on(item.trigger, this.triggerDialog.bind(this, item));
                }
                process(item.responses, item);
            }
        }
    };

    EventEmitter.prototype.constructor.call(this);

    process(list, this);
    this.list = list;
    this.currentDialog = null;

    var dialogTree = this;


    this.ui = new Vue({
        el: "#dialog-ui",
        data: {
            content: "",
            choices: [
            ],
            showDialog: false,
            showChoices: false
        },
        methods: {
            selectChoice: function(choice) {
                this.choices.remove();
                dialogTree.currentDialog.forEach(function(item) {
                    if (item.triggerText == choice) {
                        dialogTree.triggerDialog(item);
                    }
                });
            },
            dismiss: function() {
                this.showDialog = false;
                dialogTree.currentDialog = null;
            }
        }
    });
};

DialogTree.prototype = new EventEmitter();

DialogTree.prototype.remove = function(item) {
     if (this.responses) {
        var index = this.list.indexOf(item);
        if (index != -1) {
            this.list.splice(index, 1);
        }
    }
};

DialogTree.prototype.triggerDialog = function(item) {
    if(item.ontrigger) {
        item.ontrigger();
    }
    if (item.emit) {
        this.emit(item.emit);
    }
    if (item.message) {
        this.ui.content = item.message;

        if(item.responses) {
            item.responses.forEach(function(choice) {
                this.ui.choices.push(choice.triggerText);
            });
            this.ui.showChoices = true;
        }
        else {
            this.ui.showChoices = false;
        }
        this.currentDialog = item;
        this.ui.showDialog = true;
    }
};

exports.DialogTree = DialogTree;
