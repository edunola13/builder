<?php Tags::formulario('', '', '', 'Formulario'); ?>
    <?php Tags::input('Id', 'id', 'text', 'Id del Form', $this->idVal);?>    
    <?php Tags::input('Name', 'name', 'text', 'Name del Input', $this->name);?>
    <?php Tags::input('Label', 'label', 'text', 'Label del Input', $this->label);?>
    <?php Tags::boolean_checkbox('Multiple', 'multiple', $this->multiple); ?>

    <?php Tags::button('button', 'Guardar Configuración', 'default', 'conf-form', "select_config('" . $this->id . "')"); ?>
<?php Tags::end_formulario(); ?>
