define([
    "backbone",
    "underscore",
    "views/template/field/fieldView",
    "views/template/field/fieldCollectionView",
    "events/event",
    "mixins/views/sortable",
    "collections/templateSubCollection"
], function(Backbone, _, FieldView,FieldCollectionView, vent, sortableMixin,TemplateSubCollection) {
    var TemplateView = Backbone.View.extend({
        fields: [],
        activeSortable:true,
        initialize: function(options) {
            this.collection = options.collection;
            this.el = options.el;
            this.listenTo(this.collection, "add", this.renderField);
            this.listenTo(this.collection, "remove sort", this.resetComparator);
            this.listenTo(this.collection, "change:collectionIndex", this.sortFields);
            this.listenTo(vent, "toolbox:add", this.addField);
            this.listenTo(vent, "sort:stop", this.updateIndex);
            this.listenTo(vent, "field:removed", this.removeField);
//            this.listenTo(vent, "active:sortable", this.disableSortable);
//            this.listenTo(vent, "disabled:sortable", this.activateSortable);            
        },
        //sort the fields array by collectionIndex
        sortFields:function(){
                this.fields = _.sortBy(this.fields,function(field){
                    return field.model.get("collectionIndex");
                });
        },
        // event handler for toolbox:add event
        addField: function(field) {
            field.collectionIndex = this.collection.length;
            if(field.element === "fieldset") field.fields = new TemplateSubCollection();
            this.collection.add(field);
        },
        // remove a field view from fieds array
        removeField: function(field) {
            this.fields = this.filterFieldsArray(this.fields,field.index);
        },
        
        // return a cleaned up fields array
        filterFieldsArray:function(fields,index){
            return  _.filter(fields,function(field){
                        return field.model.get("collectionIndex")!== index;
                },this);
        },
        // collection ADD event handler
        renderField: function(model) {
            model.set("cssId", model.cid);
            var view = model.fields ? new FieldCollectionView({model:model}) : new FieldView({model:model});
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
        },
        activateSortable:function(){
            this.activeSortable = true;
            vent.trigger("active:sortable",this);
        },
        disableSortable:function(){
            this.activeSortable = false;
            vent.trigger("disabled:sortable",this);
        }
    });
    TemplateView.mixin(sortableMixin);
    return TemplateView;
});