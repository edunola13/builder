<?php Tags::form('', '', '', '', 'Formulario'); ?>
    <?php Tags::input('Id', 'id','id', 'text', 'Id del Form', $this->idVal);?>
    <?php Tags::select('Method', 'method','method', $this->method); ?>
        <?php Tags::select_option('GET', 'GET');?>
        <?php Tags::select_option('POST', 'POST');?>
    <?php Tags::end_select(); ?>
    <?php Tags::input('Action', 'action','action', 'text', 'Action del Form', $this->action);?>
    <?php Tags::boolean_checkbox('Legend', 'legend','legend', $this->legend); ?>

    <?php Tags::input('Label', 'label','label', 'text', 'Legend del Form', $this->label);?>

    <?php Tags::button('Guardar Configuración', 'conf-form', 'button', "form_config('" . $this->id . "')", 'default');?>
<?php Tags::end_form(); ?>
