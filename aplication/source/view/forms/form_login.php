<?php Tags::formulario('', '', '', 'Formulario'); ?>
    <?php Tags::input('Title', 'title', 'text', 'Title del Form', $this->title);?>    
    <?php Tags::input('Placeholder User', 'placeholderUser', 'text', 'Placeholder del Input User', $this->placeholderUser);?>
    <?php Tags::input('Placeholder Pass', 'placeholderPass', 'text', 'Placeholder del Input Pass', $this->placeholderPass);?>
    <?php Tags::input('Label Check', 'labelCheck', 'text', 'Label del CheckBox', $this->labelCheck);?>
    <?php Tags::input('Label Button', 'labelButton', 'text', 'Label del Button', $this->labelButton);?>

    <?php Tags::button('button', 'Guardar Configuración', 'default', 'conf-form', "login_config('" . $this->id . "')"); ?>
<?php Tags::end_formulario(); ?>
