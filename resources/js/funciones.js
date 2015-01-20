/**
 * Se ejecuta al principio y llama a la funcion que arma el sortable
 */
$(function() {
    load_sortable();
    load_conexion();
});

//var url= "http://edunola.com.ar/serviciosui/";
var url= "http://localhost/uiservices/";

//OPERTACIONES QUE PUEDE REALIZAR EL USUARIO MEDIANTE EL NAVIGATION BAR
var building= true;
var estilo= "";
var nameId= "component";
var actualId= 2;
/**
 * Pasa al estado Vista Previa
 */
function vista_previa(){
    if(building){
        $(".config").hide();
        estilo= $(".estiloBuilder").attr("href");
        $(".estiloBuilder").attr("href", "");
        building= false;
        
        $("body").children().eq(1).find(".navbar-right").children().eq(0).removeClass("active");
        $("body").children().eq(1).find(".navbar-right").children().eq(1).addClass("active");
    }
}
/**
 * Pasa al estado construyendo HTML
 */
function builder(){
    if(!building){
        $(".config").show();
        $(".estiloBuilder").attr("href", estilo);
        building= true;
        
        $("body").children().eq(1).find(".navbar-right").children().first().addClass("active");
        $("body").children().eq(1).find(".navbar-right").children().eq(1).removeClass("active");
    }
   
}
function descargar_modelo(){
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = "modelo.html";
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    var texto = [];
    texto.push($("#builder").html());
    var blob= new Blob(texto, {type: 'text/plain'});
    reader.readAsDataURL(blob);
}
function descargar_html(){
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = "page.html";
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };    
    
    var texto = [];
    texto.push('<!DOCTYPE html><html lang="es">\n');
    texto.push('<head>' + $("head").html() + '</head>\n');
    
    var builderHtml= $("body").find("#builder").html();
    var builder= document.createElement("builder");
    $("body").append(builder);
    builder= $("body").find('builder');
    builder.html(builderHtml);
    builder.find(".config").remove();
	builder.find(".minimizado").removeClass("minimizado");
    builder.find(".com-builder").removeClass("com-builder");
    builder.find(".sortable").removeClass("sortable ui-sortable");
    
    texto.push('<body>' + '<div class="container">' + builder.html() + '</div>\n');
    texto.push($("body").find(".jsEstilo").html() + '</body>\n');
    texto.push('</html>');
    
    $("body").find('builder').remove();
    
    var blob= new Blob(texto, {type: 'text/plain'});
    reader.readAsDataURL(blob);    
    /*No es necesario
    load_sortable();*/
}
function cargar_modelo(){
    $('#modalModelo').modal('show');
}
function form_cargar_modelo() {
    var fileInput = document.getElementById('fileInput');

    var file = fileInput.files[0];
    var textType = /html.*/;
    if (file.type.match(textType)) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $("#builder").html(reader.result);
            //Si esta en Vista Previa Oculto los botones
            if(!building){
                $(".config").hide();                    
            }
            else{
                $(".config").show();
            }
            //Escondo el Modal
            $('#modalModelo').modal('hide');
            load_sortable();
        }
        reader.readAsText(file);
    } else {
        fileDisplayArea.innerText = "File not supported!";
    }
}
function clear(){
    $("body").find('#builder').empty();
}

//FUNCIONES DE CREACION
/**
 * Encuentra las clases que son sortables y las actualiza.
 * Se ejecuta al principio y cuando algun elemento es sortable dentro de si
 */
function load_sortable(){
    $( ".sortable" ).sortable({
            connectWith: ".sortable",
            handle: ".move",
            placeholder: "component-placeholder"
        }).disableSelection();
}

/**
 * Duplica un elemento con todos sus hijos
 */
function duplicarElemento(elemento) {
    var componente= elemento.html();
    elemento.parent().append('<div class="com-builder">' + componente + '</div>');
    $('html,body').animate({scrollTop: elemento.parent().children().last().offset().top});
    load_sortable();
}

function minimizar(elemento){
	var padre= elemento.parent();
	if(elemento.html() == "+"){
		elemento.attr('title', 'Minimizar');
		elemento.html("-");
		padre.find(".view").children().removeClass("minimizado");
	}
	else{
		elemento.attr('title', 'Maximizar');
		elemento.html("+");
		padre.find(".view").children().addClass("minimizado");
	}
}

/**
 * Funcion que es llamada cuando la pagina es cargada para realizar la primer conexion con el servicio UI.
 * Esto se hace ya que la primer consulta suele ser lenta
 */
function load_conexion(){
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        dataType: "html",
        success: function (msg) {
        }
    });
}

/**
 * Agrega el HTML al componente para poder manipularlo en el builder
 */
function add_com_builder(componente, fn_options, fn_components){
    var com= '<div class="com-builder" id="' + nameId + actualId + '"><button type="button" class="btn btn-danger btn-xs config delete pull-right" title="Delete">X</button><button type="button" class="btn btn-default btn-xs config minimize pull-right" title="Minimizar">-</button>\n\
            <a href="#" class="btn btn-success btn-xs config move pull-right" role="button" title="Move">Move</a><button type="button" class="btn btn-default btn-xs config duplicate pull-right" title="Duplicate">Duplicate</button>';
    if(fn_options != null){
        com+= '<div class="btn-group config pull-right"><button type="button" class="btn btn-default btn-xs dropdown-toggle " data-toggle="dropdown">Options<span class="caret"></span></button><ul class="dropdown-menu" role="menu">' + fn_options() +'</ul></div>';
    }
    if(fn_components != null){
        com+= '<div class="btn-group config pull-right"><button type="button" class="btn btn-default btn-xs dropdown-toggle " data-toggle="dropdown">Components<span class="caret"></span></button><ul class="dropdown-menu" role="menu">' + fn_components() +'</ul></div>';
    }
    //Todavia no va ya que no hay personalizacion
    var comId= nameId + actualId;
    var form= 'form';
    com+= '<button type="button" class="btn btn-default btn-xs config pull-right" onclick="nueva_configuracion(\'' + form + '\',\'' + comId + '\')">Personalize</button>';
    com+= '<p class="config">Nombre Component</p><div class="view">';
    com+= componente;
    com+= '</div></div>';
    return com;
}

/**
 * aumenta el numero de ID
 */
function incrementarId(){
    actualId++;
}

/**
 * Crea una nueva fila con columnas
 */
function load_row(){
    var row= '<div class="row">';
    for (x=0;x<arguments.length;x++){
        row += '<div class="col col-md-' + arguments[x] + ' sortable"></div>';
    }
    row += '</div>';
    row= add_com_builder(row);
    $("#builder").append(row);
	$('html,body').animate({scrollTop: $("#builder").children().last().offset().top});
    //Si esta en Vista Previa Oculto los botones
    if(!building){
        $(".config").hide();
    }
    incrementarId();
    //Actualiza el modelo Sortable
    load_sortable();
}

/**
 * Conexion via Ajax de tipo HTTP JSON
 */
function carga_ajax(json, inComponent, fn_options, fn_components){
    document.body.style.cursor = 'wait';
    $.ajax({
        type: "POST",
        url: url + "componente",
        data: json,
        contentType: "application/json",
        dataType: "html",
        success: function (msg) {
            msg= add_com_builder(msg, fn_options, fn_components);
            if(inComponent == null){
                $("#builder").append(msg);
                //$("#builder").children().last().children().last().children().eq(0).attr("contenteditable", true);
                $('html,body').animate({scrollTop: $("#builder").children().last().offset().top});
            }
            else{
                var find= "#" + inComponent;
                $(find).find(".sortable:first").append(msg);
            }
            //Si esta en Vista Previa Oculto los botones
            if(!building){
                $(".config").hide();
            }
            incrementarId();
            document.body.style.cursor = 'auto';            
        },
        error: function(msg) {
            alert(msg);
            document.body.style.cursor = 'auto';
        }
    });
}

/**
 * Conexion via Ajax de tipo HTTP JSON que luego llama a funcion
 * Para componentes que soportan hijos
 */
function carga_ajax_fn(json, fn, fn_options, fn_components){
    document.body.style.cursor = 'wait';
    $.ajax({
           type: "POST",
           url: url + "componente",
           data: json,
           contentType: "application/json",
           dataType: "html",
           success: function (msg) {
               msg= add_com_builder(msg, fn_options, fn_components);
               $("#builder").append(msg);
               fn(nameId + actualId);             
               $('html,body').animate({scrollTop: $("#builder").children().last().offset().top});
               //Si esta en Vista Previa Oculto los botones
               if(!building){
                   $(".config").hide();
               }
               incrementarId();
               //Actualiza el modelo Sortable
               load_sortable();
               document.body.style.cursor = 'auto';
           },
           error: function(msg) {
                alert(msg);
		document.body.style.cursor = 'auto';
           }
    });
}

/**
 * Conexion via Ajax de tipo HTTP JSON que luego llama a funcion
 * Para componentes que soportan hijos
 */
function carga_ajax_fn_same(json, componentId, fn){
    document.body.style.cursor = 'wait';
    $.ajax({
           type: "POST",
           url: url + "componente",
           data: json,
           contentType: "application/json",
           dataType: "html",
           success: function (msg) {
               $("#" + componentId).find(".view").empty();
               $("#" + componentId).find(".view").append(msg);
               fn(componentId);             
               $('html,body').animate({scrollTop: $("#builder").children().last().offset().top});
               //Si esta en Vista Previa Oculto los botones
               if(!building){
                   $(".config").hide();
               }
               incrementarId();
               //Actualiza el modelo Sortable
               load_sortable();
               document.body.style.cursor = 'auto';
           },
           error: function(msg) {
                alert(msg);
		document.body.style.cursor = 'auto';
           }
    });
}

/**
 * Conexion via Ajax de tipo HTTP JSON
 * Para modificar Options y Preferences
 */
function carga_ajax_preferences(json, viewElement){
    document.body.style.cursor = 'wait';
    $.ajax({
        type: "POST",
        url: url + "componente",
        data: json,
        contentType: "application/json",
        dataType: "html",
        success: function (msg) {
            viewElement.empty();
            viewElement.append(msg);
            document.body.style.cursor = 'auto';
        },
        error: function(msg) {
            alert(msg);
            document.body.style.cursor = 'auto';
        }
    });	
}

//CONFIGURACION DE COMPONENTES
function cancelar_configuracion(){
    $('#modalConfiguracion .modal-body').empty();
    $('#modalConfiguracion').modal('hide');
}

function nueva_configuracion(form, componentId){
    if(componentId == null){
        componentId= 0;
    }
    $('#modalConfiguracion .modal-body').empty();
    document.body.style.cursor = 'wait';
    $.ajax({
        type: "GET",
        url: "forms?form=" + form + "&componentId=" + componentId,
        dataType: "html",
        success: function (msg) {
            $('#modalConfiguracion .modal-body').append(msg);
            document.body.style.cursor = 'auto';
        },
        error: function(msg) {
            alert(msg);
            document.body.style.cursor = 'auto';
        }
    });    
    $('#modalConfiguracion').modal('show');
}

function form_config(componentId){
    var elem= $("#modalConfiguracion");
    var id= elem.find("input[name='id']").val(); 
    var method= elem.find("input[name='method']").val(); 
    var action= elem.find("input[name='action']").val();
    var legend= elem.find("input[name='legend']").is(':checked');
    var label= elem.find("input[name='label']").val(); 
     
    var json= '{\n\
           "nombre": "formulario",\n\
           "configuracion": {\n\
                "id": "' + id + '",\n\
                "method": "' + method + '",\n\
                "action": "' + action + '"';
    if(legend){
         json += ',"label": "' + label + '"';
    }
    json += '}}';
    
    if(componentId == '0'){
        carga_ajax_fn(json, load_form_sortable, load_form_options, load_form_components);
    }
    else{
        carga_ajax_fn_same(json, componentId, load_form_sortable, load_form_options, load_form_components);
    }
}

//OPCIONES DE LOS COMPONENTES
/**
 * Agrega la clase pull-right en el nodo principal del componente
 * utilizado por: panel, badge, image
 */
function pull_right(event){
   var target = $(event.target);
   var div= target.parent().parent().parent().parent();
   var view= div.children().last();
   var componente= view.children().first();
   
   if(target.parent().hasClass("active")){
       componente.removeClass("pull-right");
       target.parent().removeClass("active");
   }
   else{
       componente.addClass("pull-right");
       target.parent().addClass("active");
   }
}
/**
 * Agrega la clase lead en el nodo principal del componente
 * utilizado por: paragraph
 */
function lead(event){
   var target = $(event.target);
   var div= target.parent().parent().parent().parent();
   var view= div.children().last();
   var componente= view.children().first();
   
   if(target.parent().hasClass("active")){
       componente.removeClass("lead");
       target.parent().removeClass("active");
   }
   else{
       componente.addClass("lead");
       target.parent().addClass("active");
   }
}
/**
 * Agrega la clase align correspondiente en el nodo principal del componente
 * utilizado por: paragraph
 */
function align(event, align){
   var target = $(event.target);
   var div= target.parent().parent().parent().parent();
   var view= div.children().last();
   var componente= view.children().first();
   
   if(! target.parent().hasClass("active")){       
       target.parent().parent().find(".option-align").removeClass("active");
       componente.removeClass("text-center text-left text-right");
       
       componente.addClass("text-" + align);
       target.parent().addClass("active");
   }
}
/**
 * Agrega la clase alert correspondiente en el nodo principal del componente
 * utilizado por: alert_messages
 */
function alert(event, alert){
   var target = $(event.target);
   var div= target.parent().parent().parent().parent();
   var view= div.children().last();
   var componente= view.children().first();
   
   if(! target.parent().hasClass("active")){       
       target.parent().parent().find(".option-alert").removeClass("active");
       componente.removeClass("alert-info alert-success alert-warning alert-danger");
       
       componente.addClass("alert-" + alert);
       target.parent().addClass("active");
   }
}
/**
 * Agrega la clase type correspondiente en el nodo principal del componente
 * utilizado por: image
 */
function image_type(event, type){
   var target = $(event.target);
   var div= target.parent().parent().parent().parent();
   var view= div.children().last();
   var componente= view.children().first();
   
   if(! target.parent().hasClass("active")){       
       target.parent().parent().find(".option-image").removeClass("active");
       componente.removeClass("img-rounded img-circle img-thumbnail");
       
       componente.addClass("img-" + type);
       target.parent().addClass("active");
   }
}
function style_button(event, style){
   var target = $(event.target);
   var div= target.parent().parent().parent().parent();
   var view= div.children().last();
   var componente= view.children().first();
   
   if(! target.parent().hasClass("active")){       
       target.parent().parent().find(".option-style").removeClass("active");
       componente.removeClass("btn-default btn-primary btn-success btn-info btn-warning btn-danger");
       
       componente.addClass("btn-" + style);
       target.parent().addClass("active");
   }
}
/**
 * Agrega la clase progress-striped en el nodo principal del componente
 * utilizado por: progress-bar
 */
function progress_striped(event){
   var target = $(event.target);
   var div= target.parent().parent().parent().parent();
   var view= div.children().last();
   var componente= view.children().first();
   
   if(target.parent().hasClass("active")){
       componente.removeClass("progress-striped");
       target.parent().removeClass("active");
   }
   else{
       componente.addClass("progress-striped");
       target.parent().addClass("active");
   }
}
/**
 * Agrega la clase pills o tabs en el nodo principal del componente
 * utilizado por: navigation-menu
 */
function pills(event){
   var target = $(event.target);
   var div= target.parent().parent().parent().parent();
   var view= div.children().last();
   var componente= view.children().first();
   
   if(target.parent().hasClass("active")){
       componente.addClass("nav-tabs");
       componente.removeClass("nav-pills");
       target.parent().removeClass("active");
   }
   else{
       componente.addClass("nav-pills");
       componente.removeClass("nav-tabs");
       target.parent().addClass("active");
   }
}
/**
 * Agrega la clase justified en el nodo principal del componente
 * utilizado por: navigation-menu
 */
function justified(event){
   var target = $(event.target);
   var div= target.parent().parent().parent().parent();
   var view= div.children().last();
   var componente= view.children().first();
   
   if(target.parent().hasClass("active")){
       componente.removeClass("nav-justified");
       target.parent().removeClass("active");
   }
   else{
       componente.addClass("nav-justified");
       target.parent().addClass("active");
   }
}
/**
 * Agrega la clase stacked en el nodo principal del componente
 * utilizado por: navigation-menu
 */
function stacked(event){
   var target = $(event.target);
   var div= target.parent().parent().parent().parent();
   var view= div.children().last();
   var componente= view.children().first();
   
   if(target.parent().hasClass("active")){
       componente.removeClass("nav-stacked");
       target.parent().removeClass("active");
   }
   else{
       componente.addClass("nav-stacked");
       target.parent().addClass("active");
   }
}
/**
 * Agrega la clase pull-right en un nodo secundario del componente
 * utilizado por: navigation-menu
 */
function pull_right_menu(event){
    var target = $(event.target);
    var div= target.parent().parent().parent().parent();
    var view= div.children().last();
    var componente= view.children().first();
    var sub_com= componente.children().last();

    if(target.parent().hasClass("active")){
        sub_com.removeClass("pull-right");
        target.parent().removeClass("active");
    }
    else{
        sub_com.addClass("pull-right");
        target.parent().addClass("active");
    }
}
/**
 * Agrega el componente legend a un formulario
 * utilizado por: navigation-menu
 */
function legend(event){
    var target = $(event.target);
    var div= target.parent().parent().parent().parent();
    var view= div.children().last();
    var componente= view.children().first();

    if(target.parent().hasClass("active")){
        componente.find("legend").remove();
        target.parent().removeClass("active");
    }
    else{var fieldset= componente.children().first();
        fieldset.prepend("<legend>Formulario</legend>");
        target.parent().addClass("active");        
    }
}
/**
 * Agrega el atributo multiple a un select
 * utilizado por: navigation-menu
 */
function select_multiple(event){
    var target = $(event.target);
    var div= target.parent().parent().parent().parent();
    var view= div.children().last();
    var componente= view.children().first();

    if(target.parent().hasClass("active")){
        componente.find("select").removeAttr("multiple");
        target.parent().removeClass("active");
    }
    else{
        componente.find("select").attr("multiple", "multiple");
        target.parent().addClass("active");        
    }
}
/*
 * Hago al checkbox inline
 */
function inline_checkbox(event){
    var target = $(event.target);
    var div= target.parent().parent().parent().parent();
    var view= div.children().last();

    if(target.parent().hasClass("active")){
        carga_ajax_preferences(checkbox(false), view)
        target.parent().removeClass("active");
    }
    else{
        carga_ajax_preferences(checkbox(true), view)
        target.parent().addClass("active");        
    }
}
/*
 * Hago al radio inline
 */
function inline_radio(event){
    var target = $(event.target);
    var div= target.parent().parent().parent().parent();
    var view= div.children().last();

    if(target.parent().hasClass("active")){
        carga_ajax_preferences(radio(false), view)
        target.parent().removeClass("active");
    }
    else{
        carga_ajax_preferences(radio(true), view)
        target.parent().addClass("active");        
    }
}

/**
 * Realiza la carga del formulario
 */
function load_form(){
        var json= '{\n\
           "nombre": "formulario",\n\
           "configuracion": {\n\
                "label": "Formulario",\n\
                "method": "POST",\n\
                "action": "url" \n\
           }\n\
        }';
    
        carga_ajax_fn(json, load_form_sortable, load_form_options, load_form_components);
}
function load_form_sortable(componentId){
    $("#" + componentId).children().last().find(".hijos-fieldset").addClass("sortable");
}
function load_form_options(){
    return '<li class="active"><a onclick="legend(event)">Legend</a></li>';
}
function load_form_components(){
    return '<li><a onclick="load_input(\'' + nameId + actualId + '\')">Input</a></li>\n\
            <li><a onclick="load_textArea(\'' + nameId + actualId + '\')">Text Area</a></li>\n\
            <li><a onclick="load_select(\'' + nameId + actualId + '\')">Select</a></li>\n\
            <li><a onclick="load_checkbox(\'' + nameId + actualId + '\')">Checkbox</a></li>\n\
            <li><a onclick="load_radio(\'' + nameId + actualId + '\')">Radio</a></li>\n\
            <li><a onclick="load_button(\'' + nameId + actualId + '\')">Button</a></li>\n\
            <li><a onclick="load_buttons(\'' + nameId + actualId + '\')">Buttons</a></li>';
}
/**
 * Campos del Formulario
 */

/**
 * Login
 */
function load_login(inComponent){
    var json= '{\n\
        "nombre": "login",\n\
        "configuracion": {\n\
                "method": "POST",\n\
                "action": "url",\n\
                "title": "Super Loguin",\n\
                "labelButton": "Ingresar" \n\
        },\n\
        "datos": {\n\
            "user": {\n\
                "placeholder": "Ingrese su Email",\n\
                "name": "email"\n\
            },\n\
            "pass": {\n\
                "placeholder": "Ingrese su Contraseña",\n\
                "name": "pass"\n\
            },\n\
            "check": {\n\
                "name": "check",\n\
                "value": "check",\n\
                "label": "Recordarme"\n\
            }\n\
        }\n\
    }';
        
    carga_ajax(json, inComponent);
}

/**
 * Input
 */
function load_input(inComponent){
    var json= '{\n\
        "nombre": "input",\n\
        "configuracion": {\n\
            "label": "Campo Input",\n\
            "type": "text",\n\
            "name": "name",\n\
            "placeholder": "Es un Input"\n\
        }\n\
    }';
        
    carga_ajax(json, inComponent);
}

/**
 * TextArea
 */
function load_textArea(inComponent){
    var json= '{\n\
        "nombre": "textarea",\n\
        "configuracion": {\n\
            "label": "Campo Text Area",\n\
            "name": "name",\n\
            "placeholder": "Descripcion del campo Text Area",\n\
            "rows": "10"\n\
        }\n\
    }';
        
    carga_ajax(json, inComponent);
}

/**
 * Select
 */
function load_select(inComponent){
    var componentes= '"componentes": [';
    for(var i= 1; i < 4; i++){
        componentes += '{\n\
            "nombre": "select_option",\n\
            "configuracion": {\n\
                "label": "opcion ' + i + '"\n\
            }';
        if(i != 3){
            componentes += '},';
        }
        else{
            componentes += '}';
        }
    }
    componentes += ']';
    var json= '{\n\
        "nombre": "select",\n\
        "configuracion": {\n\
            "label": "Seleccione",\n\
            "name": "name",\n\
            "multiple": "no"\n\
        },';
     json += componentes + '}';
     
    carga_ajax(json, inComponent, load_select_options);
}
function load_select_options(){
    return '<li><a onclick="select_multiple(event)">Multiple</a></li>';
}

/**
 * CheckBox
 */
function checkbox(inline){
    var val= "no";
    if(inline){
        val= "si";
    }
    var componentes= '"componentes": [';
    var cant= 2;
    for(var i= 0; i < 2; i++){
        componentes += '{\n\
            "nombre": "checkbox_option",\n\
            "configuracion": {\n\
                "label": "opcion ' + i + '",\n\
                "name": "name",\n\
                "inline": "' + val + '",\n\
                "numCheckbox": "' + i + '",\n\
                "checked": "no"\n\
            }';
        if(i < cant - 1){
            componentes += '},';
        }
        else{
            componentes += '}';
        }
    }
    componentes += ']';
    var json= '{\n\
        "nombre": "checkbox",\n\
        "configuracion": {\n\
            "label": "Elija opciones",\n\
            "inline": "' + val + '"\n\
        },';
    json += componentes + '}';
    
    return json;
}

function load_checkbox(inComponent){        
    carga_ajax(checkbox(true), inComponent, load_checkbox_options);
}
function load_checkbox_options(){
    return '<li class="active"><a onclick="inline_checkbox(event)">Inline</a></li>';
}

/**
 * Radio Button
 */
function radio(inline){
    var val= "no";
    if(inline){
        val= "si";
    }
    var componentes= '"componentes": [';
    var cant= 2;
    for(var i= 0; i < 2; i++){
        componentes += '{\n\
            "nombre": "radio_option",\n\
            "configuracion": {\n\
                "label": "opcion ' + i + '",\n\
                "name": "name",\n\
                "inline": "' + val + '",\n\
                "numRadio": "' + i + '",\n\
                "checked": "no"\n\
            }';
        if(i < cant - 1){
            componentes += '},';
        }
        else{
            componentes += '}';
        }
    }
    componentes += ']';
    var json= '{\n\
        "nombre": "radio",\n\
        "configuracion": {\n\
            "label": "Elija una opcion",\n\
            "inline": "' + val + '"\n\
        },';
    json += componentes + '}';
    
    return json;
}

function load_radio(inComponent){
    carga_ajax(radio(false), inComponent, load_radio_options);
}
function load_radio_options(){
    return '<li><a onclick="inline_radio(event)">Inline</a></li>';
}


/**
 * Buttons
 */
function load_buttons(inComponent){
    var componentes= '"componentes": [';
    var cant= 2;
    for(var i= 0; i < 2; i++){
        if(i < cant - 1){
            componentes += '{\n\
                "nombre": "button",\n\
                "configuracion": {\n\
                    "label": "Enviar",\n\
                    "type": "submit",\n\
                    "style": "default"\n\
                }\n\
            },';
        }
        else{
            componentes += '{\n\
                "nombre": "button",\n\
                "configuracion": {\n\
                    "label": "Borrar",\n\
                    "type": "reset",\n\
                    "style": "default"\n\
                }\n\
            }';
        }
    }
    componentes += ']';
    var json= '{\n\
        "nombre": "botonera",';
    json += componentes + '}';

    carga_ajax(json, inComponent);
}

/**
 * Realia la carga del formulario de busqueda
 */
function load_searchForm(inComponent){
    var json= '{\n\
           "nombre": "form_search",\n\
           "configuracion": {\n\
                "label": "Formulario de Busqueda"\n\
           }\n\
    }';
    
    carga_ajax(json, inComponent);
}

/**
 * Simple Paginator
 */
function load_simplePaginator(inComponent){
    var json= '{\n\
        "nombre": "paginador_simple",\n\
        "configuracion": {\n\
            "previous": {\n\
                "href": "#",\n\
                "label": "Anterior"\n\
            },\n\
            "next": {\n\
                "href": "#",\n\
                "label": "Siguiente"\n\
            }\n\
        }\n\
    }';
    
    carga_ajax(json, inComponent);
}
  
/**
 * Paginator
 */
function load_paginator(inComponent){
    var componentes= '"componentes": [';
    componentes += '{\n\
                "nombre": "pagina",\n\
                "configuracion": {\n\
                    "href": "#",\n\
                    "state": "disabled",\n\
                    "first": "si"\n\
                }\n\
            },';
    var cant= 5;
    for(var i= 1; i <= cant; i++){
        if(i == 1){
            componentes += '{\n\
                "nombre": "pagina",\n\
                "configuracion": {\n\
                    "label": "' + i + '",\n\
                    "href": "#",\n\
                    "state": "active"\n\
                }\n\
            },';
        }
        else{
            componentes += '{\n\
                "nombre": "pagina",\n\
                "configuracion": {\n\
                    "label": "' + i + '",\n\
                    "href": "#"\n\
                }\n\
            },';
        }
    }
    componentes += '{\n\
                "nombre": "pagina",\n\
                "configuracion": {\n\
                    "href": "#",\n\
                    "last": "si"\n\
                }\n\
            }';
    componentes += ']';
    var json= '{\n\
        "nombre": "paginador",';
    json += componentes + '}';

    carga_ajax(json, inComponent, load_paginator_options);
}
function load_paginator_options(){
    return '<li><a onclick="pull_right(event)">Right</a></li>';
}

/**
 * List
 */
function load_list(inComponent){
    var componentes= '"componentes": [';
    componentes += '{\n\
            "nombre": "li",\n\
            "configuracion": {\n\
                "label": "Lista opción 1",\n\
                "type": "lista",\n\
                "badge": "1",\n\
                "active": "active"\n\
            }\n\
    },';
    var cant= 4;
    for(var i= 2; i <= cant; i++){
        componentes += '{\n\
            "nombre": "li",\n\
            "configuracion": {\n\
                "label": "Lista opción ' + i + '",\n\
                "type": "lista",\n\
                "badge": "' + i + '"\n\
            }';
        if(i < cant){
            componentes += '},';
        }
        else{
            componentes += '}';
        }
    }
    componentes += ']';
    var json= '{\n\
        "nombre": "ul",\n\
        "configuracion": {\n\
            "type": "lista"\n\
        },';
    json += componentes + '}';

    carga_ajax(json, inComponent);
}

/**
 * List a
 */
function load_listA(inComponent){
    var componentes= '"componentes": [';
    componentes += '{\n\
            "nombre": "li",\n\
            "configuracion": {\n\
                "label": "Lista opción 1",\n\
                "type": "lista_a",\n\
                "href": "#",\n\
                "badge": "1",\n\
                "active": "active"\n\
            }\n\
    },';
    var cant= 4;
    for(var i= 2; i <= cant; i++){
        componentes += '{\n\
            "nombre": "li",\n\
            "configuracion": {\n\
                "label": "Lista opción ' + i + '",\n\
                "type": "lista_a",\n\
                "href": "#",\n\
                "badge": "' + i + '"\n\
            }';
        if(i < cant){
            componentes += '},';
        }
        else{
            componentes += '}';
        }
    }
    componentes += ']';
    var json= '{\n\
        "nombre": "ul",\n\
        "configuracion": {\n\
            "type": "lista_a"\n\
        },';
    json += componentes + '}';

    carga_ajax(json, inComponent);
}

/**
 * Paragraph
 */
function load_paragraph(inComponent){
    var componentes= '"componentes": [';
    componentes += '{\n\
            "nombre": "text",\n\
            "configuracion": {\n\
                "value": "Esto es un texto normal dentro del parrafo."\n\
            }\n\
    },';
    componentes += '{\n\
            "nombre": "small",\n\
            "configuracion": {\n\
                "value": "Esto es un texto chico dentro del parrafo."\n\
            }\n\
    },';
    componentes += '{\n\
            "nombre": "strong",\n\
            "configuracion": {\n\
                "value": "Esto es un texto fuerte dentro del parrafo."\n\
            }\n\
    },';
    componentes += '{\n\
            "nombre": "em",\n\
            "configuracion": {\n\
                "value": "Esto es un texto EM dentro del parrafo."\n\
            }\n\
    }';
    
    componentes += ']';
    var json= '{\n\
        "nombre": "parrafo",\n\
        "configuracion": {\n\
            "align": "center"\n\
        },';
    json += componentes + '}';

    carga_ajax(json, inComponent, load_paragraph_options);
}
function load_paragraph_options(){
    return '<li><a onclick="lead(event)">Lead</a></li>\n\
            <li class="option-align active"><a onclick="align(event, &#39;center&#39;)">Align Center</a></li><li class="option-align"><a onclick="align(event, &#39;left&#39;)">Align Left</a></li></li><li class="option-align"><a onclick="align(event, &#39;right&#39;)">Align Right</a></li>';
}

/**
 * Drop down Menu
 */
function load_drop_down_menu(inComponent){
    var componentes= '"componentes": [';
    var cant= 3;
    for(var i= 1; i <= cant; i++){
        componentes += '{\n\
            "nombre": "menu_item",\n\
            "configuracion": {\n\
                "label": "Opcion ' + i + '",\n\
                "type": "item",\n\
                "href": "#"\n\
            }\n\
        },';
    }
    componentes += '{\n\
            "nombre": "menu_item",\n\
            "configuracion": {\n\
                "type": "divider"\n\
            }\n\
        },';
    componentes += '{\n\
            "nombre": "menu_item",\n\
            "configuracion": {\n\
                "label": "Opcion ' + cant + 1 + '",\n\
                "type": "item",\n\
                "href": "#"\n\
            }\n\
        }';
    
    componentes += ']';
    var json= '{\n\
        "nombre": "drop_down_menu",\n\
        "configuracion": {\n\
            "label": "Desplegar Opciones"\n\
        },';
    json += componentes + '}';

    carga_ajax(json, inComponent, load_drop_down_menu_options);
}
function load_drop_down_menu_options(){
    return '<li><a onclick="pull_right(event)">Right</a></li>';
}

/**
 * Navigation Menu
 */
function load_navigation_menu(inComponent){
    var componentes= '"componentes": [';
    componentes += '{\n\
            "nombre": "nav_item",\n\
            "configuracion": {\n\
                "label": "Opcion 1",\n\
                "state": "active",\n\
                "href": "#"\n\
            }\n\
        },';
    var cant= 3;
    for(var i= 2; i <= cant; i++){
        componentes += '{\n\
            "nombre": "nav_item",\n\
            "configuracion": {\n\
                "label": "Opcion ' + i + '",\n\
                "href": "#"\n\
            }\n\
        },';
    }
      
    //Armo el item drop down
    var componentes2= '"componentes": [';
    var cant2= 3;
    for(var i2= 1; i2 <= cant2; i2++){
        componentes2 += '{\n\
            "nombre": "menu_item",\n\
            "configuracion": {\n\
                "label": "Opcion ' + i2 + '",\n\
                "type": "item",\n\
                "href": "#"\n\
            }\n\
        },';
    }
    componentes2 += '{\n\
            "nombre": "menu_item",\n\
            "configuracion": {\n\
                "type": "divider"\n\
            }\n\
        },';
    componentes2 += '{\n\
            "nombre": "menu_item",\n\
            "configuracion": {\n\
                "label": "Opcion ' + cant2 + 1 + '",\n\
                "type": "item",\n\
                "href": "#"\n\
            }\n\
        }';
    
    componentes2 += ']';
    var json2= '{\n\
        "nombre": "nav_item_drop_down",\n\
        "configuracion": {\n\
            "label": "Menu Desplegable"\n\
        },';
    json2 += componentes2 + '}';
    
    componentes += json2;      
    
    componentes += ']';
    var json= '{\n\
        "nombre": "navigation_menu",\n\
        "configuracion": {\n\
            "type": "pills"\n\
        },';
    
    json += componentes + '}';

    carga_ajax(json, inComponent, load_navigation_menu_options);
}
function load_navigation_menu_options(){
    return '<li class="active"><a onclick="pills(event)">Pills</a></li>\n\
            <li><a onclick="justified(event)">Justified</a></li>\n\
            <li><a onclick="stacked(event)">Stacked</a></li>\n\
            <li><a onclick="pull_right_menu(event)">Other</a></li>';
}

/**
 * Navigation Bar
 */
function load_navigation_bar(inComponent){
    //Componentes del navigation Bar
    var componentes= '"componentes": [';
    
    /**
     * Empieza componente Nav Bar Left
     */
    //Componentes de Nav Bar Left
    var componentes1= '"componentes": [';
    componentes1 += '{\n\
            "nombre": "nav_item",\n\
            "configuracion": {\n\
                "label": "Opcion 1",\n\
                "state": "active",\n\
                "href": "#"\n\
            }\n\
        },';
    var cant= 3;
    for(var i= 2; i <= cant; i++){
        componentes1 += '{\n\
            "nombre": "nav_item",\n\
            "configuracion": {\n\
                "label": "Opcion ' + i + '",\n\
                "href": "#"\n\
            }\n\
        },';
    }  
      
    //Componentes del drop down del Nav Bar Left
    var componentes2= '"componentes": [';
    var cant2= 3;
    for(var i2= 1; i2 <= cant2; i2++){
        componentes2 += '{\n\
            "nombre": "menu_item",\n\
            "configuracion": {\n\
                "label": "Opcion ' + i2 + '",\n\
                "type": "item",\n\
                "href": "#"\n\
            }\n\
        },';
    }
    componentes2 += '{\n\
            "nombre": "menu_item",\n\
            "configuracion": {\n\
                "type": "divider"\n\
            }\n\
        },';
    componentes2 += '{\n\
            "nombre": "menu_item",\n\
            "configuracion": {\n\
                "label": "Opcion ' + cant2 + 1 + '",\n\
                "type": "item",\n\
                "href": "#"\n\
            }\n\
        }';
    
    componentes2 += ']';
    var json2= '{\n\
        "nombre": "nav_item_drop_down",\n\
        "configuracion": {\n\
            "label": "Menu Desplegable"\n\
        },';
    json2 += componentes2 + '}';   
    componentes1 += json2;
    
    var jsonLeft= '{\n\
        "nombre": "nav_bar_left",';
    
    jsonLeft += componentes1 + ']' + '},';
    
    componentes += jsonLeft;
    /**
     * Fin componente Nav Bar Left
     */
    
    //Componente Form
    var form= '{\n\
        "nombre": "nav_bar_form",\n\
        "configuracion": {\n\
            "action": "#",\n\
            "method": "POST",\n\
            "input_name": "name",\n\
            "placeholder": "Placeholder",\n\
            "label": "Enviar"\n\
        }';
    
    componentes += form + '},';
    
    /**
     * Empieaz componente Nav Bar Right
     */
    var componentes3= '"componentes": [';
    componentes3 += '{\n\
            "nombre": "nav_item",\n\
            "configuracion": {\n\
                "label": "Opcion 1",\n\
                "href": "#"\n\
            }\n\
        },';
    
    //Componentes del drop down del Nav Bar Right
    var componentes4= '"componentes": [';
    var cant3= 3;
    for(var i3= 1; i3 <= cant3; i3++){
        componentes4 += '{\n\
            "nombre": "menu_item",\n\
            "configuracion": {\n\
                "label": "Opcion ' + i3 + '",\n\
                "type": "item",\n\
                "href": "#"\n\
            }\n\
        },';
    }
    componentes4 += '{\n\
            "nombre": "menu_item",\n\
            "configuracion": {\n\
                "type": "divider"\n\
            }\n\
        },';
    componentes4 += '{\n\
            "nombre": "menu_item",\n\
            "configuracion": {\n\
                "label": "Opcion ' + cant3 + 1 + '",\n\
                "type": "item",\n\
                "href": "#"\n\
            }\n\
        }';
    
    componentes4 += ']';
    var json3= '{\n\
        "nombre": "nav_item_drop_down",\n\
        "configuracion": {\n\
            "label": "Menu Desplegable"\n\
        },';
    json3 += componentes4 + '}';   
    componentes3 += json3;
    
    var jsonRight= '{\n\
        "nombre": "nav_bar_right",';
    
    jsonRight += componentes3 + ']' + '}';
    
    componentes += jsonRight;
    /**
     * Fin componente Nav Bar Right
     */
    
    componentes += ']';
    
    var json= '{\n\
        "nombre": "navigation_bar",\n\
        "configuracion": {\n\
            "logo": "Logotipo",\n\
            "href": "#"\n\
        },';

    json += componentes + '}';

    carga_ajax(json, inComponent);
}

/**
 * Breadcrumb
 */
function load_breadcrumb(inComponent){
    var componentes= '"componentes": [';
    var cant= 2;
    for(var i= 1; i <= cant; i++){
        componentes += '{\n\
            "nombre": "nav_item",\n\
            "configuracion": {\n\
                "label": "Nivel ' + i + '",\n\
                "href": "#"\n\
            }\n\
        },';
    }
    componentes += '{\n\
            "nombre": "nav_item",\n\
            "configuracion": {\n\
                "label": "Nivel 3",\n\
                "state": "active"\n\
            }\n\
        }';
    
    componentes += ']';
    var json= '{\n\
        "nombre": "breadcrumb",';
    
    json += componentes + '}';

    carga_ajax(json, inComponent);
}

/**
 * Image
 */
function load_image(inComponent){
    var json= '{\n\
        "nombre": "image",\n\
        "configuracion": {\n\
            "alt": "Imagen",\n\
            "src": "http://lorempixel.com/140/140/",\n\
            "type": "img-rounded"\n\
        }\n\
    }';
        
    carga_ajax(json, inComponent, load_image_options);
}
function load_image_options(){
    return '<li><a onclick="pull_right(event)">Right</a></li>\n\
            <li class="option-image active"><a onclick="image_type(event, &#39;rounded&#39;)">Rounded</a></li><li class="option-image"><a onclick="image_type(event, &#39;circle&#39;)">Circle</a></li><li class="option-image"><a onclick="image_type(event, &#39;thumbnail&#39;)">Thumbnail</a></li>';
}

/**
 * Address
 */
function load_address(inComponent){
    var json= '{\n\
        "nombre": "address",\n\
        "configuracion": {\n\
            "nombre": "Nombre Empresa",\n\
            "direccion": "Avenida Archuby 1300",\n\
            "localidad": "La Plata, Buenos Aires",\n\
            "telefono": "470-5689"\n\
        }\n\
    }';
        
    carga_ajax(json, inComponent);
}

/**
 * Badge
 */
function load_badge(inComponent){
    var json= '{\n\
        "nombre": "badge",\n\
        "configuracion": {\n\
            "href": "#",\n\
            "label": "Un Link",\n\
            "badge": "15"\n\
        }\n\
    }';        
    carga_ajax(json, inComponent, load_badge_options);
}
function load_badge_options(){
    return '<li><a onclick="pull_right(event)">Right</a></li>';
}

/**
 * Blockquote
 */
function load_blockquote(inComponent){
    var json= '{\n\
        "nombre": "blockquote",\n\
        "configuracion": {\n\
            "texto": "Este es un texto de una fuente externa a esta pagina. Por eso se encierra en Blockquotes.",\n\
            "fuente": "La fuente del texto es Federico."\n\
        }\n\
    }';        
    carga_ajax(json, inComponent);
}

function load_button(inComponent){
    var json= '{\n\
        "nombre": "button",\n\
        "configuracion": {\n\
            "label": "Boton",\n\
            "type": "button",\n\
            "style": "default"\n\
        }\n\
    }';
    carga_ajax(json, inComponent, load_button_options);
}
function load_button_options(){
    return '<li class="option-style active"><a onclick="style_button(event, &#39;default&#39;)">Default</a></li>\n\
            <li class="option-style"><a onclick="style_button(event, &#39;primary&#39;)">Primary</a></li>\n\
            <li class="option-style"><a onclick="style_button(event, &#39;success&#39;)">Success</a></li>\n\
            <li class="option-style"><a onclick="style_button(event, &#39;info&#39;)">Info</a></li>\n\
            <li class="option-style"><a onclick="style_button(event, &#39;warning&#39;)">Warning</a></li>\n\
            <li class="option-style"><a onclick="style_button(event, &#39;danger&#39;)">Danger</a></li>';
}

/**
 * Fixed footer
 */
function load_fixed_footer(inComponent){
    var componentes= '"componentes": [';
    componentes += '{\n\
            "nombre": "text",\n\
            "configuracion": {\n\
                "value": "Esto es un Pie de Pagina."\n\
            }\n\
    }';    
    componentes += ']';
    var paragraph= '{\n\
        "nombre": "parrafo",\n\
        "configuracion": {\n\
            "align": "center"\n\
        },';
    paragraph += componentes + '}';
    
    var json= '{\n\
        "nombre": "fixed_footer",\n\
        "componentes": [';
    json += paragraph + ']}';
        
    carga_ajax(json, inComponent);
}

/**
 * Jumbotron
 */
function load_jumbotron(inComponent){
    var json= '{\n\
        "nombre": "jumbotron",\n\
        "configuracion": {\n\
            "titulo": "Esto es un Jumbotron",\n\
            "contenido": "Este es el contenido principal del Jumbotron, donde usted realizara toda la descripcion denecesaria de la noticia.",\n\
            "href": "#",\n\
            "label": "Leer Más"\n\
        }\n\
    }';
        
    carga_ajax(json, inComponent);
}

/**
 * Alert Message
 */
function load_alertMessage(inComponent){
    var json= '{\n\
        "nombre": "alert_message",\n\
        "configuracion": {\n\
            "type": "info",\n\
            "strong": "Exito!",\n\
            "message": "La actividad se realizo correctamente."\n\
        }\n\
    }';
        
    carga_ajax(json, inComponent, load_alertMessage_options);
}
function load_alertMessage_options(){
    return '<li class="option-alert active"><a onclick="alert(event, &#39;info&#39;)">Alert Info</a></li><li class="option-alert"><a onclick="alert(event, &#39;success&#39;)">Alert Success</a></li>\n\
            <li class="option-alert"><a onclick="alert(event, &#39;warning&#39;)">Alert Warning</a></li><li class="option-alert"><a onclick="alert(event, &#39;danger&#39;)">Alert Danger</a></li>';
}

/**
 * Progress Bar
 */
function load_progressBar(inComponent){
    var json= '{\n\
        "nombre": "progress_bar",\n\
        "configuracion": {\n\
            "porcentaje": "50",\n\
            "striped": "si"\n\
        }\n\
    }';
        
    carga_ajax(json, inComponent, load_progressBar_options);
}
function load_progressBar_options(){
    return '<li class="active"><a onclick="progress_striped(event)">Striped</a></li>';
}

/**
 * Panel
 */
function load_panel(inComponent){
    var json= '{\n\
        "nombre": "panel",\n\
        "configuracion": {\n\
            "titulo": "Panel",\n\
            "contenido": "Este es el contenido principal del Panel. La descripcion del articulo",\n\
            "pie": "Pie del Panel"\n\
        }\n\
    }';
        
    carga_ajax_fn(json, inComponent, load_panel_sortable, null);
}
function load_panel_sortable(){
    $("#builder").children().last().find(".panel-body").addClass("sortable");
}

/**
 * Well
 */
function load_well(inComponent){
    var json= '{\n\
        "nombre": "well",\n\
        "configuracion": {\n\
            "contenido": "Este es el contenido del pozo/well. Escriba aqui lo que desee."\n\
        }\n\
    }';
        
    carga_ajax(json, inComponent);
}

/**
 * Simple Header
 */
function load_simpleHeader(inComponent){
    var json= '{\n\
        "nombre": "simple_header",\n\
        "configuracion": {\n\
            "primario": "Este es el Titulo",\n\
            "secundario": "Texto secundario no importante"\n\
        }\n\
    }';
        
    carga_ajax(json, inComponent);
}

/**
 * Fixed footer
 */
function load_simple_footer(inComponent){
    var componentes= '"componentes": [';
    componentes += '{\n\
            "nombre": "text",\n\
            "configuracion": {\n\
                "value": "Este es el Pie de Pagina."\n\
            }\n\
    }';    
    componentes += ']';
    var paragraph= '{\n\
        "nombre": "parrafo",\n\
        "configuracion": {\n\
            "align": "left"\n\
        },';
    paragraph += componentes + '}';
    
    var json= '{\n\
        "nombre": "simple_footer",\n\
        "componentes": [';
    json += paragraph + ']}';
        
    carga_ajax(json, inComponent);
}

/**
 * Title
 */
function load_title(inComponent){
    var json= '{\n\
        "nombre": "title",\n\
        "configuracion": {\n\
            "title": "Este es el Titulo"\n\
        }\n\
    }';
        
    carga_ajax(json, inComponent);
}

/**
 * Thumbnail
 */
function load_thumbnail(inComponent){
    var json= '{\n\
        "nombre": "thumbnail",\n\
        "configuracion": {\n\
            "src": "http://www.apetitoenlinea.com/wp-content/uploads/2012/06/happy-face-istock-300x200.jpg",\n\
            "alt": "Imagen",\n\
            "titulo": "Este es el Titulo",\n\
            "contenido": "Aqui se debe escribir todo el contenido del Thumbnail. Es la descripdion bien definida.",\n\
            "href": "#",\n\
            "label": "Ver mas"\n\
        }\n\
    }';
        
    carga_ajax(json, inComponent);
}

/**
 * Media Object
 * Ajax diferenciado
 */
function load_mediaObject(){
    var json= '{\n\
        "nombre": "media_object",\n\
        "configuracion": {\n\
            "href": "#",\n\
            "src": "data:image/jpeg;base64,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",\n\
            "alt": "Imagen",\n\
            "titulo": "Este es el Titulo",\n\
            "contenido": "Aqui se debe escribir todo el contenido del Thumbnail. Es la descripdion bien definida."\n\
        }\n\
    }';
    carga_ajax_fn(json, load_mediaObject_sortable);    
}
function load_mediaObject_sortable(){
    $("#builder").children().last().find(".hijos-media").addClass("sortable");
}

/**
 * Iframe
 */
function load_iframe(inComponent){
    var json= '{\n\
        "nombre": "iframe",\n\
        "configuracion": {\n\
            "src": "http://librosweb.es/bootstrap_3/capitulo_6/objetos_multimedia.html",\n\
            "ratio": "16:9"\n\
        }\n\
    }';
        
    carga_ajax(json, inComponent);
}


/**
 * Table
 */
function load_table(inComponent){
    //Componentes de Table
    var componentes= '"componentes": [';
    
    //Componentes de Head
    var compsHead= '"componentes": [';
    
    var cantHead= 4;
    for(var i= 1; i <= cantHead; i++){
        compsHead += '{\n\
            "nombre": "table_head_field",\n\
            "configuracion": {\n\
                "value": "Cabecera ' + i + '"\n\
            }';
        if(i < cantHead){
            compsHead += '},';
        }
        else{
            compsHead += '}';
        }
    }
    
    compsHead += ']';
    
    var jsonHead= '{\n\
        "nombre": "table_head",';
    jsonHead += compsHead + '},';
    
    componentes += jsonHead;
    
    //Itero Filas
    var cantRows= 4;
    for(var i2=1; i2 <= cantRows; i2++){
        var compsRow= '"componentes": [';
        
        for(var i3= 1; i3 <= cantHead; i3++){
            compsRow += '{\n\
                "nombre": "table_field",\n\
                "configuracion": {\n\
                    "value": "Campo ' + i2 + i3 + '"\n\
                }';
            if(i3 < cantHead){
                compsRow += '},';
            }
            else{
                compsRow += '}';
            }
        }
        
        compsRow += ']';
        
        var jsonRow= '{\n\
            "nombre": "table_row",';
        if(i2 < cantRows){
            jsonRow += compsRow + '},';
        }
        else{
            jsonRow += compsRow + '}';
        }
        componentes += jsonRow;
    }
    
    componentes += ']';
    var json= '{\n\
        "nombre": "table",';
    json += componentes + '}';

    carga_ajax(json, inComponent);
}