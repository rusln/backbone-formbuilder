define([
    "models/basic/element"
],function(Element){
   var Select = Element.extend({
       defaults:{
            multiple:false,
            selectedindex:"",
            required:false,
            size:0
       },
        intialize:function(){
            this.constructor.__super__.initialize.apply(this,arguments);
            
        }
   }); 
_.defaults(Select.prototype.defaults,Element.prototype.defaults);
    return Select;
});