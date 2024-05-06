<?php 
require_once('includes/Juguete.php');

if($_SERVER['REQUEST_METHOD']== 'DELETE' && isset($_GET['id'])){
    Juguete::delete_juguete($_GET['id']);
}else{
        echo'No se envio el id del Juguete';
    }
?>