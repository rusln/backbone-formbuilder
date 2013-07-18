// NOT IN USE
define([
    "models/basic/input"
],function(Input){
   var NumberInput = Input.extend({
       defaults:{
           "file":
           "file"
       },
        intialize:function(){
            Input.prototype.initialize.apply(this,arguments);
            _.defaults(this.defaults,Input.prototype.defaults);
        }
   }); 
   return NumberInput;
});