define([
    "underscore",
    "backbone",
    "models/toolboxModel"
],function(_,Backbone,tool){
    
    var ToolboxCollection  = Backbone.Collection.extend({
        model: tool
    });
    
    return ToolboxCollection;
});