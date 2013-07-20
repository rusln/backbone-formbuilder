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
    var collectionMixin = function(from){
        var to  = this.prototype;
        _.defaults(to,from);
        methodMixin(to,from,"initialize");
    };
    Backbone.Collection.mixin = collectionMixin;
    return Backbone;
});