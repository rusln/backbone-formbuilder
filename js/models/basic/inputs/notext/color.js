// NOT IN USE
define([
    "models/basic/input"
],function(Input){
   var Color = Input.extend({
       defaults:{
           "color":
           "color"
       },
        intialize:function(){
            Input.prototype.initialize.apply(this,arguments);
            _.defaults(this.defaults,Input.prototype.defaults);
        }
   }); 
   return Color;
});