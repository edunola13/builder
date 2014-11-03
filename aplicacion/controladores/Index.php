<?php

/**
 * Description of Index
 *
 * @author Enola
 */

class Index extends Controlador{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function doGet(){
        require PATHAPP . "vista/index.php";
    }
    
}

?>
