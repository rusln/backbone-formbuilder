define(["underscore"],function(_){
JST = {};
//eventualy, this should go into a helper function
JST.getTemplate = function(model,templateType){
        // (templatetype,element,[type])
        return this[templateType +"/"+ model.get('element')+(model.get('type') ?"/"+ model.get('type'):"")];
};
JST["preview/"] = _.template("<label class='field-label'>{{labelValue}}</label><input type='{{type}}'/>");
JST["preview/input/"] = _.template("<label class='field-label'>{{labelValue}}</label><input type='{{type}}'/>");
JST["template/menu"] = _.template("<div class='form-menu btn-group'><button class='btn btn-small toggle-visual'><i class='icon-pencil'></i></button><button class='btn btn-small toggle-options'><i class='icon-wrench'></i></button><span class='btn btn-small btn-ok  save-form'><i class='icon-ok'></i></span></div><div class='form-options'></div>");
JST["preview/input/text"] = _.template("<label class='field-label'>{{labelValue}}</label><input type='text'/>");
JST["preview/input/password"] = _.template("<label class='field-label'>{{ labelValue }}</label><input type='password'/>");
JST["preview/input/button"] = _.template("<input type='button' value= ' {{ value }} ' />");
JST["preview/input/image"] = _.template("<input type='image' src='{{ src }}' alt='{{ alt }}'/>");
JST["preview/input/reset"] = _.template("<input type='reset'/>");
JST["preview/input/submit"] = _.template("<input type='submit'/>");
JST["preview/input/file"] = _.template("<label class='field-label'>{{ labelValue }}</label><{{element}} type='{{type}}'/>");
JST["preview/input/hidden"] = _.template("<input type='hidden'/>");
JST["preview/input/radio"] = _.template("<label class='field-label'>{{ labelValue }}</label><input type='radio' value='{{ value }}'/>");
JST["preview/fieldset"] = _.template("<fieldset><legend>{{ legend }}</legend></fieldset>");
JST["preview/textarea"] = _.template("<textarea >{{ value }}</textarea>");
JST["preview/optgroup"] = _.template("<optgroup></optgroup>");

JST["template/options"] = 
        _.template("<label>class</label><input type='text' value='{{ cssClass }}' class='cssClass' />\n\
                    <label>id</label><input type='text' value='{{ cssId }}' class='cssId' />\n\
                    <label>action</label><input type='text' value='{{ action }}' class='action'>\n\
                    <label>method</label><input type='text' value='{{ method }}' class='method'/ >\n\
                    <label>target</label><input type='text' value='{{ target }}' class='target'/>");
    
JST["field/options/fieldset"] = 
        _.template("<label>class</label><input type='text' value='{{ cssClass }}' class='cssClass' />\n\
                    <label>id</label><input type='text' value='{{ cssId }}' class='cssId' />\n\
                    <label>title</label><input type='text' value='{{ legend }}' class='legend'>");
JST["field/options/textarea"] = 
        _.template("<label>class</label><input type='text' value='{{ cssClass }}' class='cssClass' />\n\
                    <label>id</label><input type='text' value='{{ cssId }}' class='cssId' />\n\
                    <label>title</label><input type='text' value='' class='legend'>");
JST["field/options/optgroup"] = 
        _.template("<label>class</label><input type='text' value='{{ cssClass }}' class='cssClass' />\n\
                    <label>id</label><input type='text' value='{{ cssId }}' class='cssId' />\n\
                    <label>title</label><input type='text' value='' class='legend'>");


JST["field/options/input/text"] = 
_.template("<label> label </label><input type='text' value='{{ labelValue }}' class='labelValue' /> \n\
            <label>class </label><input type='text' value='{{ cssClass }}'class='cssClass'/>\n\
            <label>id</label><input type='text' value='{{ cssId }}' class='classId'/> \n\
            <label>required</label><input type='checkbox' value='' class='required' />");
//JST["field/options/input/text"] = 
//_.template("<label> label </label><input type='text' value='{{ labelValue }}' class='labelValue' /> \n\
//            <label>class </label><input type='text' value='{{ cssClass }}'class='cssClass'/>\n\
//            <label>id</label><input type='text' value='{{ cssId }}' data-option='classId'/> \n\
//            <label>required</label><input type='checkbox' value='' data-option='required' />");
    
JST["field/options/input/password"] = 
_.template("<label> label </label><input type='text' value='{{ labelValue }}'class='labelValue' />\n\
            <label>class</label><input type='text' value='{{ cssClass }}' class='cssClass'/>\n\
            <label>id</label><input type='text' value='{{ cssId }}' data-option='classId'/> \n\
            <label>required</label><input type='checkbox' value='' data-option='required' />");
    
JST["field/options/input/button"] = 
_.template("<label> text </label><input type='text' value='{{ value }}'  class='value' />\n\
            <label>css class:</label><input type='text' value='{{ cssClass }}' class='cssClass' />");  
    
JST["field/options/input/image"] = 
        _.template("<label>css class:</label><input type='text' value='{{ cssClass }}' class='cssClass'\n\
                    <label> image source</label><input type='file' value='{{ src }}' class='src' >\n\
                    <label> alternative text</label><input type='text' class='alt'>\n\
                    ");
    
JST["field/options/input/reset"] = 
        _.template("<label>css class:</label><input type='text' value='{{ cssClass }}' class='cssClass'\n\
            <label>css id: </label><input type='text' value='{{ cssId }}' class='cssId' /> />");
    
JST["field/options/input/submit"] = 
        _.template("<label> Label </label><input type='text' value=''  class = 'labelValue' />\n\
            <label>css class:</label><input type='text' value='{{ cssClass }}' class='classClass' />");
    
JST["field/options/input/file"] = 
        _.template("<label> Label </label><input type='text' value='{{ labelValue }}' class='labelValue'  />\n\
            <label>css class:</label><input type='text' value='{{ cssClass }}' class='cssClass' />\n\
            <label>accept</label><input type='text' value='{{ accept }}' class='accept' />\n\
            <label>css id:</label><input type='text' value='{{ cssId }}' class='cssId' />");
    
JST["field/options/input/hidden"] = 
        _.template("<label> Label </label><input type='text' value='{{ labelValue }}'  class = 'labelValue' />\n\
            <label>css class:</label><input type='text' value='{{ cssClass }}' class='classClass' />\n\
            <label>css id:</label><input type='text' value='{{ cssId }}' class='classID' />\n\
            <label>value</label><input type='text' value='{{ value }}' class='value' >");
    
JST["field/options/input/radio"] = 
        _.template("<label> Label </label><input type='text' value='{{ labelValue }}' class='labelValue'  />\n\
            <label>css class:</label><input type='text' value='{{ cssClass }}' class='cssClass'  />\n\
            <label> css id:</label> <input type='text' value='{{ cssId }}' clas='cssId' \n\
            <label> value</label><input type='text' value='{{ value }}' class='value' />");
    
    return JST;
});