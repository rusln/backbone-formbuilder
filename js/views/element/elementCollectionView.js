define([
    "underscore",
    "backbone",
    "collections/elementCollection",
    "views/element/elementCollectionView",
    "events/event",
    "jqueryui/core",
    "jqueryui/mouse",
    "jqueryui/widget",
    "jqueryui/sortable"
],function(_,Backbone){
    var ElementCollectionView = Backbone.View.extend({
        initialize: function(options) {
            this.model = options.model;
            this.collection = this.model.elementCollection;
            this.el = options.el;
            this.optionsView = options.optionsView;
            this.previewView = options.previewView;
            this.elementViewArray = [];
            this.bindEvents;
        },
        bindEvents:function(){
            this.listento(this.collection,"add",this.renderElement);
            this.listenTo(this.collection, "remove sort", this.resetComparator);
            this.listenTo(this.collection, "change:collectionIndex", this.updateViewsArray);
            this.listenTo(vent, "toolbox:add", this.addField);
            this.listenTo(vent, "sort:stop", this.updateIndex);
        },
        render:function(){
            
        }
    });
    return ElementCollectionView;
});