<?php Tags::formulario('', '', '', 'Input'); ?>
    <?php Tags::input('Id', 'id', 'text', 'Id del TextArea', $this->idVal);?>    
    <?php Tags::input('Name', 'name', 'text', 'Name del TextArea', $this->name);?>
    <?php Tags::input('Rows', 'rows', 'int', 'Rows del TextArea', $this->rows);?>
    <?php Tags::input('Label', 'label', 'text', 'Label del TextArea', $this->label);?>
    <?php Tags::input('Placeholder', 'placeholder', 'text', 'Placeholder del TextArea', $this->placeholder);?>

    <?php Tags::button('button', 'Guardar Configuración', 'default', 'conf-form', "textArea_config('" . $this->id . "')"); ?>
<?php Tags::end_formulario(); ?>