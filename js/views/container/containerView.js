define([
    "underscore",
    "backbone",
    "events/event"
],function(_,Backbone,vent){
    var ContainerView = Backbone.View.extend({
        el:"#container",
        initialize:function(options){
            this.headerMenu = options.headerMenu;
            this.formView = options.form;
            this.toolbox = options.toolbox;
            this.formPreview = options.formPreview;
        },
        render:function(){
            this.headerMenu.render();
            this.formView.render();
            this.formPreview.render();
            this.toolbox.render();
        }
    });
    return ContainerView;
});