// elementCollectionView
define([
    "collections/templateSubCollection",
    "backbone",
    "underscore",
    "views/template/field/fieldView",
    "views/template/field/fieldCollectionView",
    "events/event",
    "jqueryui/core",
    "jqueryui/mouse",
    "jqueryui/widget",
    "jqueryui/sortable"
], function(TemplateSubCollection,Backbone, _, FieldView,FieldCollectionView, vent) {
    var TemplateView = Backbone.View.extend({
        fields: [],
        events: {
            "click .delete": "removeField"
        },
        initialize: function(options) {
            this.collection = options.collection;
            this.el = options.el;
            this.setupSortable();
            this.listenTo(this.collection, "add", this.renderField);
            this.listenTo(this.collection, "remove sort", this.resetComparator);
            this.listenTo(this.collection, "change:collectionIndex", this.updateViewsArray);
            this.listenTo(vent, "toolbox:add", this.addField);
            this.listenTo(vent, "sort:stop", this.updateIndex);

        },
        setupSortable: function() {
            this.$el.sortable({
                handle: ".field-move",
                start: function(event, ui) {
                    ui.item.trigger("sort:start", ui.item.index());
                },
                stop: function(event, ui) {
                    ui.item.trigger("sort:stop", ui.item.index());
                }
            });
        },
        // sortable.model, sortable.index
        updateIndex: function(sortable) {
            if (sortable.model.get("collectionIndex") !== sortable.index)
                this.sortCollection(sortable);
        },
        sortCollection: function(sortable) {
            this.changeModelIndex(sortable);
            this.collection.sort();
        },
        changeModelIndex:function(sortable){
            if(sortable.model.get("collectionIndex")>sortable.index){
                sortable.model.set("collectionIndex", (sortable.index -1));    
            }
            else if(sortable.model.get("collectionIndex")<sortable.index){
                sortable.model.set("collectionIndex", (sortable.index +1));    
            }
        },
        resetComparator:function(){
            this.collection.each(function(element,index){
                element.set("collectionIndex",index);
            });
        },
        updateViewsArray:function(){
                this.fields = _.sortBy(this.fields,function(field){
                    return field.model.get("collectionIndex");
                });
        },
        // event handler for toolbox:add event
        addField: function(field) {
            field.collectionIndex = this.collection.length;
            if(field.element === "fieldset") field.fields = new TemplateSubCollection();
            console.log(field);
            this.collection.add(field);
        },
        // get id of a field tempate
        getId: function(e) {
            return $(e.currentTarget).closest(".field-template").attr("id");
        },
        getIndex: function(e) {
            return $(e.currentTarget).closest(".field-template").index();
        },
        removeField: function(e) {
            var index = this.getIndex(e),
            fieldView = this.findFieldView(index);
            fieldView.$el.slideToggle(100)
                    .promise()
                    .done(function() {
                fieldView.model.destroy();
                fieldView.remove();
            });
            this.fields = this.filterFieldsArray(this.fields,index);
            console.log(this.fields);
        },
        filterFieldsArray:function(fields,index){
            return  _.filter(fields,function(field){
                        return field.model.get("collectionIndex")!== index;
                },this);
        },
        findFieldView: function(index){
            return  _.find(this.fields,function(field){
                    return field.model.get("collectionIndex") === index;
                },this);
            
        },
        // collection ADD event handler
        renderField: function(model) {
            var view;
            model.set("cssId", model.cid);
            if(model.fields){
                view = new FieldCollectionView({model:model});
            }else{
            view = new FieldView({model: model});
            }
            this.fields.push(view);
            this.$el.append(view.render().el);
        },
        renderCollection: function() {
            this.collection.each(function(field) {
                this.renderField(field);
            }, this);
        },
        render: function() {
            this.$el.append(this.renderCollection);
            return this;
        }
    });
    return TemplateView;
});