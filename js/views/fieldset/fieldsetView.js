define([
    "backbone",
    "underscore",
    "views/form/formOptionsView"
],function(Backbone,_,FormOptionsView){
    var FieldsetView = Backbone.View.extend({
        el:'#form-container',
        initialize:function(options){
            this.model = options.model;
            this.templateView =  options.templateView;
            this.menuView = options.menuView;
            this.formOptions = new FormOptionsView({parent:this,model:this.model});
        },
        render:function(){
            this.$el.prepend(this.menuView.render().el);
            return this;
        }
    });
    return FieldsetView;
});