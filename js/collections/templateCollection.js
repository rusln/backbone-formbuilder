define([
    "backbone",
    "settings/collections/collectionSettings"
],function(Backbone,helper){
    var TemplateCollection = Backbone.Collection.extend({
        comparator:function(model){
            return model.get("collectionIndex");
        },
        model: function(attrs,options){
            // search for the right model based on attrs, and return a new instance 
            return new (helper.getModel(attrs,options))(attrs,options);
        }
    });
    return TemplateCollection;
});