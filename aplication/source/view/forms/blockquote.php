<?php Tags::form('','', '', '', 'Blockquote'); ?>  
    <?php Tags::input('Texto', 'texto','texto', 'text', 'Texto', $this->texto);?>
    <?php Tags::input('Fuente', 'fuente','fuente', 'text', 'Fuente del Texto', $this->fuente);?>

    
    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "blockquote_config('" . $this->id . "')", 'default');?>
<?php Tags::end_form(); ?>