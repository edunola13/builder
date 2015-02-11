<?php Tags::form('', '', '', '', 'Button'); ?>
    <?php Tags::input('Label', 'label','label', 'text', 'Label del Boton', $this->label);?>
    <?php Tags::select('Size', 'size','size', $this->size); ?>
        <?php Tags::select_option('Chico', 'sm');?>
        <?php Tags::select_option('Medio', 'md');?>
        <?php Tags::select_option('Grande', 'lg');?>
    <?php Tags::end_select(); ?>

    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "button_config('" . $this->id . "')", 'default');?>
<?php Tags::end_form(); ?>