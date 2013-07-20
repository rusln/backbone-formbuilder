define([
    "jqueryui/core",
    "jqueryui/mouse",
    "jqueryui/widget",
    "jqueryui/sortable"
],function(){
    // everything related to sortable view goes here
    var sortableMix  = {
       events:{},
       initialize:function(){
            this.initSortable();
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
        updateIndex: function(sortable) {
            if (sortable.model.get("collectionIndex") !== sortable.index)
                this.sortCollection(sortable);
        },
        initSortable:function(){
            this.$el.sortable({
                handle: ".field-move",
                start: function(event, ui) {
                    console.log("start");
                    console.log(ui.item.index());
                    ui.item.trigger("sort:start", ui.item.index());
                },
                stop: function(event, ui) {
                    console.log("stop");
                    console.log(ui.item.index());
                    
                    ui.item.trigger("sort:stop", ui.item.index());
                }
            });
        },
        sortCollection: function(sortable) {
            this.changeModelIndex(sortable);
            console.log("hallo world");
            this.collection.sort();
        },
        changeModelIndex:function(sortableObj){
            if(sortableObj.model.get("collectionIndex") > sortableObj.index){
                sortableObj.model.set("collectionIndex", (sortableObj.index -1));    
            }
            else if(sortableObj.model.get("collectionIndex") < sortableObj.index){
                sortableObj.model.set("collectionIndex", (sortableObj.index +1));    
            }
        }
    };
    
    return sortableMix;
    
});