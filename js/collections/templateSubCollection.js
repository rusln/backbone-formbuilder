define([
    "backbone",
    "helpers/collection/modelInit"
],function(Backbone,helper){
    var TemplateSubCollection = Backbone.Collection.extend({
        comparator:function(model){
            return model.get("collectionIndex");
        },
        model: function(attrs,options){
            return new (helper.getModel(attrs,options))(attrs,options);
        }
    });
    return TemplateSubCollection;
});