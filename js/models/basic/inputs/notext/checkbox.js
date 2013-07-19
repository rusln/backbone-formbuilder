define([
    "backbone",
    "underscore",
    "mixins/globalhtmlattr"
],function(Backbone,_,globalMixin){
   var InputCheckbox = Backbone.Model.extend({
       defaults:{
           type:"checkbox",
            // value to send to the server
            value:"",
//            is this value checked 
            checked:false,
            // set the state of the checkbox to indeterminate
            indeterminate:""
       }        
   }); 
            _.defaults(InputCheckbox.prototype.defaults,globalMixin);
   return InputCheckbox;
});