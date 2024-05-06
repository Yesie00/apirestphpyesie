<?php
require_once('includes/Juguete.php');

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    Juguete::get_all_juguete();
}
?>
