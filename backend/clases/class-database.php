<?php
     
     require_once ('../vendor/autoload.php');
     use Kreait\Firebase\Factory;

     class Database{
         public function __construct(){
            $firebase = (new Factory)
                ->withServiceAccount("../secret/fir-php-test-d5d57-e1de8f3298fb.json") 
                ->withDatabaseUri("https://fir-php-test-d5d57-default-rtdb.firebaseio.com/")
                ->createDatabase();
            
            $this->dbusuarios = $firebase->getReference('usuarios');  
            $this->dbcategorias = $firebase->getReference('categorias');
         }

         public function getDBUsuarios(){
             return $this->dbusuarios;
         }
         public function getDBCategorias(){
            return $this->dbcategorias;
        }
     }

?>