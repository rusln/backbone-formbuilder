define([
    "jquery",
    "backbone",
    "underscore",
    "events/event"
],function($,Backbone,_,vent){
    var Menu   = Backbone.View.extend({
        el:"#menu",
//        template:_.template(template),
//        menu:{
//            file:$("#menu-file"),
//            settings:$("#menu-settings"),
//            preview:$("#menu-preview")
//        },
        events:{
            "click #menu-file":"showFileActions",
            "click #menu-settings":"showSettings",
            "click #menu-preview":"previewForm"
        },
        previewForm:function(e){
            vent.trigger("topmenu:previewForm");
        },
        showFileActions:function(e){
            vent.trigger("topmenu:showFileActions");
    
        },
        showSettings:function(e){
            vent.trigger("topmenu:showSettings");
    
        },
        render:function(){}
    });
    return Menu;
});