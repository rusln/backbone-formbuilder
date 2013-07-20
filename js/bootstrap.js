define([
    "settings/underscore/underscoreSettings",
    "mixins/views/viewMixin",
    "mixins/collections/collectionMixin"
],function(){
    var libs = [].slice.call(arguments),
        init = function(){
            libs.forEach(function(lib){
                if(typeof lib === "function") lib();
            });
        };
        
    return {initialize:init};
});