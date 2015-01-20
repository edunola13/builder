<?php Tags::formulario('', '', '', 'Formulario'); ?>
    <?php Tags::input('Id', 'id', 'text');?>    
    <?php Tags::input('Method', 'method', 'text');?>
    <?php Tags::input('Action', 'action', 'text');?>
    <?php Tags::boolean_checkbox('Legend', 'legend', '1'); ?>
    <?php Tags::input('Label', 'label', 'text');?>

    <?php Tags::button('button', 'Guardar Configuración', 'default', 'conf-form', "form_config('" . $this->id . "')"); ?>
<?php Tags::end_formulario(); ?>
