<?php
/**
 * Description of Configuracion
 *
 * @author Usuario_2
 */
class Configuracion extends En_Controller{
    public function __construct() {
        parent::__construct();
    }
    
    public function doGet(){
        $fun= $this->request->param_get('form');
        $this->$fun();
    }
    //ver de llamar directamente a la vista y no a una funcion
    private function form(){
        $this->id= $this->request->param_get('componentId');
        $this->load_view('forms/form');
    }
}

?>
