<?php

    class Categoria{
        private $nombreCategoria;
        private $descripcion;
        private $propuestas;

        public function __construct(
            $nombreCategoria,
            $descripcion,
            $propuestas
        ){
            $this->nombreCategoria = $nombreCategoria;
            $this->descripcion = $descripcion;
            $this->propuestas = $propuestas;
        }

        /**
        * Get the value of nombreCategoria
        */ 
        public function getnombreCategoria()
       {
              return $this->nombreCategoria;
       }

       /**
        * Set the value of nombreCategoria
        *
        * @return  self
        */ 
       public function setnombreCategoria($nombreCategoria)
       {
              $this->nombreCategoria = $nombreCategoria;

              return $this;
       }

       /**
        * Get the value of descripcion
        */ 
        public function getdescripcion()
       {
              return $this->descripcion;
       }

       /**
        * Set the value of descripcion
        *
        * @return  self
        */ 
       public function setdescripcion($descripcion)
       {
              $this->descripcion = $descripcion;

              return $this;
       }

       /**
        * Get the value of propuestas
        */ 
        public function getpropuestas()
       {
              return $this->propuestas;
       }

       /**
        * Set the value of propuestas
        *
        * @return  self
        */ 
       public function setpropuestas($propuestas)
       {
              $this->propuestas = $propuestas;

              return $this;
       }

       public function __toString()
       {
              return $this->nombre ." ".$this->apellido.
              " (".$this->fechaNacimiento.",".$this->pais.")";
       }

       //CRUD
       public function crearCategoria($db){
              $categorias = [
                     'nombreCategoria'=>$this->nombreCategoria,
                     'descripcion'=>$this->descripcion,
                     'propuestas'=>$this->propuestas
              ];
              $result = $db
                 ->push($categorias);
                 
              if($result->getKey() != null)
                 return '{"mensaje":"Registro almacenado","key":"'.$result->getKey().'"}';
              else
                 return '{"mensaje":"Error al guardar el registro"}';
        }
       
        public static function obtenerCategorias($db){
               $result = $db->getSnapshot()
                  ->getValue();
       
               echo json_encode($result);
        }
       
        public static function obtenerCategoria($db, $indice){
               $result = $db->getChild($indice)
                  ->getValue();
       
               echo json_encode($result);
        }
       
        public function actualizarCategoria($db, $indice){
               $categoria = [
                    'nombreCategoria'=>$this->nombreCategoria,
                    'descripcion'=>$this->descripcion,
                    'propuestas'=>$this->propuestas
               ];
               $result = $db
                  ->getChild($indice)
                  ->set($categoria);
               
               if($result->getKey() != null)
                  return '{"mensaje":"Registro actualizado","key":"'.$result->getKey().'"}';
               else
                  return '{"mensaje":"Error al actualizar el registro"}';
        }
       
        public static function eliminarCategoria($db, $indice){
              $db->getChild($indice) 
                 ->remove();
               echo '{"mensaje":"Se elimino el elemento '.$indice.'"}';
        }

    }
?>