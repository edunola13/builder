<?php

/**
 * Description of Index
 *
 * @author Enola
 */

class Index extends En_Controller{
    protected $theme= 'base';
    
    public function __construct() {
        parent::__construct();
    }
    
    public function doGet(){
        if(isset($this->uri_params['theme'])){
            $this->theme= $this->uri_params['theme'];
        }
        $this->load_view("index");
    }
}
?>