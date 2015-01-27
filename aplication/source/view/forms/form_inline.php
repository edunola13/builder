<?php Tags::formulario('', '', '', 'Formulario'); ?>
    <?php Tags::input('Id', 'id', 'text', 'Id del Form', $this->idVal);?>    
    <?php Tags::input('Method', 'method', 'text', 'Method HTTP', $this->method);?>
    <?php Tags::input('Action', 'action', 'text', 'Action del Form', $this->action);?>

    <?php Tags::button('button', 'Guardar Configuración', 'default', 'conf-form', "form_inline_config('" . $this->id . "')"); ?>
<?php Tags::end_formulario(); ?>
