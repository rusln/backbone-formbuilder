define([
    "models/basic/input",
        "mixins/labelMixin"
],function(Input,labelMixin){
    var Password = Input.extend({
        defaults:{
            labelValue:"password",
            labelFor:"",
            // max length for the password
            maxlength:"",
            // defaults size is 20
            size:20
        },
        initialize:function(){
            Input.prototype.initialize.apply(this,arguments);
        }
    });
    _.defaults(Password.prototype.defaults,Input.prototype.defaults,labelMixin);
    return Password;
});