<?php Tags::form('', '', '', '', 'Thumbnail'); ?>
    <?php Tags::input('Titulo', 'titulo','titulo', 'text', 'Titulo', $this->titulo);?>    
    <?php Tags::input('Contenido', 'contenido','contenido', 'text', 'Contenido', $this->contenido);?>
    <?php Tags::input('Label', 'label','label', 'text', 'Label del Boton', $this->label);?>
    <?php Tags::input('Source Image', 'src','src', 'text', 'src', $this->src);?>
    <?php Tags::select('Size', 'size','size', $this->size); ?>
        <?php Tags::select_option('Chico', 'sm');?>
        <?php Tags::select_option('Medio', 'md');?>
        <?php Tags::select_option('Grande', 'lg');?>
    <?php Tags::end_select(); ?>
    <?php Tags::select('Style', 'style','style', $this->style); ?>
        <?php Tags::select_option('Default', 'default');?>
        <?php Tags::select_option('Primary', 'primary');?>
        <?php Tags::select_option('Success', 'success');?>
        <?php Tags::select_option('Info', 'info');?>
        <?php Tags::select_option('Warning', 'warning');?>
        <?php Tags::select_option('Danger', 'danger');?>
    <?php Tags::end_select(); ?>

    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "thumbnail_config('" . $this->id . "')", 'default');?>
<?php Tags::end_form(); ?>