define([
    "backbone",
    "underscore",
    "templates/jst",
    "events/event"
],function(Backbone,_,JST,vent){
    var FormOptionsView = Backbone.View.extend({
        tagName:"div",
//        template: _.template(template),
        initialize:function(options){
            this.parent = options.parent;
            this.model = options.model;
            this.listenTo(this.parent,"remove",this.remove);
            this.listenTo(this.model,"change",this.updateData);
        },
        events:{
            "change input":"updateOption"
        },
        updateOption:function(e){
            this.updateModel(this.compareValues(e));
        },
        // compare current value of an option, with value stored in $el.data
        // return false if values are same, an option object if changed
        compareValues:function(e){
            var value = e.currentTarget.value,
                attr = e.currentTarget.className;
            if(this.$el.data(attr) === value) return false;
            if(this.$el.data(attr) !== value) return {value:value,attr:attr};
        },
        //pass an option object, or false if options haven't changed
        updateModel:function(option){
            if(arguments[0]===false) return;
            this.model.set(option.attr,option.value);
            vent.trigger("template:model",this.model);
        },
        render:function(){
            this.bindData(this.$el,this.model);
            this.$el.html(this.parseTemplate(this.model));
            return this;
        },
        // bind model attrs to $el.data 
        bindData:function($el,model){
            _.each(model.attributes,function(value,attr){
                if(!_.isObject(value)) $el.data(attr,value);
            },this);
        },
        //update $el.data when model.changed attr
        updateData:function(model){
            this.$el.data(model.changed);
        },
        // run _.tempplate() on JST
        parseTemplate:function(model){
            return JST["template/options"](model.toJSON());
        }
    });
    
    return FormOptionsView;
});