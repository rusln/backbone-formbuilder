define([
    "underscore",
    "backbone",
    "templates/jst"
],function(_,Backbone,JST){
    var TemplateMenu  = Backbone.View.extend({
        template:JST["template/menu"],
        initialize:function(options){
            this.model = options.model;
            this.parent = options.parent;
            this.optionsContainer = options.formOptions;
            this.listenTo(this.parent,"remove",this.remove);
            this.listenTo(this.model,"change",this.updateSettings);
        },
        render:function(){
            this.$el.html(this.template());
            return this;
        },
        events:{
            "click .toggle-options": "toggleSettings",
            "click .toggle-visual": "toggleVisualSettings",
            "click .save-form":"saveForm"
        },
        toggleSettings:function(e){
            if(!this.displayOptions){
                console.log("once");
                this.displayOptions = this.$el.find(".form-options");
                this.displayOptions.append(this.optionsContainer.render().el);
            }
            this.displayOptions.slideToggle(160);
        },
        saveForm:function(e){
//            this.model.save();
            
        },
        toggleVisualSettings:function(e){
            console.log(this.model.toJSON());
        }
    });
    return TemplateMenu;
});