define([
    "models/basic/input"
],function(Input){
    var InputButton = Input.extend({
        defaults:{
            type:"button",
            value:"click me"
        },
        initialize:function(){
            Input.prototype.initialize.apply(this,arguments);
        }
    });
    _.defaults(InputButton.prototype.defaults,Input.prototype.defaults);
    return InputButton;
});