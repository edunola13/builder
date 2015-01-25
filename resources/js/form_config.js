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