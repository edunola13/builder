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
    if(elem.hasClass('input-sm')){
         params += "&size=sm";
    }else if(elem.hasClass('input-md')){
         params += "&size=md";
    }
    else{
         params += "&size=lg";
    }
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
    if(elem.hasClass('input-sm')){
         params += "&size=sm";
    }else if(elem.hasClass('input-md')){
         params += "&size=md";
    }
    else{
         params += "&size=lg";
    }
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
    if(elem.hasClass('input-sm')){
         params += "&size=sm";
    }else if(elem.hasClass('input-md')){
         params += "&size=md";
    }
    else{
         params += "&size=lg";
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
    if($("#" + componentId).find("label:first").hasClass('input-sm')){
         params += "&size=sm";
    }else if($("#" + componentId).find("label:first").hasClass('input-md')){
         params += "&size=md";
    }
    else{
         params += "&size=lg";
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
    if($("#" + componentId).find("label:first").hasClass('input-sm')){
         params += "&size=sm";
    }else if($("#" + componentId).find("label:first").hasClass('input-md')){
         params += "&size=md";
    }
    else{
         params += "&size=lg";
    }
    return params;
}

/** Lee los datos del componente drop down menu */
function drop_down_menu_form(componentId){
    var params= "";
    var elem= $("#" + componentId).children().last().find("button:first");
    if(elem.hasClass('btn-sm')){
         params += "&size=sm";
    }else if(elem.hasClass('btn-md')){
         params += "&size=md";
    }
    else{
         params += "&size=lg";
    }
    if(elem.hasClass('btn-default')){
         params += "&style=default";
    }else if(elem.hasClass('btn-primary')){
         params += "&style=primary";
    }else if(elem.hasClass('btn-success')){
         params += "&style=success";
    }else if(elem.hasClass('btn-info')){
         params += "&style=info";
    }else if(elem.hasClass('btn-warning')){
         params += "&style=warning";
    }else{
         params += "&style=danger";
    }
    return params;
}

/** Lee los datos del componente blockquote */
function blockquote_datos(componentId){
    var params= "";
    var elem= $("#" + componentId).find("blockquote");
    params += "&texto=" + elem.find('p').text();
    params += "&fuente=" + elem.find('small').text();
    return params;
}

/** Lee los datos del componente jumbotron */
function jumbotron_datos(componentId){
    var params= "";
    var elem= $("#" + componentId).find(".jumbotron");
    params += "&titulo=" + elem.find('h1').text();
    params += "&contenido=" + elem.find('p:first').text();
    var elemA= elem.find('a');
    params += "&label=" + elemA.text();
    if(elemA.hasClass('btn-sm')){
         params += "&size=sm";
    }else if(elemA.hasClass('btn-md')){
         params += "&size=md";
    }
    else{
         params += "&size=lg";
    }
    if(elemA.hasClass('btn-default')){
         params += "&style=default";
    }else if(elemA.hasClass('btn-primary')){
         params += "&style=primary";
    }else if(elemA.hasClass('btn-success')){
         params += "&style=success";
    }else if(elemA.hasClass('btn-info')){
         params += "&style=info";
    }else if(elemA.hasClass('btn-warning')){
         params += "&style=warning";
    }else{
         params += "&style=danger";
    }
    return params;
}
/** Lee los datos del componente simpleHeader */
function simpleHeader_datos(componentId){
    var params= "";
    var elem= $("#" + componentId).find(".page-header");    
    params += "&secundario=" + elem.find('h1 small').text();
    var texto= elem.find('h1').html();
    elem.find('h1 small').remove();
    params += "&primario=" + elem.find('h1').text();
    elem.find('h1').html(texto);    
    return params;
}
/** Lee los datos del componente Thumbnail */
function thumbnail_datos(componentId){
    var params= "";
    var elem= $("#" + componentId).find(".thumbnail");
    params += "&src=" + elem.find('img').attr('src');
    params += "&titulo=" + elem.find('h3').text();
    params += "&contenido=" + elem.find('p:first').text();
    var elemA= elem.find('a');
    params += "&label=" + elemA.text();
    if(elemA.hasClass('btn-sm')){
         params += "&size=sm";
    }else if(elemA.hasClass('btn-md')){
         params += "&size=md";
    }
    else{
         params += "&size=lg";
    }
    if(elemA.hasClass('btn-default')){
         params += "&style=default";
    }else if(elemA.hasClass('btn-primary')){
         params += "&style=primary";
    }else if(elemA.hasClass('btn-success')){
         params += "&style=success";
    }else if(elemA.hasClass('btn-info')){
         params += "&style=info";
    }else if(elemA.hasClass('btn-warning')){
         params += "&style=warning";
    }else{
         params += "&style=danger";
    }
    return params;
}
/** Lee los datos del componente Title */
function title_datos(componentId){
    var params= "";
    var elem= $("#" + componentId).find(".view");
    params += "&titulo=" + elem.find('h3').text();
    return params;
}
/** Lee los datos del componente Well */
function well_datos(componentId){
    var params= "";
    var elem= $("#" + componentId).find(".well");
    params += "&contenido=" + elem.text();
    return params;
}