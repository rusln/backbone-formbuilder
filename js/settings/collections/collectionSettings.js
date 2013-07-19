define([
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
    "models/basic/fieldset"
], function(
        ) {
    var models = [].slice.call(arguments);
    var getModel = function(attrs,options) {
        //[].filter == ie9 + :/
        return models.filter(function(model) {
            if(attrs.type){return model.prototype.defaults.type === attrs.type ? model:false ;}
            else{return model.prototype.defaults.element === attrs.element ? model : false;}
        })[0];
    };
    return{getModel:getModel};
});