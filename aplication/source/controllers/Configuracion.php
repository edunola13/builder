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
    private function form_login(){
        $this->id= $this->request->param_get('componentId');
        $this->title= $this->request->param_get('title');
        $this->placeholderUser= $this->request->param_get('placeholderUser');
        $this->placeholderPass= $this->request->param_get('placeholderPass');
        $this->labelCheck= $this->request->param_get('labelCheck');
        $this->labelButton= $this->request->param_get('labelButton');
        $this->load_view('forms/form_login');
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
    public function form_textarea(){
        $this->id= $this->request->param_get('componentId');
        $this->idVal= $this->request->param_get('id');
        $this->name= $this->request->param_get('name');
        $this->rows= $this->request->param_get('rows');
        $this->label= $this->request->param_get('label');
        $this->placeholder= $this->request->param_get('placeholder');        
        $this->load_view('forms/textarea');
    }    
    public function form_select(){
        $this->id= $this->request->param_get('componentId');
        $this->idVal= $this->request->param_get('id');
        $this->name= $this->request->param_get('name');
        $this->label= $this->request->param_get('label');
        $this->multiple= $this->request->param_get('multiple');        
        $this->load_view('forms/select');
    }    
    public function form_checkbox(){
        $this->id= $this->request->param_get('componentId');
        $this->idVal= $this->request->param_get('id');
        $this->name= $this->request->param_get('name');
        $this->label= $this->request->param_get('label');
        $this->inline= $this->request->param_get('inline');        
        $this->load_view('forms/checkbox');
    }    
    public function form_radio(){
        $this->id= $this->request->param_get('componentId');
        $this->idVal= $this->request->param_get('id');
        $this->name= $this->request->param_get('name');
        $this->label= $this->request->param_get('label');
        $this->inline= $this->request->param_get('inline');        
        $this->load_view('forms/radio');
    }  
}

?>
