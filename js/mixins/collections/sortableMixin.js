define([
    "helpers/collection/modelInit"
],function(){
    var col = {
    comparator:function(model){
            return model.get("collectionIndex");
        },
        model: function(attrs,options){
            return new (helper.getModel(attrs,options))(attrs,options);
        }
    };
    return col;
    
});