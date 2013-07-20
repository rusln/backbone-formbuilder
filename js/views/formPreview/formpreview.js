
define([
    "underscore",
    "backbone",
    "events/event",
    'text!templates/formResultTemplate.html'
],function(_,Backbone,vent,template){
    var FormPreview = Backbone.View.extend({
        template: _.template(template),
        events:{},
        togglePreview:function(e){
            this.$el.toggle();
        },
        initialize:function(options){
            this.model = options.model;
            this.collection = this.model.fields;
            this.el = options.el;
            console.log(this.collection);
            this.listenTo(this.collection,"add",this.addField);
            this.listenTo(this.collection,"remove",this.removeField);
            this.listenTo(this.collection,"sort",this.render);
            this.listenTo(vent,"topmenu:previewForm",this.togglePreview);
            this.listenTo(vent,"template:model",this.updatePreview);
        },
        updatePreview: function(model){
            this.$el.find("#"+model.cid).html(this.renderField(model));
        },
        addField:function(model){
            this.$el.append(this.renderField(model));
        },
        removeField:function(model){
            this.$el.find("#"+model.cid).remove();
        },
        render:function(){
            this.$el.empty();
            this.collection.each(function(model){
                this.$el.append(this.renderField(model));
            },this);
            return this;
        },
        renderField:function(model){
            var span = $("<span>").attr("id",model.cid);
            span.html(this.getTemplate(model));
            return span;
        },
        renderCollection:function($el,collection){
                $el.empty();
                collection.each(function(model){
                $el.append(this.renderField(model));
                },this);
        },
        getTemplate:function(model){
            return JST[this.searchTemplate(model)](model.toJSON());
        },
        searchTemplate:function(model){
            return "preview/"+model.get("element")+(model.get("type") ? "/"+model.get("type"):"");
        }
    });
    return FormPreview;
});