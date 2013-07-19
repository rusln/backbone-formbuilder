define([
    "views/container/containerView",
    "views/header/menu/menuView",
    "views/form/formView",
    "views/form/formOptionsView",
    "views/template/templateView",
    "views/template/templateMenu",
    "views/formPreview/formpreview",
    "views/toolbox/toolboxView",
    "models/basic/form",
    "collections/templateCollection",
    "views/template/field/fieldCollectionView",
    "settings/collections/collectionSettings"
],function(
        ContainerView,
        HeaderMenuView,
        FormView,
        FormOptionsView,
        TemplateView,
        TemplateMenuView,
        FormPreviewView,
        ToolboxView,
        FormModel,
        TemplateCollection,
        getModel
    ){
    
    // init our app 
    var init = function(){
        var headerMenu = new HeaderMenuView();
        
        var templateCollection = new TemplateCollection();
        // form model is a container for templateCollection
        var formModel = new FormModel({collection:templateCollection});
        // collectionView for template collection
        var templateView = new TemplateView({collection:templateCollection,el:"#template"});
        
        // options is bound to formModel 
        var formOptionsView = new FormOptionsView({
            model:formModel,
            parent:templateView
        });
        
        // form view handles formModel
        var formView = new FormView({
            model:formModel,
            templateView:templateView,
            menuView:new TemplateMenuView({parent:templateView,model:formModel,formOptions:formOptionsView})
        });
        var toolboxView = new ToolboxView();
        
        //create the live preview of the form 
        var formPreview = new FormPreviewView({model:formModel,el:"#form-result"});
        var containerView = new ContainerView({
            toolbox:toolboxView,
            headerMenu:headerMenu,
            form:formView,
            formPreview:formPreview
        });
        containerView.render();
    };
   return{
       initialize:init
   };
});