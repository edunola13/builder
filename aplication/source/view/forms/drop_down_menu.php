<?php Tags::form('', '', '', '', 'Formulario'); ?>
    <?php Tags::select('Size', 'size','size', $this->size); ?>
        <?php Tags::select_option('Chico', 'sm');?>
        <?php Tags::select_option('Medio', 'md');?>
        <?php Tags::select_option('Grande', 'lg');?>
    <?php Tags::end_select(); ?>
    <?php Tags::select('Style', 'style','style', $this->style); ?>
        <?php Tags::select_option('Defualt', 'defualt');?>
        <?php Tags::select_option('Primary', 'primary');?>
        <?php Tags::select_option('Success', 'success');?>
        <?php Tags::select_option('Info', 'info');?>
        <?php Tags::select_option('Warning', 'warning');?>
        <?php Tags::select_option('Danger', 'danger');?>
    <?php Tags::end_select(); ?>

    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "drop_down_menu_config('" . $this->id . "')", 'default');?>
<?php Tags::end_form(); ?>