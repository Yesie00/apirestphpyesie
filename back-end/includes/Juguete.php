<?php
    require_once('Database.php');

    class Juguete{
        
        public static function create_juguete($nombre, $precio, $stock, $descripcion){
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('INSERT INTO juguete (nombre, precio, stock, descripcion) VALUES (:nombre, :precio, :stock, :descripcion)');
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':precio', $precio); 
            $stmt->bindParam(':stock', $stock); 
            $stmt->bindParam(':descripcion', $descripcion);  
            if($stmt->execute()){
                header('HTTP/1.1 201 Created');
                echo json_encode(array("message" => "Juguete creado correctamente."));
            }else{
                header('HTTP/1.1 500 Internal Server Error');
                echo json_encode(array("message" => "Error al crear el juguete."));
            }
        
        }
        
        

        public static function delete_juguete($id){
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('DELETE FROM juguete WHERE id=:id');
            $stmt->bindParam(':id',$id);
    
            if($stmt->execute()){
                http_response_code(200);
                echo json_encode(array("message" => "El juguete se borró exitosamente"));
            }else{
                http_response_code(500);
                echo json_encode(array("message" => "No se pudo borrar el juguete"));
            }
        
        }

        public static function get_all_juguete(){
            $database = new Database();
            $conn=$database->getConnection();
            $stmt=$conn->prepare('SELECT * FROM juguete');
            if($stmt->execute())
            {
                $result=$stmt->fetchAll();
                header('HTTP/1.1 202 ok');
                echo json_encode($result);
                return json_encode($result);
            }
            else
            {
                header('HTTP/1.1 401 fallo');
                echo "Error en el listado";
            }
        }


        public static function get_id_juguete($id){
            $database = new Database();
            $conn = $database->getConnection();
        
            $stmt = $conn->prepare('SELECT * FROM juguete WHERE id = :id');
            $stmt->bindParam(':id',$id);
            
        
            if ($stmt->execute()) {
                $result = $stmt->fetchAll();
                header('HTTP/1.1 202 ok');
                echo json_encode($result);
                return json_encode($result);
            } else {
                header('HTTP/1.1 401 fallo');
                echo "Error en el listado";
            }
        }

        public static function update_juguete($id, $nombre, $precio, $stock, $descripcion){
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('UPDATE juguete SET nombre=:nombre, precio=:precio, stock=:stock, descripcion=:descripcion WHERE id=:id');
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':precio', $precio); 
            $stmt->bindParam(':stock', $stock); 
            $stmt->bindParam(':descripcion', $descripcion);  
            $stmt->bindParam(':id', $id);  
            
            if($stmt->execute()){
                header('HTTP/1.1 201 el juguete se actualizo correctamente');
                echo json_encode(array("message" => "Juguete actualizado correctamente."));
            }else{
                header('HTTP/1.1 401 el juguete no se pudo actualizar');
                echo json_encode(array("message" => "Nose pudo actualizar el juguete."));
            }
        
            
         }
        
        
    }


?>