<?php
/**
 * Description of Trabajo
 *
 * @author Usuario_2
 */
class Theme extends En_Controller{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function doGet(){        
        Tags::theme($this->uri_params['theme']);
    }
}

?>
