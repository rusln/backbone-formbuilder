define([
    "jquery",
    "underscore",
    "backbone",
    "text!templates/toolboxTemplate.html",
    "collections/toolboxCollection",
    "events/event"
],function($,_,Backbone,template,ToolboxCollection,vent){
            var tools = [
        {name:"text",element:"input",type:"text"},
        {name:"password",element:"input",type:"password"},
        {name:"button",element:"input",type:"button"},
        {name:"image button",element:"input",type:"image"},
        {name:"reset button",element:"input",type:"reset"},
        {name:"submit button",element:"input",type:"submit"},
        {name:"file",element:"input",type:"file"},
        {name:"hidden input",element:"input",type:"hidden"},
        {name:"textarea",element:"textarea"},
        {name:"fieldset",element:"fieldset"},
        {name:"option group",element:"optgroup"},
    ];
        var toolBoxCollection = new ToolboxCollection(tools);
    var Toolbox = Backbone.View.extend({
        el:"#toolbox",
        collection:Toolbox,
        template:_.template(template),
        events:{
            "click button":"addField"
        },
        initialize:function(){
            this.collection = toolBoxCollection;
        },
        render:function(){
            this.collection.each(function(model){
                this.$el.append(this.template(model.toJSON()));
            },this);
        },
        addField:function(e){
            var d = e.currentTarget.dataset, options =  {};
            options.element = d.element;
            if(d.type) options.type = d.type;
            vent.trigger("toolbox:add",options);
        }
    });
    
    return Toolbox;
});