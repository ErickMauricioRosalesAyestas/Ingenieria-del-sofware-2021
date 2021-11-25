if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
    llenarNavBarUsuario();
}else{
    llenarNavBar();
}

/*
var basedatos = [
  { ciudad: "Olanchito", lng: -86.56916, lat: 15.48231 },
  { ciudad: "La Ceiba", lng: -86.791031, lat: 15.78371 },
  { ciudad: "Saba", lng: -86.223953, lat: 15.52137 },
  { ciudad: "San Pedro Sula", lng: -88.024971, lat: 15.50523 },
  { ciudad: "Tegucigalpa", lng: -87.192139, lat: 14.072275 },
  { ciudad: "Comayagua", lng: -87.643066, lat: 14.46023 }
];

var baseFechas = [
  { fechaInicia: "2021/10/10", fechaFinal: "2021/10/15"},
  { fechaInicia: "2021/09/10", fechaFinal: "2021/09/15" },
  { fechaInicia: "2021/08/10", fechaFinal: "2021/08/15" },
  { fechaInicia: "2021/07/10", fechaFinal: "2021/07/15" },
  { fechaInicia: "2021/06/10", fechaFinal: "2021/06/15" },
  { fechaInicia: "2021/05/10", fechaFinal: "2021/05/15" }
];

var catego = 
  [
      {nombre:"Casa"},{nombre:"Departamento"},{nombre:"Oficina"},{nombre:"Negocio"},
      {nombre:"Industria"},{nombre:"Cuarto"}
  ];

var categorias = [];
(()=>{
  //Este arreglo es para generar textos de prueba
  let textosDePrueba=[
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
      "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
      "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
      "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
      "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
  ]
  
  //Genera dinamicamente los JSON de prueba para esta evaluacion,
  //Primer ciclo para las categorias y segundo ciclo para las apps de cada categoria

  
  let contador;
  for (let i=0;i<catego.length;i++){//Generar 5 categorias
      contador = 1;
      let categoria = {
          nombreCategoria:catego[i].nombre,
          descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
          propuestas:[]
      };
      for (let j=0;j<5;j++){//Generar 5 categorias
          let pre = (Math.random() * (500 - 1) + 1).toFixed(2);
          let propuesta = {
              codigo:contador,
              nombre: catego[i].nombre + ' ' + contador,
              descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
              calificacion:Math.floor(Math.random() * (5 - 1)) + 1,
              precio: pre,
              fechaInicia:baseFechas[i].fechaInicia,
              fechaFinal:baseFechas[i].fechaFinal,
              longitud:basedatos[i].lng,
              latitud:basedatos[i].lat,
              imagen:`img/propuestas/${catego[i].nombre}/${contador}.jpg`,
              comentarios:[
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Juan"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Pedro"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Maria"},
              ]
          };
          contador++;
          categoria.propuestas.push(propuesta);
      }
      categorias.push(categoria);
  }
  
  console.log(categorias);
})();

function guardar(){
  for(let i=0;i<categorias.length;i++){
        axios({
          method:'POST',
          url:'../../Proyectov1.0/backend/api/categorias.php',
          responseType:'json',
          data:categorias[i]
      }).then(res=>{
          console.log(res.data);
          obtenerCategorias();
      }).catch(error=>{
          console.error(error);
      });
  }
}
guardar();
*/

var categorias = [];
var categoriaSeleccionada = [];
const url = '../../Proyectov1.0/backend/api/categorias.php';
function obtenerCategorias(){
    axios({
        method:'GET',
        url:url,
        responseType:'json'
    }).then(res=>{
        this.categorias = res.data;
        generarCategorias();
        generarSelect();
    }).catch(error=>{
        console.error(error);
    });
}
window.onload = obtenerCategorias();

var usuarios = [];
const url1 = '../../Proyectov1.0/backend/api/usuarios.php';
function obtenerUsuarios(){
    axios({
        method:'GET',
        url:url1,
        responseType:'json'
    }).then(res=>{
        this.usuarios = res.data;
        if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
          botonesPerfil();
        }
        console.log(usuarios);
    }).catch(error=>{
        console.error(error);
    });
}
window.onload = obtenerUsuarios();

const firebaseConfig = {
  apiKey: "AIzaSyAsUlisf5yn5dq8_T99fLEQU1Hbkk0AK-k",
  authDomain: "fir-php-test-d5d57.firebaseapp.com",
  databaseURL: "https://fir-php-test-d5d57-default-rtdb.firebaseio.com",
  projectId: "fir-php-test-d5d57",
  storageBucket: "fir-php-test-d5d57.appspot.com",
  messagingSenderId: "486658166814",
  appId: "1:486658166814:web:ca7a7e3ba7930298095e0f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let boton = false;
let llaves = [];

//Llave para MapBox incluir siempre
mapboxgl.accessToken = 'pk.eyJ1IjoibWFub3Jvc2FsZXMwNyIsImEiOiJja3ZiNnAzYXQydXpmMm5ubmE4YXB4MWpuIn0.xC8gjRpwVh1KjjDwOKTc4g';

function autocompletado () {
  document.getElementById("demo").innerHTML = '';

  var pal = document.getElementById("buscar-pal").value;
  var tam = pal.length;
  for(indice in categorias){
    var contenido = categorias[indice];
    var nombre = categorias[indice].nombreCategoria;
    var str = nombre.substring(0,tam);
    console.log(str);
    if(pal.length <= nombre.length && pal.length != 0 && nombre.length != 0){
      if(pal.toLowerCase() == str.toLowerCase()){
        var node = document.createElement("LI");
        var textnode = document.createTextNode(categorias[indice].nombreCategoria);
        node.appendChild(textnode);
        document.getElementById("demo").appendChild(node);
        mostrarBusqueda(contenido);
      }
    }else{
      generarCategorias();
    }
  }
}

function mostrarBusqueda(contenido){
  document.getElementById("propuestas").innerHTML = '';
  for(let j=0; j<contenido.propuestas.length; j++){
      let propu = contenido.propuestas[j];
      document.getElementById("propuestas").innerHTML +=
      `
          <div class="card">
              <div class="card-body">
                  <div class="row form-group">
                      <div class="col-lg-8 ml-auto">
                           <img id="izquierda" src="${propu.imagen}" alt="">
                      </div>
                      <div id="derecha" class="col-lg-4">
                           <h3>HAUSHA ${propu.nombre}</h3>
                           <p id="tex" class="card-title">${propu.descripcion}</p>
                           <img src="img/icons-habitaciones/wifi.png" alt="">
                           <img src="img/icons-habitaciones/tv.png" alt="">
                           <img src="img/icons-habitaciones/bañera.png" alt="">
                           <img src="img/icons-habitaciones/comida.jpg" alt="">
                           <img src="img/icons-habitaciones/aprobado.png" alt="">
                           <img src="img/icons-habitaciones/aprobado.png" alt=""><br>
                           <div>
                              <p>Desde</p>
                              <h4>$${propu.precio}</h4>
                              <button type="submit" onclick="informacion(${0},${j});" class="btn btn-primary">Mas informacion</button>
                           </div>
                      </div>
                  </div>
              </div>
          </div>
      `;
  }
}

function generarCategorias()
{
    document.getElementById("eslogan").innerHTML = '';
    document.getElementById("eslogan").innerHTML += 
    `
    <h1>Propuestas</h1>
    <h6>En este espacio encontraras todas nuestras HAUSHAS disponibles</h6>
    `;
    document.getElementById("contenedor").innerHTML = '';
    document.getElementById("contenedor").innerHTML +=
    `
    <div class="card">
        <div  class="card-header" style="background-color: white;">
          <h3>Nuestras Propuestas</h3><hr>
          <div class="row form-group">
                  <input id="fechaInicial" class="col-lg-3 ml-auto" type="date" placeholder="Entrada">
                  <input id="fechaFinal" class="col-lg-3 ml-auto" type="date" placeholder="Salida">
                  <select id="SeleccionarCategoria" class="col-lg-3 ml-auto" onchange="SeleccionarCategoria()">
                  </select>
                  <button class="btn btn-primary col-lg-3 ml-auto" type="button" onclick="buscarFecha();">Buscar</button>
          </div>
        </div>
    </div>
    `;
    document.getElementById("propuestas").innerHTML = '';
    categoriaSeleccionada = [];
    let contador = 0;
    for(const cat in categorias){
      let cate = categorias[cat];
      categoriaSeleccionada.push(cat);   
      for(let i=0;i<cate.propuestas.length;i++){
        let pro = cate.propuestas[i];
        document.getElementById("propuestas").innerHTML +=
        `
          <div class="card">
              <div class="card-body">
                  <div class="row form-group">
                      <div class="col-lg-8 ml-auto">
                           <img id="izquierda" src="${pro.imagen}" alt="">
                      </div>
                      <div id="derecha" class="col-lg-4">
                           <h3>HAUSHA ${pro.nombre}</h3>
                           <p id="tex" class="card-title">${pro.descripcion}</p>
                           <img src="img/icons-habitaciones/wifi.png" alt="">
                           <img src="img/icons-habitaciones/tv.png" alt="">
                           <img src="img/icons-habitaciones/bañera.png" alt="">
                           <img src="img/icons-habitaciones/comida.jpg" alt="">
                           <img src="img/icons-habitaciones/aprobado.png" alt="">
                           <img src="img/icons-habitaciones/aprobado.png" alt=""><br>
                           <div>
                              <p>Desde</p>
                              <h4>$${pro.precio}</h4>
                              <button type="submit" onclick="informacion(${contador},${i});" class="btn btn-primary">Mas informacion</button>
                           </div>
                      </div>
                  </div>
              </div>
          </div>
        `;
      }
      contador++;
    }
}

function generarSelect(){
  document.getElementById("SeleccionarCategoria").innerHTML = '';
  for(const cat in categorias){
      document.getElementById("SeleccionarCategoria").innerHTML += 
              `<option value="${cat}">${categorias[cat].nombreCategoria}</option> 
              `;
  }
  document.getElementById("SeleccionarCategoria").value = null;
}

function buscarFecha(){
  let inicial = document.getElementById('fechaInicial').value;
  let final = document.getElementById('fechaFinal').value;

  document.getElementById("propuestas").innerHTML = '';
  for(let j=0;j<categorias.length;j++){
    for(let i=0; i<categorias[j].propuestas.length; i++){
      let propu = categorias[j].propuestas[i];
      if(propu.fechaInicia >= inicial && propu.fechaFinal <= final){
        document.getElementById("propuestas").innerHTML +=
      `
          <div class="card">
              <div class="card-body">
                  <div class="row form-group">
                      <div class="col-lg-8 ml-auto">
                           <img id="izquierda" src="${propu.imagen}" alt="">
                      </div>
                      <div id="derecha" class="col-lg-4">
                           <h3>HAUSHA ${propu.nombre}</h3>
                           <p id="tex" class="card-title">${propu.descripcion}</p>
                           <img src="img/icons-habitaciones/wifi.png" alt="">
                           <img src="img/icons-habitaciones/tv.png" alt="">
                           <img src="img/icons-habitaciones/bañera.png" alt="">
                           <img src="img/icons-habitaciones/comida.jpg" alt="">
                           <img src="img/icons-habitaciones/aprobado.png" alt="">
                           <img src="img/icons-habitaciones/aprobado.png" alt=""><br>
                           <div>
                              <p>Desde</p>
                              <h4>$${propu.precio}</h4>
                              <button type="submit" onclick="informacion(${j},${i});" class="btn btn-primary">Mas informacion</button>
                           </div>
                      </div>
                  </div>
              </div>
          </div>
      `;
      }
    }
  }
}

function SeleccionarCategoria(){
  var usu = document.getElementById('SeleccionarCategoria').value;
  categoriaSeleccionada = [];
  categoriaSeleccionada.push(usu);
  document.getElementById('propuestas').innerHTML = '';
  for(let j=0; j<categorias[usu].propuestas.length; j++){
      let propu = categorias[usu].propuestas[j];
      document.getElementById("propuestas").innerHTML +=
      `
          <div class="card">
              <div class="card-body">
                  <div class="row form-group">
                      <div class="col-lg-8 ml-auto">
                           <img id="izquierda" src="${propu.imagen}" alt="">
                      </div>
                      <div id="derecha" class="col-lg-4">
                           <h3>HAUSHA ${propu.nombre}</h3>
                           <p id="tex" class="card-title">${propu.descripcion}</p>
                           <img src="img/icons-habitaciones/wifi.png" alt="">
                           <img src="img/icons-habitaciones/tv.png" alt="">
                           <img src="img/icons-habitaciones/bañera.png" alt="">
                           <img src="img/icons-habitaciones/comida.jpg" alt="">
                           <img src="img/icons-habitaciones/aprobado.png" alt="">
                           <img src="img/icons-habitaciones/aprobado.png" alt=""><br>
                           <div>
                              <p>Desde</p>
                              <h4>$${propu.precio}</h4>
                              <button type="submit" onclick="informacion(${0},${j});" class="btn btn-primary">Mas informacion</button>
                           </div>
                      </div>
                  </div>
              </div>
          </div>
      `;
  }
  
}

function informacion(id1,id2){
    let cateActual = categorias[categoriaSeleccionada[id1]].propuestas[id2];
    document.getElementById("eslogan").innerHTML = '';
    document.getElementById("eslogan").innerHTML += 
    `
    <h1>Información</h1>
    <h6>En este espacio encontraras los detalles sobre nuestras HAUSHAS</h6>
    `;
    
    document.getElementById("contenedor").innerHTML = '';
    document.getElementById("propuestas").innerHTML = '';
    document.getElementById("propuestas").innerHTML +=
    `
    <div class="card">
        <div style="display: flex; align-items: start; align-content: start;"  class="card-header" style="background-color: white;">
          <h3><button onclick="obtenerCategorias();" type="submit" class="btn btn-primary">Atras</button> | HAUSHA ${cateActual.nombre}</h3>
        </div>
        <div class="card-body">
            <div class="row form-group">
                <div class="col-lg-8 ml-auto">
                      <div id="contenedor-carrusel">
                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                      <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                      </ol>
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img id="izquierda" class="d-block w-100" src="${cateActual.imagen}" alt="First slide">
                        </div>
                        <div class="carousel-item">
                          <img id="izquierda" class="d-block w-100" src="${cateActual.imagen}" alt="Second slide">
                        </div>
                        <div class="carousel-item">
                          <img id="izquierda" class="d-block w-100" src="${cateActual.imagen}" alt="Third slide">
                        </div>
                      </div>
                      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                      </a>
                      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                      </a>
                     </div>
                    </div>
                  </div>
            <div id="derecha" class="col-lg-4">
                    <div>
                     <p>Desde</p>
                     <h4>$${cateActual.precio}</h4>
                     <p>Por noche</p>
                     <p id="meGusta">(${cateActual.calificacion})</p>
                     <button class="megusta" id="megusta" type="button" onclick="meGusta(${id1},${id2});"><p><i class="far fa-thumbs-up"></i> Me gusta </p></button><br>
                     <input id="cont-date" type="date" placeholder="Entrada">
                     <input id="cont-date" type="date" placeholder="Salida">
                     <input id="cont-date" type="number" placeholder="Adultos"><br><br>
                     <button id="cont-date" onclick="crearReservacion(${id1},${id2});" type="submit" class="btn btn-primary">Revervar Ahora</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

<div class="card">
  <div class="card-body">
    <div class="row form-group">
        <div class="col-lg-4 ml-auto">
          <p>${categorias[categoriaSeleccionada[id1]].nombreCategoria}</p>
        </div>
        <div class="col-lg-4">
          <p>Aloja: 1 Persona</p>
        </div>
        <div class="col-lg-4">
          <p>Camas: 1 Individual(es)</p>
        </div>
    </div>
    <hr>
    <div class="row form-group">
      <div class="col-lg-4 ml-auto">
        <p>Más información:</p>
      </div>
      <div class="col-lg-8">
        <p>${cateActual.descripcion}</p>
      </div>
    </div>
    <hr>
    <div class="row form-group">
      <div class="col-lg-4 ml-auto">
        <p>Servicios y comodidades:</p>
      </div>
      <div class="col-lg-4">
        <p><img id="img-hab2" src="img/icons-habitaciones/wifi.png" alt=""> Wifi</p><br>
        <p><img id="img-hab2" src="img/icons-habitaciones/tv.png" alt=""> Baño</p><br>
        <p><img id="img-hab2" src="img/icons-habitaciones/bañera.png" alt=""> Espacio de trabajo</p><br>
        <p><img id="img-hab2" src="img/icons-habitaciones/aprobado.png" alt=""> Luz</p>
      </div>
      <div class="col-lg-4">
        <p><img id="img-hab2" src="img/icons-habitaciones/tv.png" alt=""> TV</p><br>
        <p><img id="img-hab2" src="img/icons-habitaciones/comida.jpg" alt=""> Cocina</p><br>
        <p><img id="img-hab2" src="img/icons-habitaciones/aprobado.png" alt=""> Agua</p><br>
      </div>
    </div>
    <hr><div class="row form-group">
      <div class="col-lg-4 ml-auto">
        <p>Entrada y salida:</p>
      </div>
      <div class="col-lg-4">
        <p>Entrada: 12:00 PM</p>
      </div>
      <div class="col-lg-4">
        <p>Salida: 02:00 PM</p>
      </div>
  </div>
  <hr>
  <div class="row form-group">
      <div class="col-lg-4 ml-auto">
        <p>Tarifas:</p>
      </div>
      <div class="col-lg-4">
        <p>Diario: desde $625 <br>
        Mensual: desde $3500 </p>
      </div>
      <div class="col-lg-4">
        <p>Semanal: desde $875</p>
      </div>
  </div>
  <hr>
  <div class="row form-group">
    <div class="col-lg-4 ml-auto">
      <p>Terminos:</p>
    </div>
    <div class="col-lg-4">
      <a href="">Lee nuestros terminos</a>
    </div>
    <div class="col-lg-4">
    </div>
  </div>
  <hr>
  <div id="map">
    
  </div>
  <hr>
  <div id="ContenedorCliente">

  </div>
  </div>
  </div>
    `;
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [cateActual.longitud, cateActual.latitud],
      zoom: 18
    })
    var scale = new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: 'imperial'
    });
    map.addControl(scale);
    
    scale.setUnit('metric');

    map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('map')}));

    map.boxZoom.enable();

    var nav = new mapboxgl.NavigationControl();

    map.addControl(nav, 'top-left');
    var marker = new mapboxgl.Marker({
      color: 'green',
      draggable: false
    })
    .setLngLat([cateActual.longitud, cateActual.latitud])
    .addTo(map);

    //Comentarios(id1,id2);
    firebase.database().ref('categorias')
    .on('value',function(snapshot){
      ///${categoriaSeleccionada[id1]}/propuestas/${id2}
      console.log("Categorias: ", snapshot.val());
      categorias = snapshot.val();
      comentariosFirebase(id1, id2);
    });

}

function comentariosFirebase(id1, id2){
  let cateActual = categorias[categoriaSeleccionada[id1]].propuestas[id2];
  document.getElementById("ContenedorCliente").innerHTML = '';
  document.getElementById("ContenedorCliente").innerHTML += 
  `<div id="comments-container" class="comments-container">
      <h1>Comentarios<a href="#"> HAUSHA</a></h1>
      <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Comenta" id="comentario">
          <div class="input-group-append">
              <button type="button" onclick="comentar(${id1},${id2});" class="btn btn-outline-danger"><i class="far fa-paper-plane"></i></button>
          </div>
      </div>
      </p>
      <ul id="comments-list" class="comments-list">
      </ul>
  </div>`;
  if(cateActual.comentarios){
    document.getElementById("comments-list").innerHTML = '';
    for(let i=0;i<cateActual.comentarios.length;i++){
      const comment = cateActual.comentarios[i];
      let img;
      let keys;
      if(comment.key){
        keys = comment.key;
        llaves.push(keys);
      }else{
        keys = '';
        llaves.push(keys);
      }
      if(comment.imagen){
        img = comment.imagen;
      }else{
        img = 'img/perfil.png';
      }
      document.getElementById("comments-list").innerHTML += 
      `<li id="lista_comentarios">
          <div class="comment-main-level">
            <!-- Avatar -->
            <div class="comment-avatar"><img src="${img}" alt=""></div>
            <!-- Contenedor Comentario -->
            <div class="comment-box">
              <div class="comment-head">
                <h6 class="comment-name by-author"><a type="button" onclick="verPerfil(${i});">${comment.usuario}</a></h6>
                <span>hace 12min</span>
                <div>
                  <i class="fas fa-reply"></i>
                </div>
                <div>
                  <i class="fas fa-heart"></i>
                </div>
              </div>
              <div class="comment-content">
              ${comment.comentario}
              </div>
            </div>
          </div>
      </li>
      `;
    }
  } 
}

/*-------------------Boton me gusta---------------------------*/
function meGusta(id1,id2){
  let cateActual = categorias[categoriaSeleccionada[id1]].propuestas[id2];
  if(boton == false){
    boton = true;
    document.getElementById("meGusta").innerHTML = `(${cateActual.calificacion+1})`;
    document.getElementById("megusta").style.color = 'rgb(69, 69, 248)';
  }else if(boton == true){
    boton = false;
    document.getElementById("meGusta").innerHTML = `(${cateActual.calificacion})`;
    document.getElementById("megusta").style.color = '#383838';
  }
}

/*------------------- Esta funcion sirve para los comentarios --------------------*/
function Comentarios(id1,id2){
  let cateActual = categorias[categoriaSeleccionada[id1]].propuestas[id2];
  document.getElementById("ContenedorCliente").innerHTML = '';
  document.getElementById("ContenedorCliente").innerHTML += 
  `<div id="comments-container" class="comments-container">
      <h1>Comentarios<a href="#"> HAUSHA</a></h1>
      <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Comenta" id="comentario">
          <div class="input-group-append">
              <button type="button" onclick="comentar(${id1},${id2});" class="btn btn-outline-danger"><i class="far fa-paper-plane"></i></button>
          </div>
      </div>
      </p>
      <ul id="comments-list" class="comments-list">
      </ul>
  </div>`;
        if(cateActual.comentarios){
          document.getElementById("comments-list").innerHTML = '';
          for(let i=0;i<cateActual.comentarios.length;i++){
            const comment = cateActual.comentarios[i];
            let img;
            let keys;
            if(comment.key){
              keys = comment.key;
            }else{
              keys = '';
            }
            if(comment.imagen){
              img = comment.imagen;
            }else{
              img = 'img/perfil.png';
            }
            document.getElementById("comments-list").innerHTML += 
            `<li id="lista_comentarios">
                <div class="comment-main-level">
                  <!-- Avatar -->
                  <div class="comment-avatar"><img src="${img}" alt=""></div>
                  <!-- Contenedor Comentario -->
                  <div class="comment-box">
                    <div class="comment-head">
                      <h6 class="comment-name by-author"><a type="button" onclick="verPerfil(${keys});">${comment.usuario}</a></h6>
                      <span>hace 12min</span>
                      <div>
                        <i class="fas fa-reply"></i>
                      </div>
                      <div>
                        <i class="fas fa-heart"></i>
                      </div>
                    </div>
                    <div class="comment-content">
                    ${comment.comentario}
                    </div>
                  </div>
                </div>
            </li>
            `;
          }
      }    
}

function verPerfil(id1){
  console.log("ID: ", llaves[id1]);
  sessionStorage.setItem('idPerfilUsuario', llaves[id1]);
  window.location.href = 'perfil.html';
}

function comentar(id1,id2){
  let usuActual = sessionStorage.getItem('idUsuarioActivo');
  let cateActual = categorias[categoriaSeleccionada[id1]];
  if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
    const comentar = {
      calificacion:4,
      comentario:document.getElementById("comentario").value,
      fecha:"09/12/2021",
      usuario:usuarios[usuActual].nombreUsuario,
      imagen:usuarios[usuActual].imagen,
      key:usuActual
    };

    let com;
    if(cateActual.propuestas[id2].comentarios){
      com = cateActual.propuestas[id2].comentarios;
      com.push(comentar);
    }else{
      com = [comentar];
    }

    let pro = {
      calificacion:cateActual.propuestas[id2].calificacion, 
      codigo:cateActual.propuestas[id2].codigo,
      comentarios:com,
      descripcion:cateActual.propuestas[id2].descripcion,
      imagen:cateActual.propuestas[id2].imagen, 
      latitud:cateActual.propuestas[id2].latitud,
      longitud:cateActual.propuestas[id2].longitud,
      nombre:cateActual.propuestas[id2].nombre, 
      precio:cateActual.propuestas[id2].precio
    };

    cateActual.propuestas[id2] = pro;
    axios({
      url:url + `?id=${categoriaSeleccionada[id1]}`,
      method:'PUT',
      responseType: 'json',
      data:cateActual
      }).then(res=>{
          console.log(res);
      }).catch(error=>{
          console.error(error);
      });
  }else{
    window.alert("Inicie sesion primero");
  } 
}

function llenarNavBar(){
    document.getElementById("navbar-form").innerHTML = '';
    document.getElementById("navbar-form").innerHTML +=
    `
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="nosotros.html">Nosotros</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" aria-current="page" href="habitaciones.html">Propuestas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Contáctanos</a>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-success" type="button" onclick="iniciar();">Iniciar Sesión</button>
        </li>
    </ul>
    `;
}

function iniciar(){
    window.location.href = 'registro.html';
}

function llenarNavBarUsuario(){
    document.getElementById("navbar-form").innerHTML = '';
    document.getElementById("navbar-form").innerHTML +=
    `
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="nosotros.html">Nosotros</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-current="page" href="habitaciones.html">Propuestas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Contáctanos</a>
            </li>
            <li id="sesionIniciada" class="nav-item dropdown">
              
            </li>
        </ul>
    `;
}

function botonesPerfil(){
  let usuar = sessionStorage.getItem('idUsuarioActivo');
  document.getElementById("sesionIniciada").innerHTML = '';
  document.getElementById("sesionIniciada").innerHTML += 
  `
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    <img id="perfil1" src="${usuarios[usuar].imagen}" alt="">${usuarios[usuar].nombre} ${usuarios[usuar].apellido}
    </a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
      <li><a class="dropdown-item" type="button" onclick="redireccionar();" href="#">Ver perfil</a></li>
      <li><a type="button" onclick="verReservacion();" class="dropdown-item" data-toggle="modal" data-target="#modalReservacion">Ver reservaciones</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a type="button" class="dropdown-item" onclick="cerrarSesion();">Cerrar Sesion</a></li>
    </ul>
  `;
}

function redireccionar(){
  if(sessionStorage.getItem('identificadorUsuario') == 0){
    window.location.href = 'superAdministrador.html';
  }else if(sessionStorage.getItem('identificadorUsuario') == 1){
      window.location.href = 'usuario.html';
  }
  else if(sessionStorage.getItem('identificadorUsuario') == 2){
      window.location.href = 'administrador.html';
  }
}

function cerrarSesion(){
    sessionStorage.clear();
    llenarNavBar();
}

function crearReservacion(id1, id2){
  let usuActual = sessionStorage.getItem('idUsuarioActivo');
  if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
    if(!usuarios[usuActual].reservacion){
      let reservaActual = categorias[categoriaSeleccionada[id1]].propuestas[id2];
      let usuActualizado;
      let pro;

      if(usuarios[usuActual].propuestas){
        pro = usuarios[usuActual].propuestas;
      }else{
        pro = [];
      }
  
      const reserva = {
          nombreCategoria:categorias[categoriaSeleccionada[id1]].nombreCategoria,
          keyCategotia:categoriaSeleccionada[id1],
          nombre:reservaActual.nombre,
          descripcion:reservaActual.descripcion,
          imagen:reservaActual.imagen,
          precio:reservaActual.precio
      };
      
      usuActualizado = {
        id:usuarios[usuActual].id,
        nombre:usuarios[usuActual].nombre,
        apellido:usuarios[usuActual].apellido,
        correo:usuarios[usuActual].correo,
        telefono:usuarios[usuActual].telefono,
        nombreUsuario:usuarios[usuActual].nombreUsuario,
        contrasena:usuarios[usuActual].contrasena,
        fecha:usuarios[usuActual].fecha,
        imagen:usuarios[usuActual].imagen,
        identificador:usuarios[usuActual].identificador,
        propuestas:pro,
        reservacion:[reserva],
        genero:usuarios[usuActual].genero,
        descripcion:usuarios[usuActual].descripcion,
        nacionalidad:usuarios[usuActual].nacionalidad
      };
      
        axios({
          method:'PUT',
          url:url1 + `?id=${usuActual}`,
          responseType:'json',
          data:usuActualizado
      }).then(res=>{
          console.log(res.data);
          window.alert("Su reservación ha sido exitosa.");
          obtenerCategorias();
          obtenerUsuarios();
      }).catch(error=>{
          console.error(error);
      });
    }else{
      window.alert("Ya tiene una reservación");
    }
  }else{
    window.alert("Inicie sesion primero");
  }
}

function llenarSelectPropuesta(){
  document.getElementById("selectPropuesta").innerHTML = '';
  for(const key in categorias){
    document.getElementById("selectPropuesta").innerHTML += 
    `
    <option value="${key}">${categorias[key].nombreCategoria}</option>
    `;
  }
  document.getElementById("selectPropuesta").value = null;
}

function crearPropuesta(){
  if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
    let key = document.getElementById("selectPropuesta").value;
    let cateActual = categorias[key].propuestas;
    let usuActual = sessionStorage.getItem('idUsuarioActivo');
    let usuActualizado;
    let reser;
    let pro;

    const propuesta = {
      codigo:cateActual.length+1,
      nombre:document.getElementById("nombrePro").value,
      descripcion:document.getElementById("descripPro").value,
      calificacio:[],
      precio:document.getElementById("precioPro").value,
      imagen:document.getElementById("lista-imagenes").value,
      comentarios:[],
      categoria:document.getElementById("selectPropuesta").value,
      codigoUsuario:usuActual
    };

    if(usuarios[usuActual].reservacion){
      reser = usuarios[usuActual].reservacion;
    }else{
      reser = [];   
    }

    if(usuarios[usuActual].propuestas){
      pro = usuarios[usuActual].propuestas;
      pro.push(propuesta);
    }else{
      pro = [propuesta];
    }

    usuActualizado = {
      id:usuarios[usuActual].id,
      nombre:usuarios[usuActual].nombre,
      apellido:usuarios[usuActual].apellido,
      correo:usuarios[usuActual].correo,
      telefono:usuarios[usuActual].telefono,
      nombreUsuario:usuarios[usuActual].nombreUsuario,
      contrasena:usuarios[usuActual].contrasena,
      fecha:usuarios[usuActual].fecha,
      imagen:usuarios[usuActual].imagen,
      reservacion:reser,
      identificador:usuarios[usuActual].identificador,
      propuestas:pro
    };
    
      axios({
        method:'PUT',
        url:url1 + `?id=${usuActual}`,
        responseType:'json',
        data:usuActualizado
    }).then(res=>{
        console.log(res.data);
        agregarPropuesta(propuesta);
        window.alert("Su propuesta ha sido agregada con exito.");
        obtenerCategorias();
        obtenerUsuarios();
        limpiarModal();
        $("#modalCrearPropuestas .close").click()
    }).catch(error=>{
        console.error(error);
    });
  }else{
    window.alert("Inicie sesion primero");
  }
}

function agregarPropuesta(propuesta){

  categorias[propuesta.categoria].propuestas.push(propuesta);

  axios({
    method:'PUT',
    url:url + `?id=${propuesta.categoria}`,
    responseType:'json',
    data:categorias[propuesta.categoria]
  }).then(res=>{
      console.log(res.data);
  }).catch(error=>{
      console.error(error);
  });
}

function verReservacion(){
  let usuActual = sessionStorage.getItem('idUsuarioActivo');
  if(usuarios[usuActual].reservacion){
    let reser = usuarios[usuActual].reservacion[0];
    document.getElementById("modalRegistroLabel").innerHTML = '';
    document.getElementById("modalRegistroLabel").innerHTML = 'Reservacion Actual';
    document.getElementById("verReservacion").innerHTML = '';
    document.getElementById("verReservacion").innerHTML +=
    `
    <div class="card">
       <div class="card-body">
           <div class="row form-group">
               <div class="col-lg-8 ml-auto">
                    <img id="izquierda" src="${reser.imagen}" alt="">
               </div>
               <div id="derecha" class="col-lg-4">
                    <h3>HAUSHA ${reser.nombre}</h3>
                    <p id="tex" class="card-title">${reser.descripcion}</p>
                    <img src="img/icons-habitaciones/wifi.png" alt="">
                    <img src="img/icons-habitaciones/tv.png" alt="">
                    <img src="img/icons-habitaciones/bañera.png" alt="">
                    <img src="img/icons-habitaciones/comida.jpg" alt="">
                    <img src="img/icons-habitaciones/aprobado.png" alt="">
                    <img src="img/icons-habitaciones/aprobado.png" alt=""><br>
                    <div>
                       <p>Desde</p>
                       <h4>$${reser.precio}</h4>
                    </div>
               </div>
           </div>
       </div>
    </div>
    `;
  }else{
    document.getElementById("modalRegistroLabel").innerHTML = '';
    document.getElementById("modalRegistroLabel").innerHTML = 'No tienes reservación';
    document.getElementById("verReservacion").innerHTML = '';
    document.getElementById("verReservacion").innerHTML +=
    `
    <h3>Realiza una reservacion</h3>
    `;
  }
}