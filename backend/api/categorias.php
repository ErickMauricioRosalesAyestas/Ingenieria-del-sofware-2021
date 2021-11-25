<?php
    header("Content-Type: application/json");
    include_once("../clases/class-categorias.php");
    require_once("../clases/class-database.php");
    
    $database = new Database();
    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            $_POST = json_decode(file_get_contents('php://input'),true);
            $categoria = new Categoria(
                $_POST["nombreCategoria"],
                $_POST["descripcion"],
                $_POST["propuestas"]
            );
            echo $categoria->crearCategoria($database->getDBCategorias());
        break;
        case 'GET':
            if(isset($_GET['id'])){
                Categoria::obtenerCategoria($database->getDBCategorias(), $_GET['id']);
            }else{
                Categoria::obtenerCategorias($database->getDBCategorias());
            }
        break;
        case 'PUT':
            $_PUT = json_decode(file_get_contents('php://input'),true);
            $categoria = new Categoria(
                $_PUT["nombreCategoria"],
                $_PUT["descripcion"],
                $_PUT["propuestas"]
            );
            echo $categoria->actualizarCategoria($database->getDBCategorias(),$_GET['id']);
        break;
        case 'DELETE':
            Categoria::eliminarCategoria($database->getDBCategorias(),$_GET["id"]);
        break;
    }
?>