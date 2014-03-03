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
    // pass...
};

exports.DialogTree = DialogTree;
