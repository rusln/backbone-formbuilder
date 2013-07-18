require.config({
    paths:{
        "text":"libs/requirejs-text/text",
        "jquery":"libs/jquery/jquery",
        "jqueryui":"libs/jquery.ui/jqueryui",
        "underscore":"libs/underscore-amd/underscore",
        "backbone":"libs/backbone-amd/backbone",
        localstorage:"libs/backbone.localStorage/backbone.localStorage",
        "templates":"../templates"
    }
});

require(["app"],function(app){
    app.initialize();
});