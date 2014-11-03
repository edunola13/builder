<?php
/**
 * Description of ApiUi
 *
 * @author Usuario_2
 */

class ApiUi {
    private static $instancia;
    
    private function __construct() {
    }    
    public static function getInstance(){
        if(!self::$instancia instanceof self){
            self::$instancia = new self;
        }
        return self::$instancia;
    }    
    public function theme($nombre){
        if(! file_exists(PATH_THEME . $nombre . '.txt')){
            $theme= $this->conexionTheme($nombre); 
            $arch = fopen(PATH_THEME . $nombre . '.txt', 'x');
            fwrite($arch, $theme);
            fclose($arch); 
         }
         return $this->imprimirTheme($nombre);
    }     
    public function javaScript($nombre){
         if(! file_exists(PATH_JAVASCRIPT . $nombre . '.txt')){
            $javascript= $this->conexionJavaScript($nombre);
            $arch = fopen(PATH_JAVASCRIPT . $nombre . '.txt', 'x');
            fwrite($arch, $javascript);
            fclose($arch); 
         }
         return $this->imprimirJavaScript($nombre);
    }     
    private function imprimirTheme($nombre){
         return file_get_contents(PATH_THEME . $nombre . '.txt');
    }     
    private function imprimirJavaScript($nombre){
         return file_get_contents(PATH_JAVASCRIPT . $nombre . '.txt');
    }     
    private function conexionTheme($nombre){
        $url = 'http://www.edunola.com.ar/serviciosui/theme?nombre=' . $nombre;
        //$url= 'http://localhost/serviciosui/theme?nombre=' . $nombre;        
        return $this->conexionGet($url);
    }     
    private function conexionJavaScript($nombre){
        $url = 'http://www.edunola.com.ar/serviciosui/javascript?nombre=' . $nombre;
        //$url= 'http://localhost/serviciosui/javascript?nombre=' . $nombre;        
        return $this->conexionGet($url);
    }     
    public function componente($nombre, $valores = null){        
        if(! file_exists(PATH_COMPONENT . $nombre . '.txt')){
            $componente= $this->conexionComponente($nombre); 
            $arch = fopen(PATH_COMPONENT . $nombre . '.txt', 'x');
            fwrite($arch, $componente);
            fclose($arch);
        }
        //Consigo el componente
        $componente= file_get_contents(PATH_COMPONENT . $nombre . '.txt');        
        //Armo la estructura de IFss
        $bloques= array();
        $inicio= strpos($componente, "{%", 0);
        $fin= strpos($componente, "%}", 0);        
        while($inicio !== FALSE && $fin !== FALSE){
            if($this->tipoIf($inicio, $componente) == "if"){
                $res= $this->armarEstructura($inicio, $componente);                
                $bloques= array_merge($bloques, $res);                
                $cantRes= count($res);
                $finRes= $res[$cantRes - 1]["fin"];
                $inicio= strpos($componente, "{%", $finRes + 1);
                $fin= strpos($componente, "%}", $finRes + 1);
            }
            else{
                echo 'El primero debe ser un If';
                break;
            }
        }        
        //Armo el HTML en base a los resultados de los IFs
        if(count($bloques) > 1){
            $html= $this->htmlCorrecto($bloques, $componente, 0, $valores, TRUE);
            $componente= $html;
        }        
        //Reemplazo las variables
        $html= "";
        $inicio= strpos($componente, "{{", 0);
        $fin= strpos($componente, "}}", 0);  
        while($inicio !== FALSE && $fin !== FALSE){
            $inicio += 2;
            $var= substr($componente, $inicio, $fin - $inicio);
            if(isset($valores[$var])){
                $html= $html . substr($componente, 0, $inicio - 2) . $valores[$var];
            }
            else{
                $html= $html . substr($componente, 0, $inicio - 2);
            }
            $componente= substr($componente, $fin + 2);
            
            $inicio= strpos($componente, "{{", 0);
            $fin= strpos($componente, "}}", 0);
        }
        $html= $html . $componente;        
        return $html;
    }     
    private function armarEstructura($inicio, $componente){
        $estructuras= array();        
        $inicio= strpos($componente, "{%", $inicio);
        $fin= strpos($componente, "%}", $inicio);
        $tipoIf= $this->tipoIf($inicio, $componente);
        while($inicio !== FALSE && $fin !== FALSE){            
            if($tipoIf == 'endif'){
                $estructura= array('tipo' => $tipoIf, 'inicio' => $inicio, 'fin' => $fin + 1);
                $estructuras[]= $estructura;
                
                break;
            }
            else{
                if($tipoIf == 'if' || $tipoIf == 'elseif' || $tipoIf == 'else'){
                    $estructura= array('tipo' => $tipoIf, 'inicio' => $inicio, 'fin' => $fin + 1);
                    $inicio= strpos($componente, "{%", $fin + 2);
                    $fin= strpos($componente, "%}", $fin + 2);
                    $tipoIf= $this->tipoIf($inicio, $componente);
                    $hijos= array();
                    while($tipoIf == 'if'){
                        $res= $this->armarEstructura($inicio, $componente);
                        $hijos= array_merge($hijos, $res);                        
                        
                        $cantHijos= count($hijos);
                        $finHijo= $hijos[$cantHijos - 1]['fin'];
                        $inicio= strpos($componente, "{%", $finHijo + 1);
                        $fin= strpos($componente, "%}", $finHijo + 1);
                        
                        $tipoIf= $this->tipoIf($inicio, $componente);
                    }
                    if(count($hijos) > 0){
                        $estructura['hijos']= $hijos;
                    }
                    $estructuras[]= $estructura;
                }
                else{
                    echo 'Tipo If dio mal';
                    break;
                }
            }
        }
        return $estructuras;
    } 
    private function htmlCorrecto($bloques, $componente, $posActual, $valores, $primerLlamado){
        $html= "";
        $cant= count($bloques);
        $i= 0;
        $ifCorrecto= FALSE;
        while($i < $cant){
            $estructura= $bloques[$i];
            
            if($estructura['tipo'] == 'if'){
                $html= $html . substr($componente, $posActual, $estructura['inicio'] - $posActual);
            }
            if($estructura['tipo'] == 'endif'){
                $posActual= $estructura["fin"] + 1;
            }
            else{
                $posActual= $estructura['fin'] + 1;
                
                if(! $ifCorrecto || ($ifCorrecto && $estructura['tipo'] == 'if')){
                    if($this->evaluateIf($estructura['inicio'], $componente, $valores)){
                        $ifCorrecto= TRUE;
                        if(isset($estructura['hijos'])){
                            $html= $html . $this->htmlCorrecto($estructura['hijos'], $componente, $posActual, $valores, FALSE);
                            $cantHijos= count($estructura['hijos']);
                            $hijo= $estructura['hijos'][$cantHijos - 1];
                            $html= $html . substr($componente, $hijo['fin'] + 1, $bloques[$i + 1]['inicio'] - $hijo['fin'] - 1);
                        }
                        else{
                            $html= $html . substr($componente, $estructura['fin'] + 1, $bloques[$i + 1]['inicio'] - $estructura['fin'] - 1);
                        }
                    }
                    else{
                        $ifCorrecto= FALSE;
                    }
                }
            }            
            $i++;
        }        
        if($primerLlamado){
            $html= $html . substr($componente, $posActual);
        }        
        return $html;
    }    
    private function evaluateIf($inicio, $componente, $valores){
        $evaluacion= FALSE;
        $tipo= "";
        $inicio += 2;
        while($componente[$inicio] == " "){
            $inicio++;
        }
        if(substr($componente, $inicio, 3) == 'if '){
            $tipo= 'if';
            $inicio += 3;
        }        
        if(substr($componente, $inicio, 7) == 'elseif '){
            $tipo= 'elseif';
            $inicio += 7;
        }        
        if((substr($componente, $inicio, 5) == 'else ') || (substr($componente, $inicio, 5) == 'else}')){
            $tipo= 'else';
        }
        
        if($tipo == 'else'){
            return TRUE;
        }
        
        
        $op2= "";
	$continuar= TRUE;
        while($continuar){
            //Busco la variable
            while($componente[$inicio] == " "){
                $inicio++;
            }
            $posVar= $inicio;
            while($componente[$inicio] != " "){
                $inicio++;
            }
            $var= substr($componente, $posVar, $inicio - $posVar);
            
            //Busco el comparador
            while($componente[$inicio] == " "){
                $inicio++;
            }
            $operacion= "";
            switch ($componente[$inicio]) {
                case '=':
                    $inicio++;
                    if($componente[$inicio] == '='){
			$operacion= '==';
                    }
                    break;					
		case '!':
                    $inicio++;
                    if($componente[$inicio] == '='){
			$operacion= '!=';
                    }
                    break;
                default:
                    break;
            }
            
            //Busco la variable 2
            $inicio++;
            while($componente[$inicio] == " "){
                $inicio++;
            }
            $posVar2= $inicio;
            while($componente[$inicio] != " " && $componente[$inicio] != "}"){
                $inicio++;
            }
            $var2= NULL;
            if($componente[$posVar2] == '"' && $componente[$inicio - 1] == '"'){
                $var2= substr($componente, $posVar2 + 1, $inicio - $posVar2 - 2);
            }
            else{
                $var2= substr($componente, $posVar2, $inicio - $posVar2);
            }
            
            $evaluacion= $this->operacion($var, $operacion, $var2, $op2, $evaluacion, $valores);
            
            $continuar= false;
            $op2= "";
            if($componente[$inicio] != "}"){
                while($componente[$inicio] == " "){
                    $inicio++;
                }
		if(substr($componente, $inicio, 3) == 'and'){
                    $op2= '&&';
                    $continuar= true;
                    $inicio= $inicio + 3;
                }
		if(substr($componente, $inicio, 2) == 'or'){
                    $op2= '||';
                    $continuar= true;
                    $inicio= $inicio + 2;
		}
            }
        }
        return $evaluacion;
    }    
    private function operacion($var, $op, $var2, $op2, $rtaAnterior, $valores){
        $rta= false;
	switch ($op) {
            case '==':
                if($var2 == 'null'){
                    if(isset($valores[$var])){
                        $rta= $valores[$var] == NULL;
                    }
                    else{
                        $rta= TRUE;
                    }
		}
		else{				
                    if(! isset($valores[$var])){
                        $rta= FALSE;
                    }
                    else{
			$rta= $valores[$var] == $var2;
                    }
		}
		break;					
            case '!=':
            	if($var2 == 'null'){
                    if(isset($valores[$var])){
                        $rta= $valores[$var] != NULL;
                    }
                    else{
                        $rta= FALSE;
                    }                    
		}
		else{
                    if(! isset($valores[$var])){
                        $rta= FALSE;
                    }
                    else{
                        $rta= !($valores[$var] == $var2);
                    }
		}
		break;
            default:
                echo 'La operacion no es correcta';
                break;
        }
        switch ($op2) {
            case '&&':
		$rta= $rta && $rtaAnterior;
		break;					
            case '||':
		$rta= $rta || $rtaAnterior;
		break;
            default:
		break;
        }		
	return $rta;
    }    
    private function tipoIf($inicio, $componente){
        $inicio += 2;
        while($componente[$inicio] == " "){
            $inicio++;
        }
        if(substr($componente, $inicio, 3) == 'if '){
            return 'if';
        }        
        if(substr($componente, $inicio, 7) == 'elseif '){
            return 'elseif';
        }        
        if((substr($componente, $inicio, 5) == 'else ') || (substr($componente, $inicio, 5) == 'else}')){
            return 'else';
        }
        if((substr($componente, $inicio, 6) == 'endif ') || (substr($componente, $inicio, 6) == 'endif}')){
            return 'endif';
        }
	return 'error';
    }    
    private function conexionComponente($nombre){
        $url = 'http://www.edunola.com.ar/serviciosui/componenteDefinition?nombre=' . $nombre;
        //$url= 'http://localhost/serviciosui/componenteDefinition?nombre=' . $nombre;        
        return $this->conexionGet($url);
    }    
    private function conexionGet($url){
        //Configuracion general de conexion
        $options = array(
		CURLOPT_RETURNTRANSFER => true, // return web page
		//CURLOPT_FOLLOWLOCATION => true, // follow redirects
		CURLOPT_USERAGENT => 'clienteUIphp', // who am i
		CURLOPT_AUTOREFERER => true, // set referer on redirect
		CURLOPT_CONNECTTIMEOUT => 120, // timeout on connect
		CURLOPT_TIMEOUT => 120, // timeout on response
		CURLOPT_MAXREDIRS => 10, // stop after 10 redirects
	);        
        //Inicia conexion
        $curl_conexion= curl_init($url);  
        curl_setopt($curl_conexion, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl_conexion, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($curl_conexion, CURLOPT_VERBOSE, TRUE);                                                                
        curl_setopt_array( $curl_conexion, $options );        
        //Se ejecuta la consulta
        $result = curl_exec($curl_conexion);
        $header = curl_getinfo($curl_conexion);        
        //Cierra la conexion
        curl_close($curl_conexion);        
        return $result;
    }     
}
?>