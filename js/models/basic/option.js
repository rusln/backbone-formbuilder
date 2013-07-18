define([
    "models/basic/element"
],function(Element){
   var Option = Element.extend({
       defaults:{
            labelValue:"",
            labelFor:"",
            selected:false
       },
        intialize:function(){
            Element.prototype.initialize.apply(this,arguments);
        }
   }); 
_.defaults(Option.prototype.defaults,Element.prototype.defaults);
    return Option;
});