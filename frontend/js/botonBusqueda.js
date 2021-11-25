//hasta aqui

function autocompletado () {
    document.getElementById("demo").innerHTML = '';

    var preguntas = [
      "Casa",
      "departamento",
      "habitacion",
      "local"
    ];

    var pal = document.getElementById("buscar-pal").value;
    var tam = pal.length;
    for(indice in preguntas){
      var nombre = preguntas[indice];
      var str = nombre.substring(0,tam);
      if(pal.length <= nombre.length && pal.length != 0 && nombre.length != 0){
        if(pal.toLowerCase() == str.toLowerCase()){
          var node = document.createElement("LI");
          var textnode = document.createTextNode(preguntas[indice]);
          node.appendChild(textnode);
          document.getElementById("demo").appendChild(node);
          mostrarBusqueda(nombre);
        }

      }
    }

  }

  function mostrarBusqueda(nombre){
console.log(nombre);

  }