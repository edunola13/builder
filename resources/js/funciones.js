/**
 * Se ejecuta al principio y llama a la funcion que arma el sortable
 */
$(function() {
    load_sortable();
    //load_conexion();
});

var url= "http://edunola.com.ar/serviciosui/";
//var url= "http://localhost/uiservices/";

//OPERTACIONES QUE PUEDE REALIZAR EL USUARIO MEDIANTE EL NAVIGATION BAR
var building= true;
var estilo= "";
var nameId= "component";
var actualId= 2;
var sortableActual= $(".sort-selected");

/** Pasa al estado Vista Previa */
function vista_previa(){
    if(building){
        $(".config").hide();
        estilo= $(".estiloBuilder").attr("href");
        $(".estiloBuilder").attr("href", "");
        building= false;
        
        $("body").children().eq(1).find(".navbar-right").children().eq(0).removeClass("active");
        $("body").children().eq(1).find(".navbar-right").children().eq(1).addClass("active");
        $("body").css("padding-top","70px");
    }
}
/** Pasa al estado construyendo HTML */
function builder(){
    if(!building){
        $(".config").show();
        $(".estiloBuilder").attr("href", estilo);
        building= true;
        
        $("body").children().eq(1).find(".navbar-right").children().first().addClass("active");
        $("body").children().eq(1).find(".navbar-right").children().eq(1).removeClass("active");
    }
   
}
/** Descarga el modelo para continuar en otro momento */
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
/** Descarga el HTML listo para usar */
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
/** Abre el dialogo para cargar el modelo ya descargado */
function cargar_modelo(){
    $('#modalModelo').modal('show');
}
/** Levanta el modelo indicado y lo carga en el builder */
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
/** Limpia el builder */
function clear(){
    $("body").find('#builder').empty();
}

//FUNCIONES DE CREACION
/**
 * Actualiza la variable con el sortable sobre el que se deben agregar los componentes
 */
function actualizarSortable(elem){
    $(".sort-selected").removeClass('sort-selected');
    elem.addClass('sort-selected');
    sortableActual= elem;
}
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

/** Duplica un elemento con todos sus hijos */
function duplicarElemento(elemento) {
    var componente= elemento.html();
    elemento.parent().append('<div class="com-builder">' + componente + '</div>');
    $('html,body').animate({scrollTop: elemento.parent().children().last().offset().top});
    load_sortable();
}
/** Minimiza el componente */
function minimizar(elemento){
    var padre= elemento.parent();
    if(elemento.html() === "+"){
	elemento.attr('title', 'Minimizar');
	elemento.html("-");
	padre.find(".view:first").children().removeClass("minimizado");
    }
    else{
	elemento.attr('title', 'Maximizar');
	elemento.html("+");
	padre.find(".view:first").children().addClass("minimizado");
    }
}
/** Elimina el componente */
function eliminar(elemento){
    if(confirm('Esta seguro que desea eliminar el Componente?')){
        elemento.remove();
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
function add_com_builder(componente, datos){
    var com= '<div class="com-builder" id="' + datos["componentId"] + '"><button type="button" class="btn btn-danger btn-xs config delete pull-right" title="Delete">X</button><button type="button" class="btn btn-default btn-xs config minimize pull-right" title="Minimizar">-</button>\n\
            <a href="#" class="btn btn-success btn-xs config move pull-right" role="button" title="Move">Move</a><button type="button" class="btn btn-default btn-xs config duplicate pull-right" title="Duplicate">Duplicate</button>';
    if(datos["options"]){
        com+= '<div class="btn-group config options pull-right"><button type="button" class="btn btn-default btn-xs dropdown-toggle " data-toggle="dropdown">Options<span class="caret"></span></button><ul class="dropdown-menu" role="menu">' + datos["fn_options"]() +'</ul></div>';
    }
    if(datos["components"]){
        com+= '<div class="btn-group config pull-right"><button type="button" class="btn btn-default btn-xs dropdown-toggle " data-toggle="dropdown">Components<span class="caret"></span></button><ul class="dropdown-menu" role="menu">' + datos["fn_components"]() +'</ul></div>';
    }
    if(datos["preferences"]){
        com+= '<button type="button" class="btn btn-default btn-xs config pull-right" onclick="formulario_configuracion(\'' + datos["form"] + '\',\'' + datos["componentId"] + '\',' + datos["fn_datos"] + ')">Personalize</button>';
    }
    com+= '<p class="config">' + datos["nombre"] + '</p><div class="view">';
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
 * Consigue el elemento correspondiente del Servidor UI, segun si va a adentro de un componente o no realizar el append de
 * una manera u otra, agregar las opciones de modificacion, etc, analiza si es sortable, esconde los botones si es necesario e
 * incrementa el ID
 */
function carga_ajax_nuevo(json, datos){
    document.body.style.cursor = 'wait';
    $.ajax({
        type: "POST",
        url: url + "componente",
        data: json,
        contentType: "application/json",
        dataType: "html",
        success: function (msg) {
            msg= add_com_builder(msg, datos);
            
            if(! datos["inComponent"]){
                sortableActual.append(msg);
                //Paro sobre el componente
                $('html,body').animate({scrollTop: sortableActual.children().last().offset().top});
            }
            else{                
                var find= "#" + datos["componentPadre"];
                $(find).find(".sortable:first").append(msg);
                $('html,body').animate({scrollTop: $(find).find(".sortable:first").children().last().offset().top});
            }
            
            if(datos["sortable"]){
                datos["fn_sortable"](datos["componentId"]);
                //Actualiza el modelo Sortable
                load_sortable();
            }            
            //Si esta en Vista Previa Oculto los botones
            if(!building){
               $(".config").hide();
            }
            //Incremento el ID
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
 * Para componentes ya existentes, se los mnodifica
 * Consigue el elemento correspondiente del Servidor UI, agregar las opciones de modificacion, etc, analiza si es 
 * sortable, esconde los botones si es necesario y guarda los sub componentes y los vuelve a cargar en el componente
 */
function carga_ajax_existe(json, datos){
    document.body.style.cursor = 'wait';
    $.ajax({
        type: "POST",
        url: url + "componente",
        data: json,
        contentType: "application/json",
        dataType: "html",
        success: function (msg) {
            //Guardo los datos sotable del componente, si es que tiene
            var hijos= '';
            if(datos["sortable"]){                
                hijos= datos["fn_sortable_hijos"](datos["componentId"]);
            }
            
            $("#" + datos["componentId"]).find(".view").empty();
            $("#" + datos["componentId"]).find(".view").append(msg);
            if(datos["sortable"]){
                datos["fn_sortable"](datos["componentId"]);
                //Cargo los hijos
                datos["fn_sortable_cargar_hijos"](datos["componentId"], hijos);
                //Actualiza el modelo Sortable
                load_sortable();
            }
            if(datos['options']){
                if(datos['reset_options'] != null){
                    datos['reset_options'](datos["componentId"]);
                }
            }
            //Si esta en Vista Previa Oculto los botones
            if(!building){
                $(".config").hide();
            }
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
/** Arma el formulario de configuracion en base a un componente */
function formulario_configuracion(form, componentId, fn_datos){
    var parametros= "";
    if(componentId == null){
        componentId= '0';
    }
    else{
        //Segun el form voy a tener que sacar los datos actuales y pasarselos al form PHP
        parametros= fn_datos(componentId);        
    }
    $('#modalConfiguracion .modal-body').empty();
    document.body.style.cursor = 'wait';
    $.ajax({
        type: "GET",
        url: "forms?form=" + form + "&componentId=" + componentId + parametros,
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

/**
 * Crea una nueva fila con columnas
 */
function load_row(){
    var row= '<div class="row">';
    for (x=0;x<arguments.length;x++){
        row += '<div class="col col-md-' + arguments[x] + ' sortable"></div>';
    }
    row += '</div>';    
    var datos = {nombre:"Grilla " + arguments.length, inComponent:false, sortable: false, components: false, options: false};    
    row= add_com_builder(row, datos);    
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

function configurar_y_llamar(json, datos, componentId, componentPadre){
    if(componentPadre != null){
        datos['inComponent']= true;
        datos["componentPadre"]= componentPadre;
    }
    
    if(componentId == '0' || componentId == null){
        datos["componentId"]= nameId + actualId;
        carga_ajax_nuevo(json, datos);
    }
    else{        
        datos["componentId"]= componentId;
        carga_ajax_existe(json, datos);
    }
    
    cancelar_configuracion();
}

/** Carga del componente Formulario */
function form_config(componentId, componentPadre){
    var elem= $("#modalConfiguracion");
    var id= elem.find("input[name='id']").val(); 
    var method= elem.find("select[name='method']").val(); 
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
    
    var datos = {nombre:"Form", form:"form", fn_datos:"form_datos", inComponent:false, sortable: true, fn_sortable:load_form_sortable, fn_sortable_hijos: form_sortable_hijos,
        fn_sortable_cargar_hijos: form_sortable_cargar_hijos, components: true, fn_components: load_form_components, options: false, preferences: true};
    
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_form_sortable(componentId){
    $("#" + componentId).children().last().find(".hijos-fieldset").addClass("sortable");
}
function form_sortable_hijos(componentId){
    return $("#" + componentId).children().last().find(".hijos-fieldset:first").html();
}
function form_sortable_cargar_hijos(componentId,hijos){
    if($("#" + componentId).children().last().find(".hijos-fieldset legend").length > 0){
        $("#" + componentId).children().last().find(".hijos-fieldset").append(hijos);
        //Si viene con legend, si antes tenia elimino el viejo
        $("#" + componentId).children().last().find(".hijos-fieldset legend:nth-child(2)").remove();        
    }
    else{
        $("#" + componentId).children().last().find(".hijos-fieldset").append(hijos);
        //El form viene sin legend, entonces elimino si antes tenia
        $("#" + componentId).children().last().find(".hijos-fieldset legend").remove();
    }
}
function load_form_components(){
    return '<li><a onclick="input_config(0,\'' + nameId + actualId + '\')">Input</a></li>\n\
            <li><a onclick="textArea_config(0,\'' + nameId + actualId + '\')">Text Area</a></li>\n\
            <li><a onclick="select_config(0,\'' + nameId + actualId + '\')">Select</a></li>\n\
            <li><a onclick="checkbox_config(0,\'' + nameId + actualId + '\')">Checkbox</a></li>\n\
            <li><a onclick="radio_config(0,\'' + nameId + actualId + '\')">Radio</a></li>\n\
            <li><a onclick="button_config(0,\'' + nameId + actualId + '\')">Button</a></li>\n\
            <li><a onclick="buttons_config(0,\'' + nameId + actualId + '\')">Buttons</a></li>';
}

/** Carga del componente Login */
function login_config(componentId, componentPadre){
    var title= "Login";
    var labelButton = "Ingresar";
    var placeholderUser= "Ingrese su Email";
    var placeholderPass= "Ingrese su Contraseña";
    var labelCheck= "Recordarme";
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        title= elem.find("input[name='title']").val(); 
        labelButton= elem.find("input[name='labelButton']").val(); 
        placeholderUser= elem.find("input[name='placeholderUser']").val();
        placeholderPass= elem.find("input[name='placeholderPass']").val();
        labelCheck= elem.find("input[name='labelCheck']").val();
    }
    var json= '{\n\
        "nombre": "login",\n\
        "configuracion": {\n\
                "method": "POST",\n\
                "action": "url",\n\
                "title": "' + title + '",\n\
                "labelButton": "' + labelButton + '" \n\
        },\n\
        "datos": {\n\
            "user": {\n\
                "placeholder": "' + placeholderUser + '",\n\
                "name": "email"\n\
            },\n\
            "pass": {\n\
                "placeholder": "' + placeholderPass + '",\n\
                "name": "pass"\n\
            },\n\
            "check": {\n\
                "name": "check",\n\
                "value": "check",\n\
                "label": "' + labelCheck + '"\n\
            }\n\
        }\n\
    }';
        
    var datos = {nombre:"Login Form", form:"form_login", fn_datos:"login_datos", inComponent:false, sortable: false, 
                components: false, options: false, preferences: true};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** Carga del componente Input */
function input_config(componentId, componentPadre){    
    var id= ""; 
    var name= "nameInput"; 
    var type= "text";
    var label= "Input";
    var placeholder= "Placeholder Input";
    var size= 'md';
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        id= elem.find("input[name='id']").val(); 
        name= elem.find("input[name='name']").val(); 
        type= elem.find("input[name='type']").val();
        label= elem.find("input[name='label']").val();
        placeholder= elem.find("input[name='placeholder']").val();
        size= elem.find("select[name='size']").val();
    }
    var json= '{\n\
        "nombre": "input",\n\
        "configuracion": {\n\
            "id": "' + id + '",\n\
            "label": "' + label + '",\n\
            "type": "' + type + '",\n\
            "name": "' + name + '",\n\
            "placeholder": "' + placeholder + '",\n\
            "size": "' + size + '"\n\
            }\n\
        }';
    var datos = {nombre:"Input", form:"form_input", fn_datos:"input_datos", inComponent:false, sortable: false, 
                components: false, options: false, preferences: true};    
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** Carga del componente TextArea */
function textArea_config(componentId, componentPadre){
    var id= ""; 
    var name= "nameTextArea"; 
    var rows= 10;
    var label= "Text Area";
    var placeholder= "Placeholder TextArea";
    var size= "md";
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        id= elem.find("input[name='id']").val(); 
        name= elem.find("input[name='name']").val(); 
        rows= elem.find("input[name='rows']").val();
        label= elem.find("input[name='label']").val();
        placeholder= elem.find("input[name='placeholder']").val();
        size= elem.find("select[name='size']").val();
    }
    var json= '{\n\
        "nombre": "textarea",\n\
        "configuracion": {\n\
            "id": "' + id + '",\n\
            "label": "' + label + '",\n\
            "name": "' + name + '",\n\
            "placeholder": "' + placeholder +'",\n\
            "rows": "' + rows + '",\n\
            "size": "' + size + '"\n\
        }\n\
    }';
    var datos = {nombre:"Text Area", form:"form_textarea", fn_datos:"textarea_datos", inComponent:false, 
                sortable: false, components: false, options: false, preferences:true};    
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** Select */
function select_config(componentId, componentPadre){
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
    
    var id= ""; 
    var name= "nameSelect";
    var label= "Select";
    var multiple= "no";
    var size= "md";
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        id= elem.find("input[name='id']").val(); 
        name= elem.find("input[name='name']").val();
        label= elem.find("input[name='label']").val();
        if(elem.find("input[name='multiple']").is(':checked')){
            multiple= "si";
        }
        size= elem.find("select[name='size']").val();
    }
    var json= '{\n\
        "nombre": "select",\n\
        "configuracion": {\n\
            "id": "' + id + '",\n\
            "label": "' + label + '",\n\
            "name": "' + name + '",\n\
            "multiple": "' + multiple + '",\n\
            "size": "' + size + '"\n\
        },';
    json += componentes + '}';
    
    var datos = {nombre:"Select", form:"form_select", fn_datos:"select_datos", inComponent:false, 
                sortable: false, components: false, options: false, preferences:true};    
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** CheckBox */
function checkbox(componentId){
    var id= "checkOp"; 
    var name= "nameCheck";
    var label= "CheckBox";
    var enlinea= "no";
    var size= "md";
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        id= elem.find("input[name='id']").val(); 
        name= elem.find("input[name='name']").val();
        label= elem.find("input[name='label']").val();
        if(elem.find("input[name='inline']").is(':checked')){
            enlinea= "si";
        }
        size= elem.find("select[name='size']").val();
    }
    var componentes= '"componentes": [';
    var cant= 2;
    for(var i= 0; i < 2; i++){
        componentes += '{\n\
            "nombre": "checkbox_option",\n\
            "configuracion": {\n\
                "label": "opcion ' + i + '",\n\
                "name": "' + name + '",\n\
                "inline": "' + enlinea + '",\n\
                "id": "' + id + i + '",\n\
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
            "label": "' + label + '",\n\
            "size": "' + size + '"\n\
        },';
    json += componentes + '}';
    
    return json;
}
function checkbox_config(componentId, componentPadre){
    var datos = {nombre:"CheckBox", form:"form_checkbox", fn_datos: "checkbox_datos", inComponent:false, 
                sortable: false, components: false, options: false, preferences:true};    
    configurar_y_llamar(checkbox(componentId), datos, componentId, componentPadre);
}

/** Radio Button */
function radio(componentId){
    var id= "RadioOp"; 
    var name= "nameRadio";
    var label= "Radio";
    var enlinea= "no";
    var size= "md";
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        id= elem.find("input[name='id']").val(); 
        name= elem.find("input[name='name']").val();
        label= elem.find("input[name='label']").val();
        if(elem.find("input[name='inline']").is(':checked')){
            enlinea= "si";
        }
        size= elem.find("select[name='size']").val();
    }
    var componentes= '"componentes": [';
    var cant= 2;
    for(var i= 0; i < 2; i++){
        componentes += '{\n\
            "nombre": "radio_option",\n\
            "configuracion": {\n\
                "label": "opcion ' + i + '",\n\
                "name": "' + name + '",\n\
                "inline": "' + enlinea + '",\n\
                "id": "' + id + i + '",\n\
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
            "label": "' + label + '",\n\
            "size": "' + size + '"\n\
        },';
    json += componentes + '}';
    
    return json;
}
function radio_config(componentId, componentPadre){
    var datos = {nombre:"Radio Button", form:"form_radio", fn_datos:"radio_datos", inComponent:false,
                sortable: false, components: false, options: false, preferences:true};    
    configurar_y_llamar(radio(componentId), datos, componentId, componentPadre);
}

/** Button */
function button_config(componentId, componentPadre){
    var label= "Button";
    var size= "md";
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        label= elem.find("input[name='label']").val();
        size= elem.find("select[name='size']").val();
    }
    var json= '{\n\
        "nombre": "button",\n\
        "configuracion": {\n\
            "label": "'+label+'",\n\
            "type": "button",\n\
            "style": "default",\n\
            "size": "'+size+'"\n\
        }\n\
    }';
    var datos = {nombre:"Button", form:"form_button", fn_datos:"button_datos", inComponent:false, sortable: false, components: false, 
                options: true, fn_options:load_button_options, reset_options: button_reset_options, preferences:true};    
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_button_options(){
    return '<li><a onclick="pull_right(event)">Right</a></li>\n\
            <li class="option-style active"><a onclick="style_button(event, &#39;default&#39;)">Default</a></li>\n\
            <li class="option-style"><a onclick="style_button(event, &#39;primary&#39;)">Primary</a></li>\n\
            <li class="option-style"><a onclick="style_button(event, &#39;success&#39;)">Success</a></li>\n\
            <li class="option-style"><a onclick="style_button(event, &#39;info&#39;)">Info</a></li>\n\
            <li class="option-style"><a onclick="style_button(event, &#39;warning&#39;)">Warning</a></li>\n\
            <li class="option-style"><a onclick="style_button(event, &#39;danger&#39;)">Danger</a></li>';
}
function button_reset_options(componentId){
    $("#" + componentId).find('.options').find('li').removeClass('active');
    $("#" + componentId).find('.options').find('li:nth-child(2)').addClass('active');
}

/** Buttons */
function buttons_config(componentId, componentPadre){
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

    var datos = {nombre:"Buttons Form", inComponent:false, sortable: false, components: false, options: false, preferences:false};    
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** Button Group */
function button_group_config(componentId, componentPadre){
    var json= '{\n\
        "nombre": "button_group",\n\
        "configuracion": {\n\
            "vertical": "no",\n\
            "size": "md",\n\
            "label": "Un Button Group"\n\
        },\n\
        "componentes":[\n\
            {"nombre": "button",\n\
            "configuracion": {\n\
                "label": "Boton1",\n\
                "type": "button",\n\
                "style": "default"\n\
            }},\n\
            {"nombre": "button",\n\
            "configuracion": {\n\
                "label": "Boton2",\n\
                "type": "button",\n\
                "style": "primary"\n\
            }},\n\
            {"nombre": "button",\n\
            "configuracion": {\n\
                "label": "Boton3",\n\
                "type": "button",\n\
                "style": "success"\n\
            }}\n\
         ]\n\
    }';    
    var datos = {nombre:"Button Group", inComponent:false, sortable: false,
                components: false, options: true, fn_options:load_button_group_options, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_button_group_options(){
    return '<li><a onclick="pull_right(event)">Right</a></li>\n\
            <li><a onclick="vertical_group(event)">Vertical</a></li>';
}

/** Button Toolbar */
function button_toolbar_config(componentId, componentPadre){
    var json= '{\n\
        "nombre": "button_toolbar",\n\
        "componentes":[\n\
            {"nombre": "button_group",\n\
            "configuracion": {\n\
                "vertical": "no",\n\
                "size": "md",\n\
                "label": "Un Button Group"\n\
            },\n\
            "componentes":[\n\
                {"nombre": "button",\n\
                "configuracion": {\n\
                    "label": "Boton1",\n\
                    "type": "button",\n\
                    "style": "default"\n\
                }},\n\
                {"nombre": "button",\n\
                "configuracion": {\n\
                    "label": "Boton2",\n\
                    "type": "button",\n\
                    "style": "primary"\n\
                }},\n\
                {"nombre": "button",\n\
                "configuracion": {\n\
                    "label": "Boton3",\n\
                    "type": "button",\n\
                    "style": "success"\n\
                }}\n\
            ]},\n\
            {"nombre": "button_group",\n\
            "configuracion": {\n\
                "vertical": "no",\n\
                "size": "md",\n\
                "label": "Un Button Group"\n\
            },\n\
            "componentes":[\n\
                {"nombre": "button",\n\
                "configuracion": {\n\
                    "label": "Boton1",\n\
                    "type": "button",\n\
                    "style": "default"\n\
                }},\n\
                {"nombre": "button",\n\
                "configuracion": {\n\
                    "label": "Boton2",\n\
                    "type": "button",\n\
                    "style": "primary"\n\
                }},\n\
                {"nombre": "button",\n\
                "configuracion": {\n\
                    "label": "Boton3",\n\
                    "type": "button",\n\
                    "style": "success"\n\
                }}\n\
            ]}\n\
        ]\n\
    }';    
    var datos = {nombre:"Button Toolbar", inComponent:false, sortable: false,
                components: false, options: true, fn_options:load_button_toolbar_options, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_button_toolbar_options(){
    return '<li><a onclick="pull_right(event)">Right</a></li>\n\
            <li><a onclick="vertical_group(event)">Vertical</a></li>';
}

/** Paginator */
function paginator_config(componentId, componentPadre){
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

    var datos = {nombre:"Paginator", inComponent:false, sortable: false, 
                components: false, options: true, fn_options:load_paginator_options , preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_paginator_options(){
    return '<li><a onclick="pull_right(event)">Right</a></li>';
}

/** List */
function list_config(componentId, componentPadre){
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

    var datos = {nombre:"List", inComponent:false, sortable: false, 
                components: false, options: false, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** List a */
function listA_config(componentId, componentPadre){
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

    var datos = {nombre:"List of A", inComponent:false, sortable: false, 
                components: false, options: false, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** Paragraph */
function paragraph_config(componentId, componentPadre){
    var texto= "Este es el texto por defecto del Parrafo";
    var type= "text";
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        texto= elem.find("textarea[name='texto']").val();
        type= elem.find("select[name='type']").val();
    }
    var componentes= '"componentes": [';
    componentes += '{\n\
            "nombre": "'+type+'",\n\
            "configuracion": {\n\
                "value": "'+texto+'"\n\
            }\n\
    }';
    
    componentes += ']';
    var json= '{\n\
        "nombre": "parrafo",\n\
        "configuracion": {\n\
            "align": "center"\n\
        },';
    json += componentes + '}';

    var datos = {nombre:"Paragraph", form:"form_paragraph", fn_datos:"paragraph_datos",inComponent:false, sortable: false, 
                components: false, options: true, fn_options:load_paragraph_options, reset_options:paragraph_reset_options, preferences: true};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_paragraph_options(){
    return '<li><a onclick="lead(event)">Lead</a></li>\n\
            <li class="option-align active"><a onclick="align(event, &#39;center&#39;)">Align Center</a></li><li class="option-align"><a onclick="align(event, &#39;left&#39;)">Align Left</a></li></li><li class="option-align"><a onclick="align(event, &#39;right&#39;)">Align Right</a></li>';
}
function paragraph_reset_options(componentId){
    $("#" + componentId).find('.options').find('li').removeClass('active');
    $("#" + componentId).find('.options').find('li:nth-child(2)').addClass('active');
}

/** Drop down Menu */
function drop_down_menu_config(componentId, componentPadre){
    var label= "Desplegar Opciones";
    var style= "default";
    var size= "md";
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        style= elem.find("select[name='style']").val();
        size= elem.find("select[name='size']").val();
    }
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
            "label": "' + label + '",\n\
            "style": "' + style +'",\n\
            "size": "' + size + '"\n\
        },';
    json += componentes + '}';

    var datos = {nombre:"Drop Down Menu", form:"form_drop_down_menu", fn_datos:"drop_down_menu_form", inComponent:false, sortable: false, 
                components: false, options: true, fn_options:load_drop_down_menu_options, reset_options:drop_down_menu_reset_options, preferences: true};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_drop_down_menu_options(){
    return '<li><a onclick="pull_right(event)">Right</a></li>';
}
function drop_down_menu_reset_options(componentId){
    $("#" + componentId).find('.options:first').find('li').removeClass('active');
}

/** Navigation Menu */
function navigation_menu_config(componentId, componentPadre){
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

    var datos = {nombre:"Navigation Menu", inComponent:false, sortable: false, 
                components: false, options: true, fn_options:load_navigation_menu_options, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_navigation_menu_options(){
    return '<li class="active"><a onclick="pills(event)">Pills</a></li>\n\
            <li><a onclick="justified(event)">Justified</a></li>\n\
            <li><a onclick="stacked(event)">Stacked</a></li>\n\
            <li><a onclick="pull_right_menu(event)">Other</a></li>';
}

/** Navigation Bar */
function navigation_bar_config(componentId, componentPadre){
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

    var datos = {nombre:"Navigation Bar", inComponent:false, sortable: false, 
                components: false, options: true, fn_options:load_navigation_bar_options, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_navigation_bar_options(){
    return '<li><a onclick="inverse(event)">Inverse</a></li>';
}

/** Breadcrumb */
function breadcrumb_config(componentId, componentPadre){
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

    var datos = {nombre:"Breadcrumb", inComponent:false, sortable: false, 
                components: false, options: false, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** Panel */
function panel_config(componentId, componentPadre){    
    var titulo= 'Titulo del Panel'; 
    var pie= 'Pie de Panel';
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        titulo= elem.find("input[name='titulo']").val(); 
        pie= elem.find("input[name='pie']").val();
    }
    
    var json= '{\n\
        "nombre": "panel",\n\
        "configuracion": {\n\
            "titulo": "'+titulo+'",\n\
            "pie": "'+pie+'"\n\
        }\n\
    }';
    
    var datos = {nombre:"Panel", form:"form_panel", fn_datos:"panel_datos", inComponent:false, sortable: true, fn_sortable: load_panel_sortable, fn_sortable_hijos: panel_sortable_hijos,
                fn_sortable_cargar_hijos: panel_sortable_cargar_hijos, components: false, options: false, preferences: true};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_panel_sortable(componentId){
    $("#" + componentId).find(".panel-body:first").addClass("sortable");
}
function panel_sortable_hijos(componentId){
    return $("#" + componentId).children().last().find(".panel-body:first").html();
}
function panel_sortable_cargar_hijos(componentId,hijos){
    $("#" + componentId).children().last().find(".panel-body:first").append(hijos);
}

/** Media Object */
function mediaObject_config(componentId, componentPadre){
    var titulo= 'Este es el titulo'; 
    var contenido= 'Aqui se debe escribir todo el contenido del Thumbnail. Es la descripdion bien definida.';
    var src= 'http://upload.wikimedia.org/wikipedia/commons/1/12/Openshareicon-128x128.png';
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        titulo= elem.find("input[name='titulo']").val(); 
        contenido= elem.find("input[name='contenido']").val();
        src= elem.find("input[name='src']").val();
    }
    var json= '{\n\
        "nombre": "media_object",\n\
        "configuracion": {\n\
            "href": "#",\n\
            "src": "'+src+'",\n\
            "alt": "Imagen",\n\
            "titulo": "'+titulo+'",\n\
            "contenido": "'+contenido+'"\n\
        }\n\
    }';
    var datos = {nombre:"Media Object", form:"form_mediaObject", fn_datos:"mediaObject_datos", inComponent:false, sortable: true, fn_sortable: load_mediaObject_sortable,fn_sortable_hijos: mediaObject_sortable_hijos,
                fn_sortable_cargar_hijos: mediaObject_sortable_cargar_hijos, components: false, options: false, preferences: true};
    configurar_y_llamar(json, datos, componentId, componentPadre);  
}
function load_mediaObject_sortable(componentId){
    $("#" + componentId).find(".hijos-media:first").addClass("sortable");
}
function mediaObject_sortable_hijos(componentId){
    return $("#" + componentId).children().last().find(".hijos-media:first").html();
}
function mediaObject_sortable_cargar_hijos(componentId,hijos){
    $("#" + componentId).children().last().find(".hijos-media:first").append(hijos);
}

/** Table */
function table_config(componentId, componentPadre){
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

    var datos = {nombre:"Table", inComponent:false, sortable: false,
                components: false, options: false, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre); 
}

//ESTATICOS

/** Realia la carga del formulario de busqueda */
function searchForm_config(componentId, componentPadre){
    var json= '{\n\
           "nombre": "form_search",\n\
           "configuracion": {\n\
                "label": "Formulario de Busqueda"\n\
           }\n\
    }';
    var datos = {nombre:"Form Search", inComponent:false, sortable: false, 
                components: false, options: false, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** Simple Paginator */
function simplePaginator_config(componentId, componentPadre){
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
    var datos = {nombre:"Simple Paginator", inComponent:false, sortable: false, 
                components: false, options: false, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** Image */
function image_config(componentId, componentPadre){
    var src= 'http://lorempixel.com/140/140/';
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        src= elem.find("input[name='src']").val();
    }
    var json= '{\n\
        "nombre": "image",\n\
        "configuracion": {\n\
            "alt": "Imagen",\n\
            "src": "'+src+'",\n\
            "type": "img-rounded"\n\
        }\n\
    }';
        
    var datos = {nombre:"Image", form:"form_image", fn_datos:"image_datos", inComponent:false, sortable: false, 
                components: false, options: true, fn_options:load_image_options, reset_options:image_reset_options, preferences: true};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_image_options(){
    return '<li><a onclick="pull_right(event)">Right</a></li>\n\
            <li class="option-image active"><a onclick="image_type(event, &#39;rounded&#39;)">Rounded</a></li><li class="option-image"><a onclick="image_type(event, &#39;circle&#39;)">Circle</a></li><li class="option-image"><a onclick="image_type(event, &#39;thumbnail&#39;)">Thumbnail</a></li>';
}
function image_reset_options(componentId){
    $("#" + componentId).find(".options").find('li').removeClass('active');
    $("#" + componentId).find(".options").find("li:nth-child(2)").addClass("active");
}

/** Address */
function address_config(componentId, componentPadre){
    var json= '{\n\
        "nombre": "address",\n\
        "configuracion": {\n\
            "nombre": "Nombre Empresa",\n\
            "direccion": "Avenida Archuby 1300",\n\
            "localidad": "La Plata, Buenos Aires",\n\
            "telefono": "470-5689"\n\
        }\n\
    }';
        
    var datos = {nombre:"Address", inComponent:false, sortable: false, 
                components: false, options:true, fn_options:load_address_options, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_address_options(){
    return '<li><a onclick="pull_right(event)">Right</a></li>';
}

/** Badge */
function badge_config(componentId, componentPadre){
    var json= '{\n\
        "nombre": "badge",\n\
        "configuracion": {\n\
            "href": "#",\n\
            "label": "Un Link",\n\
            "badge": "15"\n\
        }\n\
    }';
    var datos = {nombre:"Badge", inComponent:false, sortable: false, 
                components: false, options:true, fn_options:load_badge_options, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_badge_options(){
    return '<li><a onclick="pull_right(event)">Right</a></li>';
}

/** Button Badge */
function buttonBadge_config(componentId, componentPadre){
    var label= "Button";
    var badge= "14";
    var size= "md";
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        label= elem.find("input[name='label']").val();
        badge= elem.find("input[name='badge']").val();
        size= elem.find("select[name='size']").val();
    }
    var json= '{\n\
        "nombre": "button_badge",\n\
        "configuracion": {\n\
            "id": "",\n\
            "style": "default",\n\
            "size": "'+size+'",\n\
            "type": "button",\n\
            "label": "'+label+'",\n\
            "badge": "'+badge+'"\n\
        }\n\
    }';
    var datos = {nombre:"Button Badge", form:"form_buttonBadge", fn_datos:"buttonBadge_datos", inComponent:false, sortable: false, 
                components: false, options:true, fn_options:load_button_badge_options, reset_options:button_badge_reset_options, preferences: true};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_button_badge_options(){
    return '<li><a onclick="pull_right(event)">Right</a></li>\n\
            <li class="option-style active"><a onclick="style_button(event, &#39;default&#39;)">Default</a></li>\n\
            <li class="option-style"><a onclick="style_button(event, &#39;primary&#39;)">Primary</a></li>\n\
            <li class="option-style"><a onclick="style_button(event, &#39;success&#39;)">Success</a></li>\n\
            <li class="option-style"><a onclick="style_button(event, &#39;info&#39;)">Info</a></li>\n\
            <li class="option-style"><a onclick="style_button(event, &#39;warning&#39;)">Warning</a></li>\n\
            <li class="option-style"><a onclick="style_button(event, &#39;danger&#39;)">Danger</a></li>';
}
function button_badge_reset_options(componentId){
    $("#" + componentId).find('.options').find('li').removeClass('active');
    $("#" + componentId).find('.options').find('li:nth-child(2)').addClass('active');
}

/** Blockquote */
function blockquote_config(componentId, componentPadre){
    var texto= "Este es un texto de una fuente externa a esta pagina. Por eso se encierra en Blockquotes."; 
    var fuente= "La fuente del texto es Federico.";
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        texto= elem.find("input[name='texto']").val(); 
        fuente= elem.find("input[name='fuente']").val();
    }
    var json= '{\n\
        "nombre": "blockquote",\n\
        "configuracion": {\n\
            "texto": "' + texto + '",\n\
            "fuente": "' + fuente + '"\n\
        }\n\
    }';        
    var datos = {nombre:"Blockquote", form:"form_blockquote", fn_datos:"blockquote_datos", inComponent:false, sortable: false, 
                components: false, options:false, preferences: true};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** Fixed footer */
function fixed_footer_config(componentId, componentPadre){
    var json= '{\n\
        "nombre": "fixed_footer"\n\
        }';        
    var datos = {nombre:"Fixed Footer", inComponent:false, sortable: true, fn_sortable:load_fixed_footer_sortable, 
                components: false, options:false, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_fixed_footer_sortable(componentId){
    $("#" + componentId).children().last().find(".fixedFooter").addClass("sortable");
}

/** Jumbotron */
function jumbotron_config(componentId, componentPadre){
    var titulo= "Esto es un Jumbotron"; 
    var contenido= "Este es el contenido principal del Jumbotron, donde usted realizara toda la descripcion denecesaria de la noticia.";
    var href= "#";
    var label= "Leer Más";
    var buttonStyle= "primary";
    var buttonSize= "md";
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        titulo= elem.find("input[name='titulo']").val(); 
        contenido= elem.find("input[name='contenido']").val();
        label= elem.find("input[name='label']").val();
        buttonStyle= elem.find("select[name='style']").val(); 
        buttonSize= elem.find("select[name='size']").val();
    }
    var json= '{\n\
        "nombre": "jumbotron",\n\
        "configuracion": {\n\
            "titulo": "' + titulo + '",\n\
            "contenido": "'+contenido+'",\n\
            "href": "'+href+'",\n\
            "label": "'+label+'",\n\
            "buttonStyle": "'+buttonStyle+'",\n\
            "buttonSize": "'+buttonSize+'"\n\
        }\n\
    }';
        
    var datos = {nombre:"Jumbotron", form:"form_jumbotron", fn_datos:"jumbotron_datos", inComponent:false, sortable: false, 
                components: false, options:false, preferences: true};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** Alert Message */
function alertMessage_config(componentId, componentPadre){
    var json= '{\n\
        "nombre": "alert_message",\n\
        "configuracion": {\n\
            "type": "info",\n\
            "strong": "Exito!",\n\
            "message": "La actividad se realizo correctamente."\n\
        }\n\
    }';
    var datos = {nombre:"Alert Message", inComponent:false, sortable: false, 
                components: false, options:true, fn_options:load_alertMessage_options, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_alertMessage_options(){
    return '<li class="option-alert active"><a onclick="alert(event, &#39;info&#39;)">Alert Info</a></li><li class="option-alert"><a onclick="alert(event, &#39;success&#39;)">Alert Success</a></li>\n\
            <li class="option-alert"><a onclick="alert(event, &#39;warning&#39;)">Alert Warning</a></li><li class="option-alert"><a onclick="alert(event, &#39;danger&#39;)">Alert Danger</a></li>';
}

/** Progress Bar */
function progressBar_config(componentId, componentPadre){
    var json= '{\n\
        "nombre": "progress_bar",\n\
        "configuracion": {\n\
            "porcentaje": "50",\n\
            "striped": "si"\n\
        }\n\
    }';
        
    var datos = {nombre:"Progress Bar", inComponent:false, sortable: false, 
                components: false, options:true, fn_options:load_progressBar_options, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_progressBar_options(){
    return '<li class="active"><a onclick="progress_striped(event)">Striped</a></li>';
}

/** Well */
function well_config(componentId, componentPadre){
    var contenido= "Este es el contenido del pozo/well. Escriba aqui lo que desee.";
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        contenido= elem.find("input[name='contenido']").val();
    }
    var json= '{\n\
        "nombre": "well",\n\
        "configuracion": {\n\
            "contenido": "'+contenido+'"\n\
        }\n\
    }';
    var datos = {nombre:"Well", form:"form_well", fn_datos:"well_datos", inComponent:false, sortable: false, 
                components: false, options:false, preferences: true};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** Simple Header */
function simpleHeader_config(componentId, componentPadre){
    var primario= "Este es el Titulo"; 
    var secundario= "Texto secundario menos importante";
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        primario= elem.find("input[name='primario']").val(); 
        secundario= elem.find("input[name='secundario']").val();
    }
    var json= '{\n\
        "nombre": "simple_header",\n\
        "configuracion": {\n\
            "primario": "'+primario+'",\n\
            "secundario": "'+secundario+'"\n\
        }\n\
    }';
    var datos = {nombre:"Simple Header", form:"form_simpleHeader", fn_datos:"simpleHeader_datos", inComponent:false, sortable: false, 
                components: false, options:false, preferences: true};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** Fixed footer */
function simple_footer_config(componentId, componentPadre){
    var json= '{\n\
        "nombre": "simple_footer"\n\
        }';
    var datos = {nombre:"Simple Footer", inComponent:false, sortable: true, fn_sortable:load_simple_footer_sortable,
        components: false, options:false, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}
function load_simple_footer_sortable(componentId){
    $("#" + componentId).children().last().find(".simpleFooter").addClass("sortable");
}

/** Title */
function title_config(componentId, componentPadre){
    var titulo= "Este es el Titulo";
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        titulo= elem.find("input[name='titulo']").val();
    }
    var json= '{\n\
        "nombre": "title",\n\
        "configuracion": {\n\
            "title": "'+titulo+'"\n\
        }\n\
    }';
    var datos = {nombre:"Title", form:"form_title", fn_datos:"title_datos",inComponent:false, sortable: false, 
                components: false, options:false, preferences: true};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** Thumbnail */
function thumbnail_config(componentId, componentPadre){
    var titulo= "Esto es un Jumbotron"; 
    var contenido= "Aqui se debe escribir todo el contenido del Thumbnail. Es la descripdion bien definida.";
    var label= "Leer Más";
    var buttonStyle= "primary";
    var buttonSize= "md";
    var src= "http://www.apetitoenlinea.com/wp-content/uploads/2012/06/happy-face-istock-300x200.jpg"
    if(componentId != 0 && componentId != null){
        var elem= $("#modalConfiguracion");
        titulo= elem.find("input[name='titulo']").val(); 
        contenido= elem.find("input[name='contenido']").val();
        label= elem.find("input[name='label']").val();
        buttonStyle= elem.find("select[name='style']").val(); 
        buttonSize= elem.find("select[name='size']").val();
        src= elem.find("input[name='src']").val();
    }
    var json= '{\n\
        "nombre": "thumbnail",\n\
        "configuracion": {\n\
            "src": "'+src+'",\n\
            "alt": "Imagen",\n\
            "titulo": "'+titulo+'",\n\
            "contenido": "'+contenido+'",\n\
            "href": "#",\n\
            "label": "'+label+'",\n\
            "buttonStyle": "'+buttonStyle+'",\n\
            "buttonSize": "'+buttonSize+'"\n\
        }\n\
    }';
    var datos = {nombre:"Thumbnail", form:"form_thumbnail", fn_datos:"thumbnail_datos", inComponent:false, sortable: false, 
                components: false, options:false, preferences: true};
    configurar_y_llamar(json, datos, componentId, componentPadre);
}

/** Iframe */
function iframe_config(componentId, componentPadre){
    var json= '{\n\
        "nombre": "iframe",\n\
        "configuracion": {\n\
            "src": "http://librosweb.es/bootstrap_3/capitulo_6/objetos_multimedia.html",\n\
            "ratio": "16:9"\n\
        }\n\
    }';
    var datos = {nombre:"Iframe", inComponent:false, sortable: false, 
                components: false, options:false, preferences: false};
    configurar_y_llamar(json, datos, componentId, componentPadre);
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
 * Agrega la clase pull-right en el nodo principal del componente
 * utilizado por: panel, badge, image
 */
function vertical_group(event){
   var target = $(event.target);
   var div= target.parent().parent().parent().parent();
   var view= div.children().last();
   
   if(target.parent().hasClass("active")){
       view.find('.btn-group').removeClass("btn-group-vertical");
       target.parent().removeClass("active");
   }
   else{
       view.find('.btn-group').addClass("btn-group-vertical");
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
/**
 * Agrega estilo a un boton
 * utilizado por: button
 */
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
 * Agrega la clase navbar-inverse en el nodo principal del componente
 * utilizado por: navigation_bar
 */
function inverse(event){
   var target = $(event.target);
   var div= target.parent().parent().parent().parent();
   var view= div.children().last();
   var componente= view.children().first();
   
   if(target.parent().hasClass("active")){
       componente.removeClass("navbar-inverse");
       target.parent().removeClass("active");
   }
   else{
       componente.addClass("navbar-inverse");
       target.parent().addClass("active");
   }
}