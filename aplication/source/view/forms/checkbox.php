<?php Tags::form('', '', '', '', 'Formulario'); ?>
    <?php Tags::input('Id', 'id','id', 'text', 'Id del Form', $this->idVal);?>    
    <?php Tags::input('Name', 'name','name', 'text', 'Name del Input', $this->name);?>
    <?php Tags::input('Label', 'label','label', 'text', 'Label del Input', $this->label);?>
    <?php Tags::boolean_checkbox('InLine', 'inline','inline', $this->inline); ?>
    <?php Tags::select('Size', 'size','size', $this->size); ?>
        <?php Tags::select_option('Chico', 'sm');?>
        <?php Tags::select_option('Medio', 'md');?>
        <?php Tags::select_option('Grande', 'lg');?>
    <?php Tags::end_select(); ?>

    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "checkbox_config('" . $this->id . "')", 'default');?>
<?php Tags::end_form(); ?>
