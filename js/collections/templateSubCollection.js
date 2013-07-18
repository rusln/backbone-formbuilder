define([
    "backbone",
    "models/basic/inputs/buttons/image",
    "models/basic/inputs/buttons/reset",
    "models/basic/inputs/buttons/submit",
    "models/basic/inputtext",
    "models/basic/inputs/buttons/button",
    "models/basic/inputs/notext/hidden",
    "models/basic/inputs/notext/file",
    "models/basic/inputs/notext/radio",
    "models/basic/inputs/text/password",
    "models/basic/textarea",
    "models/basic/optgroup",
    "models/basic/fieldset",
    "events/event",
    "localstorage"
],function(
        Backbone,
        InputImage,
        InputReset,
        InputSubmit,
        InputText,
        InputButton,
        InputHidden,
        InputFile,
        InputRadio,
        InputPassword,
        Textarea,
        Optgroup,
        Fieldset,
        vent){
    var Template = Backbone.Collection.extend({
        initialize:function(){

        },
//        localStorage: new Backbone.LocalStorage("templateCollection"),
        comparator:function(a,b){
            if(a.get('collectionIndex') > b.get("collectionIndex")){
                return 1;
            }
            if(a.get("collectionIndex")< b.get("collectionIndex")){
                return -1;
            }
            if(a.get("collectionIndex") === b.get("collectionIndex")){
                return 0;
            }
        },
        model: function(attrs,options){
            // setup the initial event for change event
//            if(!attrs) return new Element(attrs,options);
            if(attrs.element === "input"){
                if(!attrs.type) return  new Error("the model is faulted") ;
                if(attrs.type==="text")  return new InputText(attrs,options);
                if(attrs.type==="button") return new InputButton(attrs,options);
                if(attrs.type==="checkbox") return new InputCheckbox(attrs,options);
                if(attrs.type==="file") return new InputFile(attrs,options);
                if(attrs.type==="hidden") return new InputHidden(attrs,options);
                if(attrs.type==="image") return new InputImage(attrs,options);
                if(attrs.type==="password") return new InputPassword(attrs,options);
                if(attrs.type==="radio") return new InputRadio(attrs,options);
                if(attrs.type==="reset") return new InputReset(attrs,options);
                if(attrs.type==="submit") return new InputSubmit(attrs,options);
            }
            if(attrs.element==="textarea"){
                return new Textarea(attrs,options);
            }
            if(attrs.element==="fieldset"){
                return new Fieldset(attrs,options);
            }
            if(attrs.element==="label"){
                return new Label(attrs,options);
            }
            if(attrs.element==="select"){
                return new Select(attrs,options);
            }
            if(attrs.element==="option"){
                return new Option(attrs,options);
            }
            if(attrs.element==="optgroup"){
                return new Optgroup(attrs,options);
            }
            else{
                return new Error("unsupported element");
                
            }
        }
    });
    return Template;
});