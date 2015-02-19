<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Builder HTML</title>     
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <?php Tags::theme($this->theme);?>
  </script>
  </head>
  <body>
      <link class="estiloBuilder" href="<?php echo base()?>resources/css/estilo.css" rel="stylesheet">
      <?php Tags::navigation_bar("Builder", base(), FALSE, 'navbar-fixed-top')?>
        <?php Tags::nav_bar_left();?>
            <?php Tags::nav_item_drop_down("Grids");?>
                <?php Tags::menu_item("item_onclick", "Grid 12", "load_row(12)"); ?>                
                <?php Tags::menu_item("item_onclick", "Grid 6-6", "load_row(6,6)"); ?>
                <?php Tags::menu_item("item_onclick", "Grid 4-8", "load_row(4,8)"); ?>
                <?php Tags::menu_item("item_onclick", "Grid 8-4", "load_row(8,4)"); ?>
                <?php Tags::menu_item("item_onclick", "Grid 5-7", "load_row(5,7)"); ?>
                <?php Tags::menu_item("item_onclick", "Grid 7-5", "load_row(7,5)"); ?>
                <?php Tags::menu_item("item_onclick", "Grid 3-9", "load_row(3,9)"); ?>
                <?php Tags::menu_item("item_onclick", "Grid 9-3", "load_row(9,3)"); ?>
                <?php Tags::menu_item("item_onclick", "Grid 2-10", "load_row(2,10)"); ?>
                <?php Tags::menu_item("item_onclick", "Grid 10-2", "load_row(10,2)"); ?>
                <?php Tags::menu_item("item_onclick", "Grid 4-4-4", "load_row(4,4,4)"); ?>
                <?php Tags::menu_item("item_onclick", "Grid 3-6-3", "load_row(3,6,3)"); ?>
                <?php Tags::menu_item("item_onclick", "Grid 2-8-2", "load_row(2,8,2)"); ?>
                <?php Tags::menu_item("item_onclick", "Grid 3-3-3-3", "load_row(3,3,3,3)"); ?>
                <?php Tags::menu_item("item_onclick", "Grid 2-4-4-2", "load_row(2,4,4,2)"); ?>
            <?php Tags::end_nav_item_drop_down();?>
            <?php Tags::nav_item_drop_down("Composed");?>
                <?php Tags::menu_item("item_onclick", "Form", "formulario_configuracion('form')"); ?>
                <?php Tags::menu_item("item_onclick", "Media Object", "mediaObject_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Panel", "panel_config()"); ?>                
                <?php Tags::menu_item("item_onclick", "Table", "table_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Simple Footer", "simple_footer_config()"); ?>
                <?php Tags::menu_item("item_onclick", "Fixed Footer", "fixed_footer_config()"); ?>
            <?php Tags::end_nav_item_drop_down(); ?>
            <?php Tags::nav_item_drop_down("Navigation");?>
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
            <?php Tags::nav_item_drop_down("Static");?>
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
            <?php Tags::nav_item_drop_down("Themes");?>
                <?php Tags::menu_item("item_onclick", "Base", "theme('base')"); ?>
                <?php Tags::menu_item("item_onclick", "Cerulean", "theme('cerulean')"); ?>
                <?php Tags::menu_item("item_onclick", "Cosmo", "theme('cosmo')"); ?>
                <?php Tags::menu_item("item_onclick", "Journal", "theme('journal')"); ?>
                <?php Tags::menu_item("item_onclick", "Paper", "theme('paper')"); ?>
                <?php Tags::menu_item("item_onclick", "Readable", "theme('readable')"); ?>                
                <?php Tags::menu_item("item_onclick", "Simplex", "theme('simplex')"); ?>                
                <?php Tags::menu_item("item_onclick", "Spacelab", "theme('spacelab')"); ?>                
                <?php Tags::menu_item("item_onclick", "United", "theme('united')"); ?>
                <?php Tags::menu_item("item_onclick", "Yeti", "theme('yeti')"); ?>
            <?php Tags::end_nav_item_drop_down();?>
        <?php Tags::end_nav_bar_left();?>
      
        <?php Tags::nav_bar_right();?>
            <?php Tags::nav_item("Builded", "javascript:builder();", "active")?>
            <?php Tags::nav_item("Preview", "javascript:vista_previa();");?>
            <?php Tags::nav_item_drop_down("More Options"); ?>
                <?php Tags::menu_item("item", "Save in Server", "javascript:guardar_trabajo();"); ?>
                <?php Tags::menu_item("item", "Download HTML", "javascript:descargar_html();"); ?>
                <?php Tags::menu_item("item", "Download Model", "javascript:descargar_modelo();"); ?>
                <?php Tags::menu_item("item", "Load Modelo", "javascript:cargar_modelo();"); ?>
                <?php Tags::menu_item("item", "Clean", "javascript:clear();"); ?>
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


      <!-- Mensajes -->
      <div id="mensaje" title="Information Message"></div>
      
      <!-- Modal -->
      <div class="modal fade" id="modalModelo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="myModalLabel">Load Model</h4>
        </div>
        <div class="modal-body">
            <input id="fileInput" name="modelo" class="input-file" type="file">
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" onclick="form_cargar_modelo()">Load</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
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
            <h4 class="modal-title" id="myModalLabel">Configuration</h4>
        </div>
        <div class="modal-body">
            
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" onclick="cancelar_configuracion()">Cancel</button>
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
                    if(confirm('the server has kept its progress. Want to continue with them?')){
                        cargar_trabajo();
                    }
                })
            <?php }?>
        </script>
      </div>
  </body>
</html>