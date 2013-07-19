define([
    "settings/underscore/underscoreSettings"
],function(){
    var libs = [].slice.call(arguments),
        init = function(){
            libs.forEach(function(lib){
                if(typeof lib === "function") lib();
            });
        };
        
    return {initialize:init};
});