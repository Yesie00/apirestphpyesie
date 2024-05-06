<?php 
require_once('includes/Juguete.php');

parse_str(file_get_contents("php://input"), $_PUT);
 
if($_SERVER['REQUEST_METHOD']== 'PUT'  && isset($_PUT['nombre'])
&& isset($_PUT['precio']) && isset($_PUT['stock']) && isset($_PUT['descripcion']) && isset($_PUT['id'])){
   Juguete::update_Juguete($_PUT['id'], $_PUT['nombre'], $_PUT['precio'], $_PUT['stock'], $_PUT['descripcion']);
}else {
   echo 'No se han proporcionado todos los datos necesarios para la actualización';
}


?>