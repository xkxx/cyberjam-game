exports.Portal = function(Q) {
    Q.Sprite.extend("Portal", {
        init: function(x, y, image, dst) {
            this._super({
                x: x,
                y: y,
                asset: image,
                type: SPRITE_NP
            })
        },            
        click: function() {
            
        }
            
    });
        
};