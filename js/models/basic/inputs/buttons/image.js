define([
"models/basic/input"
],function(Input){
   var InputImage = Input.extend({
       defaults:{
           type:"image",
            alt:"",
            src:"",
            // html5 attr, not sure of support in browsers
//            height:"",
//            width:""
            
       },
        initialize:function(){
            Input.prototype.initialize.apply(this,arguments);
            console.log("input type image initialized");
        }
   }); 
   _.defaults(InputImage.prototype.defaults,Input.prototype.defaults);
   return InputImage;
});