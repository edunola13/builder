<?php Tags::formulario('', '', '', 'Formulario'); ?>
    <?php Tags::input('Id', 'id', 'text', 'Id del Form', $this->idVal);?>    
    <?php Tags::input('Method', 'method', 'text', 'Method HTTP', $this->method);?>
    <?php Tags::input('Action', 'action', 'text', 'Action del Form', $this->action);?>
    <?php Tags::boolean_checkbox('Legend', 'legend', $this->legend); ?>

    <?php Tags::input('Label', 'label', 'text', 'Legend del Form', $this->label);?>

    <?php Tags::button('button', 'Guardar Configuración', 'default', 'conf-form', "form_config('" . $this->id . "')"); ?>
<?php Tags::end_formulario(); ?>
