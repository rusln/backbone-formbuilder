define([
    "backbone",
    "settings/collections/collectionSettings"
],function(Backbone,helper){
    var Template = Backbone.Collection.extend({
        comparator:function(model){
            return model.get("collectionIndex");
        },
        model: function(attrs,options){
            return new (helper.getModel(attrs,options))(attrs,options);
        }
    });
    return Template;
});