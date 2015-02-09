<?php Tags::form('','', '', '', 'Input'); ?>
    <?php Tags::input('Id', 'id','id', 'text', 'Id del TextArea', $this->idVal);?>    
    <?php Tags::input('Name', 'name','name', 'text', 'Name del TextArea', $this->name);?>
    <?php Tags::input('Rows', 'rows','rows', 'int', 'Rows del TextArea', $this->rows);?>
    <?php Tags::input('Label', 'label','label', 'text', 'Label del TextArea', $this->label);?>
    <?php Tags::input('Placeholder', 'placeholder','placeholder', 'text', 'Placeholder del TextArea', $this->placeholder);?>
    <?php Tags::select('Size', 'size','size', $this->size); ?>
        <?php Tags::select_option('Chico', 'sm');?>
        <?php Tags::select_option('Medio', 'md');?>
        <?php Tags::select_option('Grande', 'lg');?>
    <?php Tags::end_select(); ?>

    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "textArea_config('" . $this->id . "')", 'default');?>

<?php Tags::end_form(); ?>