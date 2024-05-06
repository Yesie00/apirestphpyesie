<?php
    require_once('includes/Juguete.php');

     if($_SERVER['REQUEST_METHOD']== 'GET' && isset($_GET["id"])){

         Juguete::get_id_juguete($_GET["id"]);

     }else{
        echo "nose encontro el id";
     }
?>