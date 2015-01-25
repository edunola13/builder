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
    
    private function form(){
        $this->id= $this->request->param_get('componentId');
        $this->idVal= $this->request->param_get('id');
        $this->method= $this->request->param_get('method');
        $this->action= $this->request->param_get('action');
        $this->legend= $this->request->param_get('legend');
        $this->label= $this->request->param_get('label');
        $this->load_view('forms/form');
    }
    
    private function form_input(){
        $this->id= $this->request->param_get('componentId');
        $this->idVal= $this->request->param_get('id');
        $this->name= $this->request->param_get('name');
        $this->type= $this->request->param_get('type');
        $this->label= $this->request->param_get('label');
        $this->placeholder= $this->request->param_get('placeholder');        
        $this->load_view('forms/input');
    }
}

?>
