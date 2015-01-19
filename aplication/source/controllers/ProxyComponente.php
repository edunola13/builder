<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ProxyComponente
 *
 * @author Usuario_2
 */
class ProxyComponente extends Controlador{
    
    /**
     * Funciona de proxy entre el java script y el servicio de UI 
     */
    public function doPost(){
        $url= "http://edunola.com.ar/serviciosui/componente";
        //$url= "http://localhost/serviciosui/componente";
        
        //Accedo al cuerpo de la peticion para poder leer el JSON
        $json = @file_get_contents('php://input');
        
        //Configuracion general de conexion
        $options = array(
		CURLOPT_RETURNTRANSFER => true, // return web page
		//CURLOPT_FOLLOWLOCATION => true, // follow redirects
		CURLOPT_USERAGENT => "clienteUIphp", // who am i
		CURLOPT_AUTOREFERER => true, // set referer on redirect
		CURLOPT_CONNECTTIMEOUT => 120, // timeout on connect
		CURLOPT_TIMEOUT => 120, // timeout on response
		CURLOPT_MAXREDIRS => 10, // stop after 10 redirects
	);
        
        //Inicia conexion
        $curl_conexion= curl_init($url);
        
        curl_setopt($curl_conexion, CURLOPT_HTTPHEADER, array(                                                                          
            'Content-Type: application/json',                                                                                
            'Content-Length: ' . strlen($json))                                                                     
        );    
        curl_setopt($curl_conexion, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl_conexion, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($curl_conexion, CURLOPT_VERBOSE, TRUE);
        curl_setopt($curl_conexion, CURLOPT_CUSTOMREQUEST, "POST");   
        curl_setopt($curl_conexion, CURLOPT_POST, 1);
        curl_setopt($curl_conexion, CURLOPT_POSTFIELDS, $json);                                                                  
        curl_setopt_array( $curl_conexion, $options );

        
        //Se ejecuta la consulta
        $result = curl_exec($curl_conexion);
        $header = curl_getinfo($curl_conexion);
        
        //Cierra la conexion
        curl_close($curl_conexion);
        
        header("Access-Control-Allow-Origin: *");
        echo $result;
    }

}

?>
