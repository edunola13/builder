<?php Tags::form('', '', '', '', 'Image'); ?>
    <?php Tags::input('Source Image', 'src','src', 'text', 'Source Image', $this->src);?>

    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "image_config('" . $this->id . "')", 'default');?>
<?php Tags::end_form(); ?>