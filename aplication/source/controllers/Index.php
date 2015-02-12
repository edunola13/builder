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
        //Cookie por un dia
        $id= session_id();
        setcookie('PHPSESSID', $id, time()+3600*24*365, '/');
        session_start();
    }
    
    public function doGet(){
        if(isset($this->uri_params['theme'])){
            $this->theme= $this->uri_params['theme'];
        }
        $trabajando= FALSE;
        if(isset($_SESSION['trabajo']) && $_SESSION['trabajo'] != '')$trabajando=TRUE;
        $this->load_view("index", $trabajando);
    }
}
?>