<?php Tags::form('','', '', '', 'Simple Header'); ?>  
    <?php Tags::input('Primario', 'primario','primario', 'text', 'Primario', $this->primario);?>
    <?php Tags::input('Secundario', 'secundario','secundario', 'text', 'Secundario', $this->secundario);?>

    
    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "simpleHeader_config('" . $this->id . "')", 'default');?>
<?php Tags::end_form(); ?>