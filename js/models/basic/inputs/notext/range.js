//  NOT IN USE
define([
    "models/basic/input"
],function(Input){
   var Range = Input.extend({
       defaults:{
           "range":
           "range"
       },
        intialize:function(){
            Input.prototype.initialize.apply(this,arguments);
            _.defaults(this.defaults,Input.prototype.defaults);
        }
   }); 
   return Range;
});