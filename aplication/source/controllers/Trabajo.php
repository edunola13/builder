<?php
/**
 * Description of Trabajo
 *
 * @author Usuario_2
 */
class Trabajo extends En_Controller{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function doGet(){
        if(isset($_SESSION['trabajo']) && $_SESSION['trabajo'] != ''){
            echo $_SESSION['trabajo'];
        }
    }
    
    public function doPost(){
        $id= session_id();
        session_set_cookie_params(3600*24);
        setcookie('PHPSESSID', $id, time()+3600*24, '/');
        $_SESSION['trabajo']= $_POST['trabajo'];
    }
}

?>
