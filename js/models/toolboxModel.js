define([
    "backbone",
    "underscore"
],function(Backbone,_){
    var ToolboxModel = Backbone.Model.extend({
        defaults:{
            element:"",
            type:"",
            name:""
        },
        initialize:function(){
        }
    });
    return ToolboxModel;
});