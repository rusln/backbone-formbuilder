define([
"models/basic/input"
],function(Input){
   var InputFile = Input.extend({
       defaults:{
           type:"file",
            // type of files this control can select
            accept:"",
            labelValue:"",
            labelFor:""
                
       },
        initialize:function(){
            Input.prototype.initialize.apply(this,arguments);
        }
   }); 
   _.defaults(InputFile.prototype.defaults,Input.prototype.defaults);
   return InputFile;
});