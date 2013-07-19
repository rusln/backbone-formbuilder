define([
"models/basic/input"
],function(Input){
   var InputHidden = Input.extend({
       defaults:{
           type:"hidden",
            // value will be submitted to the server
            value:""
       },
        initialize:function(){
            Input.prototype.initialize.apply(this,arguments);
            console.log("input type hidden initialized");
        }
   }); 
    _.defaults(InputHidden.prototype.defaults,Input.prototype.defaults);
   return InputHidden;
});