<?php Tags::form('', '', '', '', 'Button'); ?>
    <?php Tags::textarea('Texto', 'texto','texto', 'text', 'Texto', $this->texto);?>
    <?php Tags::select('Tipo', 'type','type', $this->type); ?>
        <?php Tags::select_option('Texto', 'text');?>
        <?php Tags::select_option('Small', 'small');?>
        <?php Tags::select_option('Strong', 'strong');?>
        <?php Tags::select_option('Em', 'em');?>
    <?php Tags::end_select(); ?>

    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "paragraph_config('" . $this->id . "')", 'default');?>
<?php Tags::end_form(); ?>