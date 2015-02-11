<?php Tags::form('', '', '', '', 'Panel'); ?>
    <?php Tags::input('Titulo', 'titulo','titulo', 'text', 'Titulo', $this->titulo, 'Dejar en blanco si no se desea una cabecera');?>
    <?php Tags::input('Pie', 'pie','pie', 'text', 'Pie', $this->pie, 'Dejar en blanco si no se desea una pie');?>

    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "panel_config('" . $this->id . "')", 'default');?>
<?php Tags::end_form(); ?>