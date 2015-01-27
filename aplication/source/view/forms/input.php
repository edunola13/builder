<?php Tags::formulario('', '', '', 'Input'); ?>
    <?php Tags::input('Id', 'id', 'text', 'Id del Input', $this->idVal);?>    
    <?php Tags::input('Name', 'name', 'text', 'Name del Input', $this->name);?>
    <?php Tags::input('Type', 'type', 'text', 'Type del Input', $this->type);?>
    <?php Tags::input('Label', 'label', 'text', 'Label del Input', $this->label);?>
    <?php Tags::input('Placeholder', 'placeholder', 'text', 'Placeholder del Input', $this->placeholder);?>

    <?php Tags::button('button', 'Guardar Configuración', 'default', 'conf-form', "input_config('" . $this->id . "')"); ?>
<?php Tags::end_formulario(); ?>