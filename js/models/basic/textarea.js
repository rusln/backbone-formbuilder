define([
    "models/basic/element"
],function(Element){
   var TextArea = Element.extend({
       defaults:{
           element:"textarea",
            cols:"",
            rows:"",
            //prevent interaction, prevent submission
            disabled:"false",
            name:"",
            // disable interaction, will be submitted
            readonly:false,
            selectionEnd:"",
            selectionStart:"",
            value:""
       },
        intialize:function(){
            Element.prototype.initialize.apply(this,arguments);
        }
   }); 
_.defaults(TextArea.prototype.defaults,Element.prototype.defaults);
    return TextArea;
});