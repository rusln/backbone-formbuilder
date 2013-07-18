define([
"models/basic/input"
],function(Input){
   var InputRadio = Input.extend({
       defaults:{
           "type":"radio",
            // label for this element
            labelValue:"",
            // label for this element
            labelFor:"",
            // value that will be submitted by this button
            value:"",
            // if selected by default
            checked:false,
            // radio buttons with the same name attr belong to a group;
            // where only one radio button can be selected att
            name:""
       },
        initialize:function(){
            Input.prototype.initialize.apply(this,arguments);
        }
   }); 
    _.defaults(InputRadio.prototype.defaults,Input.prototype.defaults);
   return InputRadio;
});