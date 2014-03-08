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
    EventEmitter.call(this);
    var self = this;

    var process = function(list, parent) {
        if (!list) {
            return;
        }

        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (item.prototype !== DialogNode) {
                // we assume the chil nodes have been processed
                // if the parent node has.
                item.prototype = DialogNode;
                item.parent = list;
                if (item.trigger) {
                    EventEmitter.prototype.on.call(self, item.trigger, self.triggerDialog.bind(self, item));
                }
                process(item.responses, item);
            }
        }
    };

    process(list, this);
    this.list = list;
    this.currentDialog = null;

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
                choice.stopPropagation();
                choice = choice.target.innerText;
                this.choices.remove();
                self.currentDialog.responses.forEach(function(item) {
                    if (item.triggerText == choice) {
                        self.triggerDialog(item);
                    }
                });
            },
            dismiss: function() {
                if(!this.showChoices) {
                    this.showDialog = false;
                    self.currentDialog = null;
                }
            }
        }
    });
};

DialogTree.prototype = Object.create(EventEmitter.prototype);
DialogTree.prototype.constructor = DialogTree;

DialogTree.prototype.remove = function(item) {
     if (this.responses) {
        var index = this.list.indexOf(item);
        if (index != -1) {
            this.list.splice(index, 1);
        }
    }
};

DialogTree.prototype.triggerDialog = function(item) {
    console.info('tregger dialog')
    if(item.ontrigger) {
        item.ontrigger();
    }
    if (item.emit) {
        this.emit(item.emit);
    }
    if (item.message) {
        this.ui.content = item.message;

        if(item.responses) {
            for (var i = 0; i < item.responses.length; i++) {
                this.ui.choices.push(item.responses[i].triggerText);
            }
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
