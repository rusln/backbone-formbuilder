define([
    "backbone",
    "underscore",
    "views/template/field/optionsView",
    "views/template/field/fieldPreviewView",
    "text!templates/fieldTemplate.html",
    "events/event",
    "jqueryui/core",
    "jqueryui/widget",
    "jqueryui/mouse",
    "jqueryui/resizable"
],function(Backbone,_,OptionsView,FieldPreview,template,vent){
    var FieldView = Backbone.View.extend({
        tagName:"li",
        className:"field-template",
        template:_.template(template),
        events:{
            "click .toggle-options":"toggleSettings",
            "click .toggle-visual-options":"toggleVisualSettings",
//            "click .delete": "removeField",
            "sort:start":"startSorting",
            "sort:stop":"stopSorting"
        },
        startSorting:function(event,index){
            vent.trigger("sort:start",{model:this.model,index:index});
    
        },
        stopSorting:function( event ,index){
            vent.trigger("sort:stop",{model:this.model,index:index});
        },
        initialize:function(){
            this.optionsView = new OptionsView({model:this.model,parent:this});
            this.fieldPreviewView = new FieldPreview({model:this.model,parent:this});
        },
        render:function(){
            // assign  model's cid to this view's id
            this.$el.attr("id",this.model.cid);
            // template is empty atm
            this.$el.html(this.template());
            this.createPreview();
            return this;
        },
        // template level preview of the element
        createPreview:function(){
            if(!this.fieldPreview) this.fieldPreview = this.$el.find(".field-preview");
            this.fieldPreview.append(this.fieldPreviewView.render().el);
        },
        //display options, setup the options view on the first request
        // all additional requests will only slidetoggle
        toggleSettings:function(e){
            if(!this.optionToggle){ 
                this.optionToggle = this.$el.find(".field-options");
                this.optionToggle.html(this.optionsView.render().el);
            };
            this.optionToggle.slideToggle(160);
//            vent.trigger("fieldview:toggleOptions",{active:this.$el});
            
        },
        toggleVisualSettings:function(e){
            this.$el.resizable({
                handles:"e,w",
                containment:"parent",
                grid:[230,0]
            });
            if(this.$el.resizable("option","disabled")){
                this.$el.resizable("option","enabled",true);
            }
            
        }
    });
    return FieldView;
});