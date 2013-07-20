define([
    "models/basic/element"
    ],function(Element){
    var Fieldset = Element.extend({
        defaults:{
            element:"fieldset",
            legend:"Title of this fieldset"
        },
        initialize:function(options){
            if(options && options.fields) this.fields = options.fields;
            Element.prototype.initialize.apply(this,arguments);
        }
    });
    _.defaults(Fieldset.prototype.defaults,Element.prototype.defaults);
    return Fieldset;
});