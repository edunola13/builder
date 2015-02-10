<?php Tags::form('', '', '', '', 'Well'); ?>
    <?php Tags::input('Contenido', 'contenido','contenido', 'text', 'Contenido', $this->contenido);?>

    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "well_config('" . $this->id . "')", 'default');?>
<?php Tags::end_form(); ?>