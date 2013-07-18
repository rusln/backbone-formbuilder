define([
    "models/basic/element"
],function(Element){
    var Form = Element.extend({
        defaults:{
            action:"",
            method:"",
            target:"",
            element:"form"
        },
        initialize:function(options){
            Element.prototype.initialize.apply(this,arguments);
            this.fields = options.collection;
        },
        toJSON2:function(){
               return JSON.parse(JSON.stringify(this.attributes));
        }
    });
    _.defaults(Form.prototype.defaults,Element.prototype.defaults);
    return Form;
});