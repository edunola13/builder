<?php

/**
 * Filtro que analiza la autorizacion de los usuarios
 *
 * @author Enola
 */
class Seguridad extends Filtro{
    
    /**
     * Constructor
     */
    public function __construct() {
        parent::__construct();
    }
    
    /**
     * Funcion que realiza el filtro correspondiente
     */
    public function filtrar(){
        //Leo el archivo de configuracion de seguridad
        $json_segurirad= file_get_contents(PATHAPP . CONFIGURACION . "seguridad.json");
        //Para el archivo json a un arreglo
        $seguridad= json_decode($json_segurirad, TRUE);

        if($this->sesion->existe("usuario_logueado")){
            //Si existe le asigno el tipo correspondiente
            $usuario_logueado= $this->sesion->get("usuario_logueado");
        }
        else{
            //Si no existe le asigno el nombre Default
            $usuario_logueado= 'default';
        }
        
        //Compruebo que exista la configuracion para el tipo de usuario logueado
        if(isset($seguridad[$usuario_logueado])){
            //Seteo la configuracion del usuario correpondiente
            $config_seguridad= $seguridad[$usuario_logueado];
            //Seteo los permisos del usuario
            $permisos= $config_seguridad['permisos'];
            $mapea= FALSE;
            //Recorro sus permisos y veo si alguno coincice
            foreach ($permisos as $permiso) {
                if(mapea_url_actual($permiso)){
                    //Cuando alguno coincide salgo del for
                    $mapea= TRUE;
                    break;
                }
            }


            if($mapea){
                //Si hubo mapeo, recorro las url denegadas para el usuario
                $denegados= $config_seguridad['denegar'];
                foreach ($denegados as $denegado) {
                    if(mapea_url_actual($denegado)){
                        //Si la url es denegada salgo del for
                        $mapea= FALSE;
                        break;
                    }
                }
            }


            if(! $mapea){
                //Si no tiene permiso es redireccionado
                redireccionar($config_seguridad['error']);
            }
        }
        else{
            //Si no existe la configuracion aviso del error
            echo "No existe definicion de seguridad para $usuario_logueado";
            $sesion= new Sesion();
            $sesion->borrar_sesion();
            exit();
        }
    }
}

?>