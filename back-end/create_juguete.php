<?php 
require_once('includes/Juguete.php');

if($_SERVER['REQUEST_METHOD']== 'POST' 
&& isset($_POST['nombre']) && isset($_POST['precio']) && isset($_POST['stock']) && isset($_POST['descripcion'])){
    Juguete::create_juguete($_POST['nombre'], $_POST['precio'], $_POST['stock'], $_POST['descripcion']);

}
else {
    echo 'No se encontraron todos los datos necesarios';

}

?>