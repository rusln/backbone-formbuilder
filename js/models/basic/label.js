define([
    "models/basic/element"
],function(Element){
    var Label = Element.extend({
        defaults:{
            for:""
        },
        initialize:function(){
            this.constructor.__super__.initialize.apply(this,arguments);
        }
    });
_.defaults(Label.prototype.defaults,Element.prototype.defaults);
    return Label;
});