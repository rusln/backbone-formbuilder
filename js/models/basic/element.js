// base Element model, represents a html element
// with global attributes as defaults
define([
    "underscore",
    "backbone",
    "events/event"
],function(_,Backbone,vent){
    var Element = Backbone.Model.extend({
        defaults:{
        // the id attr of this element
        cssId:"id-element-",
        // the css class of this element
        cssClass:"css-element",
        // title attr of this element 
        title:"element",
        // the html element that this model will represent
        // this attribute is left undefined, because it's up to the inhereting
        // class to define it's html representation and so the Element class
        // acts as a bootstrap for attributes and behaviours common to all
        // elements
        element:"",
        // index used only for sorting an element on client side
        // jqueryui.sortable
        collectionIndex:""
        },
        initialize:function(attr,options){
           this.on("change",this.notify);
        },
        notify:function(){
            vent.trigger("element:changed",arguments);
        }
    });
    return Element;
});