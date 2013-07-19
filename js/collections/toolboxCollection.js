define([
    "underscore",
    "backbone",
    "models/toolboxModel"
],function(_,Backbone,tool){
    var ToolboxCollection  = Backbone.Collection.extend({
        // :o
        model: tool
    });
    return ToolboxCollection;
});