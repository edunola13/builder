<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Builder HTML</title>

    <!-- Servicios UI - CSS-->
    <?php Tags::theme($this->theme);?>
     
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
      <?php Tags::navigation_bar("Builder", base(), 'navbar-fixed-top')?>
        <?php Tags::nav_bar_left();?>
            <?php Tags::nav_item_drop_down("Grillas");?>
                <?php Tags::menu_item("item_onclick", "Grilla 12", "load_row(12)"); ?>                
                <?php Tags::menu_item("item_onclick", "Grilla 6-6", "load_row(6,6)"); ?>
                <?php Tags::menu_item("item_onclick", "Grilla 4-8", "load_row(4,8)"); ?>
                <?php Tags::menu_item("item_onclick", "Grilla 8-4", "load_row(8,4)"); ?>
                <?php Tags::menu_item("item_onclick", "Grilla 5-7", "load_row(5,7)"); ?>
                <?php Tags::menu_item("item_onclick", "Grilla 7-5", "load_row(7,5)"); ?>
                <?php Tags::menu_item("item_onclick", "Grilla 3-9", "load_row(3,9)"); ?>
                <?php Tags::menu_item("item_onclick", "Grilla 9-3", "load_row(9,3)"); ?>
                <?php Tags::menu_item("item_onclick", "Grilla 2-10", "load_row(2,10)"); ?>
                <?php Tags::menu_item("item_onclick", "Grilla 10-2", "load_row(10,2)"); ?>
                <?php Tags::menu_item("item_onclick", "Grilla 4-4-4", "load_row(4,4,4)"); ?>
                <?php Tags::menu_item("item_onclick", "Grilla 3-6-3", "load_row(3,6,3)"); ?>
                <?php Tags::menu_item("item_onclick", "Grilla 2-8-2", "load_row(2,8,2)"); ?>
                <?php Tags::menu_item("item_onclick", "Grilla 3-3-3-3", "load_row(3,3,3,3)"); ?>
                <?php Tags::menu_item("item_onclick", "Grilla 2-4-4-2", "load_row(2,4,4,2)"); ?>
            <?php Tags::end_nav_item_drop_down();?>
            <?php Tags::nav_item_drop_down("Compuestos");?>
                <?php Tags::menu_item("item_onclick", "Form", "formulario_configuracion('form')"); ?>
                <?php Tags::menu_item("item_onclick", "Media Object", "mediaObject_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Panel", "panel_config()"); ?>                
                <?php Tags::menu_item("item_onclick", "Table", "table_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Simple Footer", "simple_footer_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Fixed Footer", "fixed_footer_config()"); ?>
            <?php Tags::end_nav_item_drop_down(); ?>
            <?php Tags::nav_item_drop_down("Navegacion");?>
                <?php Tags::menu_item("item_onclick", "Drop Down Menu", "drop_down_menu_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Navigation Menu", "navigation_menu_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Navigation Bar", "navigation_bar_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Breadcrumb", "breadcrumb_config()"); ?>
                <?php Tags::menu_item('divider'); ?>
                <?php Tags::menu_item("item_onclick", "List", "list_config()"); ?>
                <?php Tags::menu_item("item_onclick", "List A", "listA_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Button", "button_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Badge", "badge_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Button Badge", "buttonBadge_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Button Group", "button_group_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Button Toolbar", "button_toolbar_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Simple Paginator", "simplePaginator_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Paginator", "paginator_config()"); ?>               
            <?php Tags::end_nav_item_drop_down();?>
            <?php Tags::nav_item_drop_down("Estaticos");?>
                <?php Tags::menu_item("item_onclick", "Simple Header", "simpleHeader_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Title", "title_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Address", "address_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Paragraph", "paragraph_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Well", "well_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Alert Message", "alertMessage_config()"); ?>                
                <?php Tags::menu_item("item_onclick", "Blockquote", "blockquote_config()"); ?>                
                <?php Tags::menu_item("item_onclick", "Progress Bar", "progressBar_config()"); ?>                
                <?php Tags::menu_item("item_onclick", "Iframe", "iframe_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Image", "image_config()"); ?>                
                <?php Tags::menu_item("item_onclick", "Form Search", "searchForm_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Login", "login_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Jumbotron", "jumbotron_config()"); ?> 
                <?php Tags::menu_item("item_onclick", "Thumbnail", "thumbnail_config()"); ?>
            <?php Tags::end_nav_item_drop_down();?>
        <?php Tags::end_nav_bar_left();?>
      
        <?php Tags::nav_bar_right();?>
            <?php Tags::nav_item("Construir", "javascript:builder();", "active")?>
            <?php Tags::nav_item("Vista Previa", "javascript:vista_previa();");?>
            <?php Tags::nav_item_drop_down("Mas Opciones"); ?>
                <?php Tags::menu_item("item", "Descargar HTML", "javascript:descargar_html();"); ?>
                <?php Tags::menu_item("item", "Descargar Modelo", "javascript:descargar_modelo();"); ?>
                <?php Tags::menu_item("item", "Cargar Modelo", "javascript:cargar_modelo();"); ?>
                <?php Tags::menu_item("item", "Limpiar", "javascript:clear();"); ?>
            <?php Tags::end_nav_item_drop_down(); ?>
        <?php Tags::end_nav_bar_right();?>
      <?php Tags::end_navigation_bar();?>

      <div class="container sortable sort-selected" id="builder">
        <div class="com-builder" id="IdComponent1">            
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
            $('body').on('mouseup', '.sortable', function() {
                actualizarSortable($(this));
                return false;
            });
            <?php if($params){?>
                $(document).ready(function(){
                    if(confirm('El servidor ha guardado sus avances. Desea continuar con ellos?')){
                        cargar_trabajo();
                    }
                })
            <?php }?>
        </script>
      </div>
  </body>
</html>