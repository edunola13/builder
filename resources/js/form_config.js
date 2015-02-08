/** Lee los datos del componente formulario */
function form_datos(componentId){
    var params= "";
    var elem= $("#" + componentId).find("form:first");
    if(elem.find("legend:first").length > 0){
        params += "&label=" + elem.find("legend:first").html();
        params += "&legend=1";
    } else{
        params += "&legend=0";
    }
    params += "&id=" + elem.attr('id');
    params += "&method=" + elem.attr('method');
    params += "&action=" + elem.attr('action');
    return params;
}

/** Lee los datos del componente formulario */
function login_datos(componentId){
    var params= "";
    var elem= $("#" + componentId).find("fieldset");
    params += "&title=" + elem.find('h2').html();
    params += "&placeholderUser=" + elem.find("input:first").attr('placeholder');
    params += "&placeholderPass=" + elem.find("input[type=password]").attr('placeholder');
    var html= elem.find("label").html();
    elem.find("label input").remove();
    params += "&labelCheck=" + elem.find("label").html();
    elem.find("label").html(html);
    params += "&labelButton=" + elem.find('button').html();
    return params;
}

/** Lee los datos del componente input */
function input_datos(componentId){
    var params= "";
    params += "&label=" + $("#" + componentId).find("label").html();
    var elem= $("#" + componentId).find("input");
    params += "&id=" + elem.attr('id');
    params += "&name=" + elem.attr('name');
    params += "&type=" + elem.attr('type');
    params += "&placeholder=" + elem.attr('placeholder');    
    return params;
}

/** Lee los datos del componente textarea */
function textarea_datos(componentId){
    var params= "";
    params += "&label=" + $("#" + componentId).find("label").html();
    var elem= $("#" + componentId).find("textarea");
    params += "&id=" + elem.attr('id');
    params += "&name=" + elem.attr('name');
    params += "&rows=" + elem.attr('rows');
    params += "&placeholder=" + elem.attr('placeholder');    
    return params;
}

/** Lee los datos dle componente select */
function select_datos(componentId){
    var params= "";
    params += "&label=" + $("#" + componentId).find("label").html();
    var elem= $("#" + componentId).find("select");
    params += "&id=" + elem.attr('id');
    params += "&name=" + elem.attr('name');
    if(elem.attr('multiple') == 'multiple'){
        params += "&multiple=1";
    } else{
        params += "&multiple=0";
    }
    return params;
}

/** Lee los datos del componente checkbox */
function checkbox_datos(componentId){
    var params= "";
    params += "&label=" + $("#" + componentId).find("label:first").html();
    var elem= $("#" + componentId).find("input:first");
    var id=elem.attr('id');
    id= id.substr(0, id.length - 1);
    params += "&id=" + id;
    params += "&name=" + elem.attr('name');    
    if($("#" + componentId).find("label:nth-child(2)").hasClass('checkbox-inline')){
        params += "&inline=1";
    } else{
        params += "&inline=0";
    }
    return params;
}

/** Lee los datos del componente radio */
function radio_datos(componentId){
    var params= "";
    params += "&label=" + $("#" + componentId).find("label:first").html();
    var elem= $("#" + componentId).find("input:first");
    var id=elem.attr('id');
    id= id.substr(0, id.length - 1);
    params += "&id=" + id;
    params += "&name=" + elem.attr('name');    
    if($("#" + componentId).find("label:nth-child(2)").hasClass('radio-inline')){
        params += "&inline=1";
    } else{
        params += "&inline=0";
    }
    return params;
}