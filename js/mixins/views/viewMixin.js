define(["underscore","backbone"],function(_,Backbone){
    // credits go to : http://open.bekk.no/mixins-in-backbone/
    var methodMixin = function(to,from,methodName){
        if(! _.isUndefined(from[methodName])){
            var old  = to[methodName];
            
            to[methodName] = function(){
                var oldReturn  = old.apply(this,arguments);
                from[methodName].apply(this,arguments);
                
                return oldReturn;
            };
        }
    };
    var viewMixin = function(from){
        var to  = this.prototype;
        _.defaults(to,from);
        _.defaults(to.events,from.events);
        methodMixin(to,from,"initialize");
        methodMixin(to,from,"render");
    };
    Backbone.View.mixin = viewMixin;
    return Backbone;
});