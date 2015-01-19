<?php Tags::formulario('', '', '', 'Formulario'); ?>
    <?php Tags::input('Method', 'method', 'text');?>
    <?php Tags::input('Action', 'action', 'text');?>
    <?php Tags::input('Label', 'label', 'text');?>

    <?php Tags::button('button', 'Guardar Configuración', 'default', 'conf-form', 'form_config()'); ?>
<?php Tags::end_formulario(); ?>
