define([
    "underscore",
    "backbone",
    "templates/jst"
], function(_, Backbone, JST) {
    var FieldPreview = Backbone.View.extend({
        tagName: "div",
        initialize:function(options){
            this.parent = options.parent;
            this.model = options.model;
            this.listenTo(this.model,"change",this.updatePreview);
            this.listenTo(this.parent,"remove",this.remove);
        },
        updatePreview:function(){
            this.render();
        },
        render: function() {
            this.$el.html(this.getTemplate(this.model));
            return this;
        },
        getTemplate:function(model){
            return JST[this.searchTemplate(model)](model.toJSON());
        },
        searchTemplate:function(model){
            return "preview/"+model.get("element")+(model.get("type") ? "/"+model.get("type"):"");
        }
});
    return FieldPreview;
});