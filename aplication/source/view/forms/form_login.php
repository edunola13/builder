<?php Tags::form('','', '', '', 'Formulario'); ?>
    <?php Tags::input('Title', 'title','title', 'text', 'Title del Form', $this->title);?>    
    <?php Tags::input('Placeholder User', 'placeholderUser','placeholderUser', 'text', 'Placeholder del Input User', $this->placeholderUser);?>
    <?php Tags::input('Placeholder Pass', 'placeholderPass','placeholderPass', 'text', 'Placeholder del Input Pass', $this->placeholderPass);?>
    <?php Tags::input('Label Check', 'labelCheck','labelCheck', 'text', 'Label del CheckBox', $this->labelCheck);?>
    <?php Tags::input('Label Button', 'labelButton','labelButton', 'text', 'Label del Button', $this->labelButton);?>

    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "login_config('" . $this->id . "')", 'default');?>
<?php Tags::end_form(); ?>
