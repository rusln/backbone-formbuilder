define([
    "mixins/labelMixin",
    "models/basic/input"
], function(labelMixin,Input) {
    var InputText = Input.extend({
        defaults: {
//        autocomplete:"",
            list: "",
            maxlength: "",
//        max :"",
//        min:"",
//        step : "",
//        pattern : "",
            placeholder: "",
            readonly: "",
//        required : "",
//        checked :"",
//        accept : "",
            // defaults size of an text input is 20
            size: 20,
            type:"text"
//        spellcheck : "",
//        multiple : "",
//        autosave : ""
        },
        initialize: function() {
//            console.log("input of type text initialized");
                Input.prototype.initialize.apply(this,arguments);
        }
    });
    _.defaults(InputText.prototype.defaults, Input.prototype.defaults, labelMixin);
//    _.defaults(InputText.prototype.defaults, labelMixin);

    return InputText;

});
