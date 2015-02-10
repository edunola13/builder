<?php Tags::form('', '', '', '', 'Title'); ?>
    <?php Tags::input('Titulo', 'titulo','titulo', 'text', 'Titulo', $this->titulo);?>

    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "title_config('" . $this->id . "')", 'default');?>
<?php Tags::end_form(); ?>