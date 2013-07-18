define([
"models/basic/input"
],function(Input){
   var InputSubmit = Input.extend({
       defaults:{
           "type":"submit"
       },
        initialize:function(){
            Input.prototype.initialize.apply(this,arguments);
        }
   }); 
        _.defaults(InputSubmit.prototype.defaults,Input.prototype.defaults);
   return InputSubmit;
});