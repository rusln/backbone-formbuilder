define([
    "backbone",
    "underscore",
    "models/basic/option"
],function(Backbone,_,Option){
    var Options = Backbone.Collection.extend({
        model:Option
    });
    return Options;
});