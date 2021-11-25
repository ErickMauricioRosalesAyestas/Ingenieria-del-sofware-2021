<?php
    header("Content-Type: application/json");
    include_once("../clases/class-usuarios.php");
    require_once("../clases/class-database.php");
    
    $database = new Database();
    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            $_POST = json_decode(file_get_contents('php://input'),true);
            $usuario = new Usuario(
                $_POST["id"],
                $_POST["nombre"],
                $_POST["apellido"],
                $_POST["correo"],
                $_POST["telefono"], 
                $_POST["nombreUsuario"],
                $_POST["contrasena"], 
                $_POST["fecha"], 
                $_POST["imagen"],
                $_POST["nacionalidad"],
                $_POST["genero"],
                $_POST["reservacion"],
                $_POST["identificador"],
                $_POST["propuestas"],
                $_POST["descripcion"]
            );
            echo $usuario->crearUsuario($database->getDBUsuarios());
        break;
        case 'GET':
            if(isset($_GET['id'])){
                Usuario::obtenerUsuario($database->getDBUsuarios(), $_GET['id']);
            }else{
                Usuario::obtenerUsuarios($database->getDBUsuarios());
            }
        break;
        case 'PUT':
            $_PUT = json_decode(file_get_contents('php://input'),true);
            $usuario = new Usuario(
                $_PUT["id"],
                $_PUT["nombre"],
                $_PUT["apellido"],
                $_PUT["correo"],
                $_PUT["telefono"], 
                $_PUT["nombreUsuario"],
                $_PUT["contrasena"], 
                $_PUT["fecha"], 
                $_PUT["imagen"],
                $_PUT["nacionalidad"],
                $_PUT["genero"],
                $_PUT["reservacion"],
                $_PUT["identificador"],
                $_PUT["propuestas"],
                $_PUT["descripcion"]
            );
            echo $usuario->actualizarUsuario($database->getDBUsuarios(),$_GET['id']);
        break;
        case 'DELETE':
            Usuario::eliminarUsuario($database->getDBUsuarios(),$_GET["id"]);
        break;
    }
?>