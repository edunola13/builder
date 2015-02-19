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
        $_SESSION['trabajo']= $_POST['trabajo'];
    }
}

?>
