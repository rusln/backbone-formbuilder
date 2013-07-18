define([
    "models/basic/element"
],function(Element){
   var OptGroup = Element.extend({
       defaults:{
           element:"optgroup"
       },
       intialize:function(){
            Element.prototype.initialize.apply(this,arguments);
        }
   }); 
_.defaults(OptGroup.prototype.defaults,Element.prototype.defaults);

    return OptGroup;
});