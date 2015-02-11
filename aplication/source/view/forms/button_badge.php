<?php Tags::form('', '', '', '', 'Button Badge'); ?>
    <?php Tags::input('Label', 'label','label', 'text', 'Label del Boton', $this->label);?>
    <?php Tags::input('Badge', 'badge','badge', 'text', 'Badge', $this->badge);?>
    <?php Tags::select('Size', 'size','size', $this->size); ?>
        <?php Tags::select_option('Chico', 'sm');?>
        <?php Tags::select_option('Medio', 'md');?>
        <?php Tags::select_option('Grande', 'lg');?>
    <?php Tags::end_select(); ?>

    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "buttonBadge_config('" . $this->id . "')", 'default');?>
<?php Tags::end_form(); ?>