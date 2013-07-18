define([
    "models/basic/element"
    ],function(Element){
    var Fieldset = Element.extend({
        defaults:{
            element:"fieldset",
            legend:"Title of this fieldset"
        },
        initialize:function(options){
            Element.prototype.initialize.apply(this,arguments);
            console.log(options);
            this.fields  = options.fields;
        }
    });
    _.defaults(Fieldset.prototype.defaults,Element.prototype.defaults);
    return Fieldset;
});