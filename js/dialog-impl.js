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
    },
    removeTrigger: function(trigger) {
        this.root.removeAllListeners(trigger);
    },
    addTrigger: function(trigger) {
        var root = this.root;
        if(this.trigger) {
            root.removeAllListeners(this.trigger);
        }
        this.trigger = trigger;
        root.on(trigger, this);
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
                item.root = self;
                if (item.trigger) {
                    self.bindDialog(item.trigger, item);
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
            showChoices: false,
            kbChoice: 0
        },
        methods: {
            selectChoice: function(choice) {
                this.choices.splice(0, this.choices.length);
                self.currentDialog.responses.forEach(function(item) {
                    if (item.triggerText == choice) {
                        self.triggerDialog(item);
                    }
                });
            },
            kbSelect: function(e) {
                if (this.showChoices) {
                    this.selectChoice(this.choices[this.kbChoice].content);
                }
                else {
                    self.closeDialog();
                }
            },
            kbUp: function() {
                if (this.showChoices) {
                    this.choices[this.kbChoice].selected = false;
                    this.kbChoice--;
                    if (this.kbChoice == -1) {
                        this.kbChoice = this.choices.length - 1;
                    }
                    this.choices[this.kbChoice].selected = true;
                }
            },
            kbDown: function() {
                if (this.showChoices) {
                    this.choices[this.kbChoice].selected = false;
                    this.kbChoice++;
                    if (this.kbChoice == this.choices.length) {
                            this.kbChoice = 0;
                        }
                    this.choices[this.kbChoice].selected = true;
                }
            },
            dismiss: function() {
                if(!this.showChoices) {
                    self.closeDialog();
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
    if (this.currentDialog == item) {
        return;
    }

    this.closeDialog();

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
                var response = item.responses[i];
                if (response.triggerInline) {
                    this.bindDialog(response.triggerInline, response);
                }
                else if (response.triggerText) {
                    this.ui.choices.push({
                        content: response.triggerText,
                        selected: false
                    });
                }
            }
            this.ui.kbChoice = 0;
            this.ui.choices[0].selected = true;
            this.ui.showChoices = true;
        }
        this.currentDialog = item;
        this.ui.showDialog = true;
        Q.stage().pause();
    }
};

DialogTree.prototype.bindDialog = function(trigger, dialog) {
    var self = this;
    this.on(trigger, function() {
        self.triggerDialog(dialog);
    });
};

DialogTree.prototype.closeDialog = function() {
    if (this.currentDialog && this.currentDialog.responses) {
        var responses = this.currentDialog.responses;
        for (var i = 0; i < responses.length; i++) {
            if (responses[i].triggerInline) {
                this.removeAllListeners(responses[i].triggerInline);
            }
        }
    }
    this.currentDialog = null;
    this.ui.showChoices = false;
    this.ui.showDialog = false;
    console.info(Q.stage());
    Q.stage().unpause();
};

exports.DialogTree = DialogTree;
