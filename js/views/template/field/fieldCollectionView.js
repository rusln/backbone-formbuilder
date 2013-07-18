// elementCollectionView
define([
    "backbone",
    "underscore",
    "views/template/field/fieldView",
    "views/template/field/optionsView",
    "views/template/field/fieldPreviewView",
    "text!templates/fieldCollectionTemplate.html",
    "events/event",
    "jqueryui/core",
    "jqueryui/mouse",
    "jqueryui/widget",
    "jqueryui/sortable"
], function(Backbone, _, FieldView,OptionsView,FieldPreview,fieldCollectionTemplate,vent) {
    var FieldCollectionView = Backbone.View.extend({
        tagName:"li",
        className:"field-template",
        fields: [],
        activeSortable:false,
        template:_.template(fieldCollectionTemplate),
        events: {
            "click .delete-collection": "removeSelf",
            "click .delete": "removeField",
            "click .toggle-collection-options":"toggleSettings",
            "click .toggle-collection-visual-options":"toggleVisualSettings"
        },
        removeSelf:function(e){
            this.model.destroy();
        },
        initialize: function(options) {
            this.model = options.model;
            this.collection = this.model.fields;
            this.optionsView = new OptionsView({model:this.model,parent:this});
            this.fieldPreviewView = new FieldPreview({model:this.model,parent:this});
//            this.el = options.el;
//            this.setupSortable();
            this.bindEvents();
        },
        bindEvents:function(){
            this.listenTo(this.model,"destroy",this.remove);
            this.listenTo(this.collection, "add", this.renderField);
            this.listenTo(this.collection, "remove sort", this.resetComparator);
//            this.listenTo(vent, "sort:stop", this.updateIndex);
        },
        setupSortable: function() {
            this.$el.sortable({
                handle: ".subfield-move",
//                connectedWith:"#template",
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
//            if(field.element === "fieldset") field.templateCollection = new TemplateCollection();
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
        renderField: function(field) {
            field.set("cssId", field.cid);
            var fieldView = new FieldView({model: field});
            this.fields.push(fieldView);
            this.fieldContainer.append(fieldView.render().el);
        },
        renderCollection: function() {
            this.collection.each(function(field) {
                this.renderField(field);
            }, this);
        },
        render: function() {
            this.$el.append(this.template());
            this.createPreview();
            this.fieldContainer = this.$el.find(".field-preview-container");
            this.fieldContainer.append(this.renderCollection());
            return this;
        },
        createPreview:function(){
            if(!this.fieldPreview) this.fieldPreview = this.$el.find(".field-preview");
            this.fieldPreview.prepend(this.fieldPreviewView.render().el);
        },
        toggleSettings:function(e){
            if(!this.optionToggle){ 
                this.optionToggle = this.$el.find(".field-collection-options");
                this.optionToggle.html(this.optionsView.render().el);
                return;
            };
            this.optionToggle.slideToggle(160);
        },
        toggleVisualSettings:function(e){
            if(this.activeSortable) this.disableSortable();
            if(!this.activeSortable) this.activateSortable();
        },
        activateSortable:function(){
            this.listenTo(vent, "toolbox:add", this.addField);
            this.listenTo(vent, "sort:stop", this.updateIndex);
            this.activeSortable = true;
            vent.trigger("active:sortable",this);
        },
        disableSortable:function(){
            this.stopListening(vent);
            this.stopListening(vent);
            this.activeSortable = false;
            vent.trigger("disabled:sortable",this);
        }
    });
    return FieldCollectionView;
});