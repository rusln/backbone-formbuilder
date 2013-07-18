define([
    "models/basic/element"
],function(Element){
    var Input = Element.extend({
        defaults: {
            element:"input",
            // will prevent interaction(no clik,etc)
            // will also prevent the value from being send to the server 
            disabled:false
        },
        initialize: function(){
              Element.prototype.initialize.apply(this,arguments);
        }
    });
    _.defaults(Input.prototype.defaults,Element.prototype.defaults);
    return Input;
});