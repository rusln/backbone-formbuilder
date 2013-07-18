define([
    "models/basic/input"
],function(Input){
   var TypeReset = Input.extend({
       defaults:{type:"reset"},
        initialize:function(){
        Input.prototype.initialize.apply(this,arguments);
        }
   }); 
    _.defaults(TypeReset.prototype.defaults,Input.prototype.defaults);
   return TypeReset;
});