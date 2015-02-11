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
        $this->size= $this->request->param_get('size');  
        $this->load_view('forms/input');
    }    
    public function form_textarea(){
        $this->id= $this->request->param_get('componentId');
        $this->idVal= $this->request->param_get('id');
        $this->name= $this->request->param_get('name');
        $this->rows= $this->request->param_get('rows');
        $this->label= $this->request->param_get('label');
        $this->placeholder= $this->request->param_get('placeholder');  
        $this->size= $this->request->param_get('size'); 
        $this->load_view('forms/textarea');
    }    
    public function form_select(){
        $this->id= $this->request->param_get('componentId');
        $this->idVal= $this->request->param_get('id');
        $this->name= $this->request->param_get('name');
        $this->label= $this->request->param_get('label');
        $this->multiple= $this->request->param_get('multiple');
        $this->size= $this->request->param_get('size'); 
        $this->load_view('forms/select');
    }    
    public function form_checkbox(){
        $this->id= $this->request->param_get('componentId');
        $this->idVal= $this->request->param_get('id');
        $this->name= $this->request->param_get('name');
        $this->label= $this->request->param_get('label');
        $this->inline= $this->request->param_get('inline');
        $this->size= $this->request->param_get('size'); 
        $this->load_view('forms/checkbox');
    }    
    public function form_radio(){
        $this->id= $this->request->param_get('componentId');
        $this->idVal= $this->request->param_get('id');
        $this->name= $this->request->param_get('name');
        $this->label= $this->request->param_get('label');
        $this->inline= $this->request->param_get('inline');
        $this->size= $this->request->param_get('size'); 
        $this->load_view('forms/radio');
    }
    public function form_drop_down_menu(){
        $this->id= $this->request->param_get('componentId');
        $this->style= $this->request->param_get('style');
        $this->size= $this->request->param_get('size'); 
        $this->load_view('forms/drop_down_menu');
    }
    public function form_blockquote(){
        $this->id= $this->request->param_get('componentId');
        $this->texto= $this->request->param_get('texto');
        $this->fuente= $this->request->param_get('fuente'); 
        $this->load_view('forms/blockquote');
    }
    public function form_jumbotron(){
        $this->id= $this->request->param_get('componentId');
        $this->titulo= $this->request->param_get('titulo');
        $this->contenido= $this->request->param_get('contenido');
        $this->label= $this->request->param_get('label');
        $this->style= $this->request->param_get('style');
        $this->size= $this->request->param_get('size'); 
        $this->load_view('forms/jumbotron');
    }
    public function form_simpleHeader(){
        $this->id= $this->request->param_get('componentId');
        $this->primario= $this->request->param_get('primario');
        $this->secundario= $this->request->param_get('secundario'); 
        $this->load_view('forms/simple_header');
    }
    public function form_thumbnail(){
        $this->id= $this->request->param_get('componentId');
        $this->titulo= $this->request->param_get('titulo');
        $this->contenido= $this->request->param_get('contenido');
        $this->label= $this->request->param_get('label');
        $this->src= $this->request->param_get('src');
        $this->style= $this->request->param_get('style');
        $this->size= $this->request->param_get('size'); 
        $this->load_view('forms/thumbnail');
    }
    public function form_title(){
        $this->id= $this->request->param_get('componentId');
        $this->titulo= $this->request->param_get('titulo');
        $this->load_view('forms/title');
    }
    public function form_well(){
        $this->id= $this->request->param_get('componentId');
        $this->contenido= $this->request->param_get('contenido');
        $this->load_view('forms/well');
    }
    public function form_panel(){
        $this->id= $this->request->param_get('componentId');
        $this->titulo= $this->request->param_get('titulo');
        $this->pie= $this->request->param_get('pie');
        $this->load_view('forms/panel');
    }
    public function form_mediaObject(){
        $this->id= $this->request->param_get('componentId');
        $this->titulo= $this->request->param_get('titulo');
        $this->contenido= $this->request->param_get('contenido');
        $this->src= $this->request->param_get('src');
        $this->load_view('forms/media_object');
    }
    public function form_image(){
        $this->id= $this->request->param_get('componentId');
        $this->src= $this->request->param_get('src');
        $this->load_view('forms/image');
    }
    public function form_button(){
        $this->id= $this->request->param_get('componentId');
        $this->label= $this->request->param_get('label');
        $this->size= $this->request->param_get('size'); 
        $this->load_view('forms/button');
    }
    public function form_buttonBadge(){
        $this->id= $this->request->param_get('componentId');
        $this->label= $this->request->param_get('label');
        $this->badge= $this->request->param_get('badge');
        $this->size= $this->request->param_get('size'); 
        $this->load_view('forms/button_badge');
    }
    public function form_paragraph(){
        $this->id= $this->request->param_get('componentId');
        $this->texto= $this->request->param_get('texto');
        $this->type= $this->request->param_get('type'); 
        $this->load_view('forms/paragraph');
    }
}

?>
