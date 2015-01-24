<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Builder HTML</title>

    <!-- Servicios UI - CSS-->
    <?php echo Tags::theme();?>
     
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </script>
  </head>
  <body>
      <link class="estiloBuilder" href="<?php echo base()?>resources/css/estilo.css" rel="stylesheet">
      <?php echo Tags::navigation_bar("Builder", base())?>
        <?php echo Tags::nav_bar_left();?>
            <?php echo Tags::nav_item_drop_down("Grillas");?>
                <?php echo Tags::menu_item("item_onclick", "Grilla 12", "load_row(12)"); ?>
                <?php echo Tags::menu_item("item_onclick", "Grilla 4-4-4", "load_row(4,4,4)"); ?>
                <?php echo Tags::menu_item("item_onclick", "Grilla 6-6", "load_row(6,6)"); ?>
                <?php echo Tags::menu_item("item_onclick", "Grilla 4-8", "load_row(4,8)"); ?>
                <?php echo Tags::menu_item("item_onclick", "Grilla 8-4", "load_row(8,4)"); ?>
            <?php echo Tags::end_nav_item_drop_down();?>
            <?php echo Tags::nav_item_drop_down("Compuestos");?>
                <?php echo Tags::menu_item("item_onclick", "Form", "formulario_configuracion('form')"); ?>
                <?php echo Tags::menu_item("item_onclick", "Login", "login_config()"); ?>
                <?php echo Tags::menu_item('divider');?>
                <?php echo Tags::menu_item("item_onclick", "Drop Down Menu", "load_drop_down_menu()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Navigation Menu", "load_navigation_menu()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Navigation Bar", "load_navigation_bar()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Breadcrumb", "load_breadcrumb()"); ?>
                <?php echo Tags::menu_item('divider');?>
                <?php echo Tags::menu_item("item_onclick", "List", "load_list()"); ?>
                <?php echo Tags::menu_item("item_onclick", "List A", "load_listA()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Media Object", "load_mediaObject()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Paginator", "load_paginator()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Panel", "load_panel()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Paragraph", "load_paragraph()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Table", "load_table()"); ?>
            <?php echo Tags::end_nav_item_drop_down();?>
            <?php echo Tags::nav_item_drop_down("Estaticos");?>
                <?php echo Tags::menu_item("item_onclick", "Address", "load_address()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Alert Message", "load_alertMessage()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Badge", "load_badge()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Blockquote", "load_blockquote()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Button", "load_button()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Fixed Footer", "load_fixed_footer()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Form Search", "load_searchForm()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Iframe", "load_iframe()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Image", "load_image()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Jumbotron", "load_jumbotron()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Simple Paginator", "load_simplePaginator()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Progress Bar", "load_progressBar()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Simple Footer", "load_simple_footer()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Simple Header", "load_simpleHeader()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Thumbnail", "load_thumbnail()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Title", "load_title()"); ?>
                <?php echo Tags::menu_item("item_onclick", "Well", "load_well()"); ?>
            <?php echo Tags::end_nav_item_drop_down();?>
        <?php echo Tags::end_nav_bar_left();?>
      
        <?php echo Tags::nav_bar_right();?>
            <?php echo Tags::nav_item("Construir", "javascript:builder();", "active")?>
            <?php echo Tags::nav_item("Vista Previa", "javascript:vista_previa();");?>
            <?php echo Tags::nav_item_drop_down("Mas Opciones"); ?>
                <?php echo Tags::menu_item("item", "Descargar HTML", "javascript:descargar_html();"); ?>
                <?php echo Tags::menu_item("item", "Descargar Modelo", "javascript:descargar_modelo();"); ?>
                <?php echo Tags::menu_item("item", "Cargar Modelo", "javascript:cargar_modelo();"); ?>
                <?php echo Tags::menu_item("item", "Limpiar", "javascript:clear();"); ?>
            <?php echo Tags::end_nav_item_drop_down(); ?>
        <?php echo Tags::end_nav_bar_right();?>
      <?php echo Tags::end_navigation_bar();?>

      <div class="container sortable" id="builder">
        <div class="com-builder" id="component1">            
            <button type="button" class="btn btn-danger btn-xs config delete pull-right" title="Delete">X</button>
			<button type="button" class="btn btn-default btn-xs config minimize pull-right" title="Minimizar">-</button>
            <a href="#" class="btn btn-success btn-xs config move pull-right" role="button" title="Move">Move</a>
            <button type="button" class="btn btn-default btn-xs config duplicate pull-right" title="Duplicate">Duplicate</button>			
            <p class="config">Grilla 12</p>
            <div class="view">
                <div class="row">
                    <div class="col col-md-12 sortable"></div>
                </div>
            </div>
        </div>
      </div>


      <!-- Modal -->
      <div class="modal fade" id="modalModelo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="myModalLabel">Carga de Modelo</h4>
        </div>
        <div class="modal-body">
            <input id="fileInput" name="modelo" class="input-file" type="file">
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" onclick="form_cargar_modelo()">Cargar</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
        </div>
        </div>
      </div>
      </div>
      
      <!-- Modal Configuracion -->
      <div class="modal fade" id="modalConfiguracion" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" onclick="cancelar_configuracion()"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="myModalLabel">Configuración</h4>
        </div>
        <div class="modal-body">
            
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" onclick="cancelar_configuracion()">Cancelar</button>
        </div>
        </div>
      </div>
      </div>
      
      <div class="jsEstilo">
        <!-- Servicios UI - Script-->
        <?php echo Tags::javaScript();?>   
      </div>  
      <div class="jsBuilder">
        <script src="<?php echo base()?>resources/js/jquery-ui.min.js"></script>
        <script src="<?php echo base()?>resources/js/funciones.js"></script>
        <script src="<?php echo base()?>resources/js/form_config.js"></script>
        <script id="events">
            $('body').on('click', 'button.delete', function() {eliminar($(this).parent());});
            $('body').on('click', 'button.duplicate', function() {duplicarElemento($(this).parent())});
            $('body').on('click', 'button.minimize', function() {minimizar($(this))});
        </script>
      </div>
  </body>
</html>