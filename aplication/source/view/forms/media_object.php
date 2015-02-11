<?php Tags::form('', '', '', '', 'Media Object'); ?>
    <?php Tags::input('Source Imagen', 'src','src', 'text', 'Source Imagen', $this->src);?>
    <?php Tags::input('Titulo', 'titulo','titulo', 'text', 'Titulo', $this->titulo);?>
    <?php Tags::input('Contenido', 'contenido','contenido', 'text', 'Contenido', $this->contenido);?>

    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "mediaObject_config('" . $this->id . "')", 'default');?>
<?php Tags::end_form(); ?>