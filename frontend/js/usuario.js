if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
    llenarNavBarUsuario();
}else{
    window.location.href = 'registro.html';
    llenarNavBar();
}

//Llave para MapBox incluir siempre
mapboxgl.accessToken = 'pk.eyJ1IjoibWFub3Jvc2FsZXMwNyIsImEiOiJja3ZiNnAzYXQydXpmMm5ubmE4YXB4MWpuIn0.xC8gjRpwVh1KjjDwOKTc4g';

var basedatos = [
  { "ciudad": "Olanchito", "lng": -86.56916, "lat": 15.48231 },
  { "ciudad": "La Ceiba", "lng": -86.791031, "lat": 15.78371 },
  { "ciudad": "Saba", "lng": -86.223953, "lat": 15.52137 },
  { "ciudad": "San Pedro Sula", "lng": -88.024971, "lat": 15.50523 },
  { "ciudad": "Tegucigalpa", "lng": -87.192139, "lat": 14.072275 },
  { "ciudad": "Comayagua", "lng": -87.643066, "lat": 14.46023 }
];

var usuarios = [];
var listUser = [];
const url = '../../Proyectov1.0/backend/api/usuarios.php';
function obtenerUsuarios(){
    axios({
        method:'GET',
        url:url,
        responseType:'json'
    }).then(res=>{
        this.usuarios = res.data;
        if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
          botonesPerfil();
          bienvenida();
        }
        console.log(usuarios);
    }).catch(error=>{
        console.error(error);
    });
}
obtenerUsuarios();

function bienvenida(){
    let usuar = sessionStorage.getItem('idUsuarioActivo');
    document.getElementById("bienvenida").innerHTML = '';
    document.getElementById("bienvenida").innerHTML +=
    `
    <h1>Bienvenid@ ${usuarios[usuar].nombre} ${usuarios[usuar].apellido}</h1>
    `;
    document.getElementById("contenedor-acciones").innerHTML = '';
}

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

var categorias = [];
const url1 = '../../Proyectov1.0/backend/api/categorias.php';
function obtenerCategorias(){
    axios({
        method:'GET',
        url:url1,
        responseType:'json'
    }).then(res=>{
        this.categorias = res.data;
    }).catch(error=>{
        console.error(error);
    });
}
obtenerCategorias();

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
          <a class="nav-link active" aria-current="page" href="contactanos.html">Contáctanos</a>
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
              <a class="nav-link active" aria-current="page" href="habitaciones.html">Propuestas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="contactanos.html">Contáctanos</a>
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
    <img id="perfil2" src="${usuarios[usuar].imagen}" alt="">${usuarios[usuar].nombre} ${usuarios[usuar].apellido}
    </a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
      <li><a type="button" class="dropdown-item" onclick="cerrarSesion();">Cerrar Sesion</a></li>
    </ul>
  `;
}

function cerrarSesion(){
    sessionStorage.clear();
    window.location.href = 'registro.html';
}

function editarPerfil(){
    let usuActual = sessionStorage.getItem('idUsuarioActivo');
    document.getElementById("contenedor-acciones").innerHTML = '';
    document.getElementById("contenedor-acciones").innerHTML += 
    `
    <div id="perfil">
        <form class="form">
            <div id="titulo" class="form-group">
                <label style="color: white;" for="exampleInputEmail1">Sube una foto de perfil</label>
            </div>
            <div class="row form-group">
                <div class="col-lg-4 ml-auto">
                     <img id="izquierda" src="${usuarios[usuActual].imagen}" alt="">
                </div>
                <div id="derecha" class="col-lg-8">
                     <p id="tex" class="card-title">Puedes subir una imagen para generar más confianza en la comunidad HAUSHA.</p>
                </div>
            </div>
            <div id="cont-buton" class="form-group">
                <button type="button" class="btn btn-primary btn-form">Subir Archivo</button>
            </div>
        </form>
    </div>
    <div id="perfil">
        <form class="form">
            <div id="titulo" class="form-group">
                <label style="color: white;" for="exampleInputEmail1">Tu perfil publico</label>
            </div>
            <div class="form-group">
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Descripcion publica aparece en HAUSHA para usuarios registrados. Saber con quien vives es muy importante, entonces, explica a tus posibles compañeros de piso quien eres y que haces para generar un mejor ambiente</label>
                    <textarea class="form-control" id="descripcion" rows="7"></textarea>
                  </div>
              </div>
        </form>
    </div>
    <div id="perfil">
        <form class="form">
            <div id="titulo" class="form-group">
                <label style="color: white;" for="exampleInputEmail1">Datos Personales</label>
            </div>
            <div class="form-group">
                <label>Nombre</label>
                <input type="text" class="form-control" id="nombre" placeholder="">
                <label>Apellido</label>
                <input type="text" class="form-control" id="apellido" placeholder="">
                <label>Nombre de Usuario</label>
                <input type="text" class="form-control" id="usuario" placeholder="">
                <label>Genero</label>
                <select class="form-control" id="genero">
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
                <label>Fecha de nacimiento</label>
                <input type="date" class="form-control" id="fecha" placeholder="">
                <label>Nacionalidad</label>
                <select class="form-control" id="nacionalidad">
                  <option value="Honduras">Honduras</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Nicaragua">Nicaragua</option>
                </select>
                <label>Correo</label>
                <input type="email" class="form-control" id="correo" placeholder="">
                <label>Numero de celular</label>
                <input type="number" class="form-control" id="celular" placeholder="">
            </div>
          </form>
    </div>
    <div id="perfil">
        <form class="form">
            <div id="titulo" class="form-group">
                <label style="color: white;">Seguridad</label>
            </div>
            <div class="form-group">
              <label>Para cambiar tu contraseña ingresa tu contraseña actual</label>
              <input id="contraseña" type="password" class="form-control" placeholder="Contraseña actual">
              <label>Nueva contraseña</label>
              <input id="contraseñaNueva" type="password" class="form-control" placeholder="Nueva contraseña">
            </div>
          </form>
    </div>
    <div id="perfil" class="final">
        <form class="form">
           <button onclick="actualizarPerfil();" type="button" class="btn btn-primary btn-form">Guardar Cambios</button>
        </form>
    </div>
    `;
    document.getElementById("nombre").value = usuarios[usuActual].nombre;
    document.getElementById("apellido").value = usuarios[usuActual].apellido;
    document.getElementById("usuario").value = usuarios[usuActual].nombreUsuario;
    document.getElementById("fecha").value = usuarios[usuActual].fecha;
    document.getElementById("correo").value = usuarios[usuActual].correo;
    document.getElementById("celular").value = usuarios[usuActual].telefono;
    document.getElementById("descripcion").value = usuarios[usuActual].descripcion;
    document.getElementById("genero").value = usuarios[usuActual].genero;
    document.getElementById("nacionalidad").value = usuarios[usuActual].nacionalidad;
    document.getElementById("contraseñaNueva").value = usuarios[usuActual].contrasena;
}

function actualizarPerfil(){
  let usuActual = sessionStorage.getItem('idUsuarioActivo');
  let pro;
      if(usuarios[usuActual].propuestas){
        pro = usuarios[usuActual].propuestas;
      }else{
        pro = [];
      }
  let reser;
    if(usuarios[usuActual].reservacion){
      reser = usuarios[usuActual].reservacion;
    }else{
      reser = [];
    }

  usuActualizado = {
    id:usuarios[usuActual].id,
    nombre:document.getElementById("nombre").value,
    apellido:document.getElementById("apellido").value,
    correo:document.getElementById("correo").value ,
    telefono:document.getElementById("celular").value,
    nombreUsuario:document.getElementById("usuario").value ,
    contrasena:document.getElementById("contraseñaNueva").value ,
    fecha:document.getElementById("fecha").value ,
    imagen:usuarios[usuActual].imagen,
    nacionalidad:document.getElementById("nacionalidad").value,
    genero:document.getElementById("genero").value,
    identificador:usuarios[usuActual].identificador,
    propuestas:pro,
    reservacion:reser,
    descripcion:document.getElementById("descripcion").value
  };
  
    axios({
      method:'PUT',
      url:url + `?id=${usuActual}`,
      responseType:'json',
      data:usuActualizado
  }).then(res=>{
      console.log(res.data);
      window.alert("Datos actualizados");
      obtenerUsuarios();
      mandarNotificacionPerfil();
  }).catch(error=>{
      console.error(error);
  });
}

function mandarNotificacionPerfil(){
  let usuActual = sessionStorage.getItem('idUsuarioActivo');

  let notificacion = {
    asunto:"Modificacion de perfil",
    mensaje:"El usuario "+usuarios[usuActual].nombre+" "+usuarios[usuActual].apellido+" ha modificado su perfil.",
    key:usuActual,
    leido:false
  }
  let contador = 0;
  let filtro = [];
  let key = [];
    for(const usu in usuarios){
        filtro.push(usuarios[usu]);
        contador++;
        if(usuarios[usu].identificador != 1){
          key.push(usu); 
        }
    }
  const resultado = filtro.filter(usuarios => usuarios.identificador != 1);
  console.log(resultado);
  console.log(key);

  for(let i=0;i<resultado.length;i++){
    let pro;
      if(resultado[i].propuestas){
        pro = resultado[i].propuestas;
      }else{
        pro = [];
      }
    let reser;
      if(resultado[i].reservacion){
        reser = resultado[i].reservacion;
      }else{
        reser = [];
      }
    let res;
      if(resultado[i].descripcion == "Ninguna"){
        res = [notificacion];
      }else{
        res = resultado[i].descripcion;
        res.push(notificacion);
  }
    usuActualizado = {
      id:resultado[i].id,
      nombre:resultado[i].nombre,
      apellido:resultado[i].apellido,
      correo:resultado[i].correo,
      telefono:resultado[i].telefono,
      nombreUsuario:resultado[i].nombreUsuario,
      contrasena:resultado[i].contrasena,
      fecha:resultado[i].fecha,
      imagen:resultado[i].imagen,
      nacionalidad:resultado[i].nacionalidad,
      genero:resultado[i].genero,
      identificador:resultado[i].identificador,
      propuestas:pro,
      reservacion:reser,
      descripcion:res
    };
      axios({
        method:'PUT',
        url:url + `?id=${key[i]}`,
        responseType:'json',
        data:usuActualizado
    }).then(res=>{
        console.log(res.data);
    }).catch(error=>{
        console.error(error);
    });
  }
}

function crearPropuesta(){
    document.getElementById("contenedor-acciones").innerHTML = '';
    document.getElementById("contenedor-acciones").innerHTML += 
    `
        <div id="perfil" class="separacion">
            <form class="form">
                <h1>Crear nueva propuesta</h1>
                <label>Nombre propuesta:</label>
                <input class="form-control my-2" type="email" id="nombrePro" placeholder="Nombre">
                <label>Precio:</label>
                <input class="form-control my-2" type="number" id="precioPro" placeholder="Precio">
                <label>Descripcion:</label>
                <input class="form-control my-2" type="text" id="descripPro" placeholder="Descripcion">
                <p>Seleccione el tipo de categoria:</p>
                <select class="form-control my-2" id="selectPropuesta">
    
                </select>
                <p>Seleccione una imagen:</p>
                <select class="form-control my-2" id="lista-imagenes">
                  <option value="img/perfil/goku.jpg">Imagen 1</option>
                  <option value="img/perfil/lufi.jpg">Imagen 2</option>
                  <option value="img/perfil/naruto.jpg">Imagen 3</option>
                </select>
                <div id="map">
                          
                 </div>
                 <p>Para seleccionar la posición de propuesta seleccione una ciudad y luego haga click en el mapa para el lugar deseado. De esta manera marcara la dirección.</p>
                 Pais:<select id="pais" type="text">
                            <option value="Honduras">Honduras</option>
                       </select><br>
                  Direccion:<select id="direccion" type="text" onchange="cambiarPosicion()">
                               
                            </select><br>
                 <label>Longiud:</label>
                 <input class="form-control my-2" type="text" id="longitud" placeholder="" readonly>
                 <label>Latitud:</label>
                 <input class="form-control my-2" type="text" id="latitud" placeholder="" readonly>
                <button onclick="Propuesta();" type="button" class="btn btn-primary btn-form">Guardar</button>
            </form>
        </div>
    `;
    document.getElementById('direccion').innerHTML = '';
    for(let i=0;i<basedatos.length;i++){
        const base = basedatos[i];
        document.getElementById('direccion').innerHTML += 
        `
        <option value="${i}">${base.ciudad}</option>
        `;
    }
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-87.192139, 14.072275],
      zoom: 13
    })
    llenarSelectPropuesta();
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

function cambiarPosicion(){
  document.getElementById("map").innerHTML = '';
  //Esto genera el mapa 
  let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 15
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

  let ciudadSeleccionada = document.querySelector('#direccion').value;
  console.log(ciudadSeleccionada);
      map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [basedatos[ciudadSeleccionada].lng, basedatos[ciudadSeleccionada].lat],
      zoom: 15
  })

  var marker = new mapboxgl.Marker({
      color: 'green',
      draggable: false
  })
  .setLngLat([basedatos[ciudadSeleccionada].lng, basedatos[ciudadSeleccionada].lat])
  .addTo(map);

  map.on('style.load', function() {
      map.on('click', function(e) {
        var coordinates = e.lngLat;
        new mapboxgl.Popup()
          marker.setLngLat(coordinates)
          document.getElementById('longitud').value = coordinates.lng;
          document.getElementById('latitud').value = coordinates.lat;
      });
  });
}

function Propuesta(){
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
      calificacion:0,
      precio:document.getElementById("precioPro").value,
      imagen:document.getElementById("lista-imagenes").value,
      comentarios:[],
      categoria:document.getElementById("selectPropuesta").value,
      codigoUsuario:usuActual,
      latitud:document.getElementById("latitud").value,
      longitud:document.getElementById("longitud").value
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
      propuestas:pro,
      genero:usuarios[usuActual].genero,
      nacionalidad:usuarios[usuActual].nacionalidad,
      descripcion:usuarios[usuActual].descripcion
    };
    
      axios({
        method:'PUT',
        url:url + `?id=${usuActual}`,
        responseType:'json',
        data:usuActualizado
    }).then(res=>{
        console.log(res.data);
        agregarPropuesta(propuesta);
        window.alert("Su propuesta ha sido agregada con exito.");
        obtenerUsuarios();
        obtenerCategorias();
        bienvenida();
    }).catch(error=>{
        console.error(error);
    });
}

function agregarPropuesta(propuesta){

  categorias[propuesta.categoria].propuestas.push(propuesta);

  axios({
    method:'PUT',
    url:url1 + `?id=${propuesta.categoria}`,
    responseType:'json',
    data:categorias[propuesta.categoria]
  }).then(res=>{
      console.log(res.data);
      mandarNotificacionPropuesta();
  }).catch(error=>{
      console.error(error);
  });
}

function mandarNotificacionPropuesta(){
  let usuActual = sessionStorage.getItem('idUsuarioActivo');

  let notificacion = {
    asunto:"Se agrego una propuesta",
    mensaje:"El usuario "+usuarios[usuActual].nombre+" "+usuarios[usuActual].apellido+" ha creado una propuesta.",
    key:usuActual,
    leido:false
  }
  let contador = 0;
  let filtro = [];
  let key = [];
    for(const usu in usuarios){
        filtro.push(usuarios[usu]);
        contador++;
        if(usuarios[usu].identificador == 2){
          key.push(usu); 
        }
    }
  const resultado = filtro.filter(usuarios => usuarios.identificador == 2);
  console.log(resultado);
  console.log(key);

  for(let i=0;i<resultado.length;i++){
    let pro;
      if(resultado[i].propuestas){
        pro = resultado[i].propuestas;
      }else{
        pro = [];
      }
    let reser;
      if(resultado[i].reservacion){
        reser = resultado[i].reservacion;
      }else{
        reser = [];
      }
    let res;
      if(resultado[i].descripcion == "Ninguna"){
        res = [notificacion];
      }else{
        res = resultado[i].descripcion;
        res.push(notificacion);
      }

    usuActualizado = {
      id:resultado[i].id,
      nombre:resultado[i].nombre,
      apellido:resultado[i].apellido,
      correo:resultado[i].correo,
      telefono:resultado[i].telefono,
      nombreUsuario:resultado[i].nombreUsuario,
      contrasena:resultado[i].contrasena,
      fecha:resultado[i].fecha,
      imagen:resultado[i].imagen,
      nacionalidad:resultado[i].nacionalidad,
      genero:resultado[i].genero,
      identificador:resultado[i].identificador,
      propuestas:pro,
      reservacion:reser,
      descripcion:res
    };
      axios({
        method:'PUT',
        url:url + `?id=${key[i]}`,
        responseType:'json',
        data:usuActualizado
    }).then(res=>{
        console.log(res.data);
    }).catch(error=>{
        console.error(error);
    });
  }
}

function reservacion(){
  let usuActual = sessionStorage.getItem('idUsuarioActivo');
  if(usuarios[usuActual].reservacion){
    let usu = usuarios[usuActual].reservacion[0];
    document.getElementById("contenedor-acciones").innerHTML = '';
    document.getElementById("contenedor-acciones").innerHTML +=
    `
    <div id="propuestas">
      <div class="card">
          <div class="card-body">
              <div class="row form-group">
                  <div class="col-lg-8 ml-auto">
                       <img id="izquierda" src="${usu.imagen}" alt="">
                  </div>
                  <div id="derecha" class="col-lg-4">
                       <h3>HAUSHA ${usu.nombre}</h3>
                       <p id="tex" class="card-title"></p>
                       <img src="img/icons-habitaciones/wifi.png" alt="">
                       <img src="img/icons-habitaciones/tv.png" alt="">
                       <img src="img/icons-habitaciones/bañera.png" alt="">
                       <img src="img/icons-habitaciones/comida.jpg" alt="">
                       <img src="img/icons-habitaciones/aprobado.png" alt="">
                       <img src="img/icons-habitaciones/aprobado.png" alt=""><br>
                       <div>
                          <p>Desde</p>
                          <h4></h4>
                          <button type="submit" onclick="masInformacion();" class="btn btn-primary btn-form">Mas informacion</button>
                       </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    `;
  }else{
    alert("No tienes reservaciones");
  }
}

function masInformacion(){
  let usuActual = sessionStorage.getItem('idUsuarioActivo');
  let usu = usuarios[usuActual].reservacion[0];
  document.getElementById("contenedor-acciones").innerHTML = '';
  document.getElementById("contenedor-acciones").innerHTML +=
  `
  <div id="propuestas">
  <div class="card">
      <div style="display: flex; align-items: start; align-content: start;"  class="card-header" style="background-color: white;">
        <h3><button type="submit" onclick="reservacion();" class="btn btn-primary">Regresar</button>HAUSHA ${usu.nombre}</h3>
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
                        <img id="izquierda" class="d-block w-100" src="${usu.imagen}" alt="First slide">
                      </div>
                      <div class="carousel-item">
                        <img id="izquierda" class="d-block w-100" src="${usu.imagen}" alt="Second slide">
                      </div>
                      <div class="carousel-item">
                        <img id="izquierda" class="d-block w-100" src="${usu.imagen}" alt="Third slide">
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
                   <h4>$${usu.precio}</h4>
                   <p>Por noche</p>
                   <input id="cont-date" type="date" placeholder="Entrada">
                   <input id="cont-date" type="date" placeholder="Salida">
                   <input id="cont-date" type="number" placeholder="Adultos">
                   <button id="cont-date" onclick="" type="submit" class="btn btn-primary btn-form">Revervar Ahora</button>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div class="card">
      <div class="card-body">
        <div class="row form-group">
            <div class="col-lg-4 ml-auto">
              <p></p>
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
            <p>${usu.descripcion}</p>
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
      <div id="maps">
        
      </div>
      </div>
  </div>
  </div>
  `;
}

function misPropuestas(){
  let usuActual = sessionStorage.getItem('idUsuarioActivo');
  if(usuarios[usuActual].propuestas){
    document.getElementById("contenedor-acciones").innerHTML = '';
    for(let i=0;i<usuarios[usuActual].propuestas.length;i++){
      let usu = usuarios[usuActual].propuestas[i];
      document.getElementById("contenedor-acciones").innerHTML +=
      `
        <div id="propuestas">
          <div class="card">
              <div class="card-body">
                  <div class="row form-group">
                      <div class="col-lg-8 ml-auto">
                           <img id="izquierda" src="${usu.imagen}" alt="">
                      </div>
                      <div id="derecha" class="col-lg-4">
                           <h3>HAUSHA ${usu.nombre}</h3>
                           <p id="tex" class="card-title"></p>
                           <img src="img/icons-habitaciones/wifi.png" alt="">
                           <img src="img/icons-habitaciones/tv.png" alt="">
                           <img src="img/icons-habitaciones/bañera.png" alt="">
                           <img src="img/icons-habitaciones/comida.jpg" alt="">
                           <img src="img/icons-habitaciones/aprobado.png" alt="">
                           <img src="img/icons-habitaciones/aprobado.png" alt=""><br>
                           <div>
                              <p>Desde</p>
                              <h4></h4>
                              <button type="submit" onclick="" class="btn btn-primary btn-form">Mas informacion</button>
                           </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        `;
    }
  }else{
    alert("No tienes propuestas");
  }
}

function reCanceladas(){
    document.getElementById("contenedor-acciones").innerHTML = '';
    document.getElementById("contenedor-acciones").innerHTML +=
    `
    <div id="propuestas">
      <div class="card">
          <div class="card-body">
              <div class="row form-group">
                  <div class="col-lg-8 ml-auto">
                       <img id="izquierda" src="" alt="">
                  </div>
                  <div id="derecha" class="col-lg-4">
                       <h3>HAUSHA</h3>
                       <p id="tex" class="card-title"></p>
                       <img src="img/icons-habitaciones/wifi.png" alt="">
                       <img src="img/icons-habitaciones/tv.png" alt="">
                       <img src="img/icons-habitaciones/bañera.png" alt="">
                       <img src="img/icons-habitaciones/comida.jpg" alt="">
                       <img src="img/icons-habitaciones/aprobado.png" alt="">
                       <img src="img/icons-habitaciones/aprobado.png" alt=""><br>
                       <div>
                          <p>Desde</p>
                          <h4></h4>
                          <button type="submit" onclick="masInformacion();" class="btn btn-primary btn-form">Mas informacion</button>
                       </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    `;
}

function chat(){
  var x = document.getElementById("chatDiv");
  if (x.style.display === "none") {
    x.style.display = "block";
    llenarChatUser();
  } else {
    x.style.display = "none";
  }
}

function llenarChatUser(){
  let usuActual = sessionStorage.getItem('idUsuarioActivo');
  let keys = [];
  for(const usu in usuarios){
      const key = {
        key:usu,
        nombre: usuarios[usu].nombre,
        apellido: usuarios[usu].apellido,
        identificador: usuarios[usu].identificador
      }
      keys.push(key);
  }
  listUser = keys.filter(keys => keys.identificador == 1 && keys.key != usuActual);
  document.getElementById('chatListUser').innerHTML = '';
  for(let i=0; i<listUser.length; i++){
    let user = listUser[i];
    document.getElementById('chatListUser').innerHTML +=
    `
      <li><button onclick="chatear(${i});" class="btn btn-primary list-button">${user.nombre} ${user.apellido}</button></li>
    `;
  }
}

function chatear(id1){
  console.log("User: ",listUser[id1]);
  let usuActual = sessionStorage.getItem('idUsuarioActivo');
  let user = usuarios[listUser[id1].key];
  document.getElementById('contenedor-acciones').innerHTML = '';
  document.getElementById('contenedor-acciones').innerHTML += 
  `
  <div id="propuestas">
          <div class="card">
            <div class="card-body">
              <div class="seccion-chat">
                <div class="usuario-seleccionado">
                    <div class="avatar">
                        <img id="user-img" src="${user.imagen}">
                    </div>
                    <div class="cuerpo">
                        <span>${user.nombre} ${user.apellido}</span>
                    </div>
                </div>
                <div id="contenedor-comentarios" class="panel-chat overflow-auto">
                    
                </div>
                <div class="panel-escritura">
                    <form class="textarea">
                        <div class="opcines">
                            <button type="button">
                                <i class="fas fa-file"></i>
                                <label for="file"></label>
                                <input type="file" id="file">
                            </button>
                            <button type="button">
                                <i class="far fa-image"></i>
                                <label for="img"></label>
                                <input type="file" id="img">
                            </button>
                        </div>
                        <textarea id="coment" placeholder="Escribir mensaje"></textarea>
                        <button type="button" onclick="comentario(${id1});" class="enviar">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </form>
                  </div>
                </div>
              </div>
          </div>
  </div>
  `;
  firebase.database().ref('Chat')
  .on('value', function(snapshot){
     snapshot.forEach(function (e) {
         if(e.val().key1 == usuActual && e.val().key2 == listUser[id1].key || e.val().key2 == usuActual && e.val().key1 == listUser[id1].key){
          llenarComentarios(e.val());
         }
     });
  });
}

function llenarComentarios(datos){
  let usuActual = sessionStorage.getItem('idUsuarioActivo');
  console.log(datos);
  let comm = [];
  document.getElementById("contenedor-comentarios").innerHTML = '';
  for(let llave in datos.comentarios){
    console.log("comm", datos.comentarios[llave]);
    comm.push(datos.comentarios[llave]);
  }
  for(let i=0;i<comm.length;i++){
    let comentarios = comm[i];
    if(comentarios.key == usuActual){
      document.getElementById("contenedor-comentarios").innerHTML +=
      `
        <div class="mensaje left">
          <div class="cuerpo">
              <!--<img src="" alt="">-->
              <div class="texto">
                  ${comentarios.mensaje}
                  <span class="tiempo">
                      <i class="far fa-clock"></i>
                      Hace 6 min
                  </span>
              </div>
              <ul class="opciones-msj">
                  <li>
                      <button type="button">
                          <i class="fas fa-times"></i>
                      </button>
                  </li>
              </ul>
          </div>
          <div class="avatar">
              <img src="${comentarios.imagen}" alt="img">
          </div>
        </div>
      `;
    }else{
      document.getElementById("contenedor-comentarios").innerHTML +=
      `
      <div class="mensaje">
        <div class="avatar">
            <img src="${comentarios.imagen}" alt="img">
        </div>
        <div class="cuerpo">
            <!--<img src="" alt="">-->
            <div class="texto">
                ${comentarios.mensaje}
                <span class="tiempo">
                    <i class="far fa-clock"></i>
                    Hace 5 min
                </span>
            </div>
            <ul class="opciones-msj">
                <li>
                    <button type="button">
                        <i class="fas fa-times"></i>
                    </button>
                </li>
            </ul>
        </div>
      </div>
      `;
    }
  }
}

function comentario(id1){
  let usuActual = sessionStorage.getItem('idUsuarioActivo');
  let mensaje = document.getElementById('coment').value;
  let user1 = usuarios[usuActual];
  let user2 = usuarios[listUser[id1].key];
  let referencia = [];
  let datos = [];
  //console.log("User1: ", user1);
  //console.log("User2: ", user2);
  
  firebase.database().ref('Chat')
  .on('value', function(snapshot){
    for(let llave in snapshot.val()){
      //console.log(snapshot.val()[llave]);
      if(snapshot.val()[llave].key1 == usuActual && snapshot.val()[llave].key2 == listUser[id1].key || snapshot.val()[llave].key2 == usuActual && snapshot.val()[llave].key1 == listUser[id1].key)
      {
        referencia.push(llave);
        datos.push(snapshot.val()[llave]);
      }
    }
  });

  console.log("referencia: ", referencia[0]);
  console.log("datos: ", datos);
  console.log("datos1: ", usuActual);
  console.log("datos2: ", listUser[id1].key);

  if(datos[0].key1 == usuActual && datos[0].key2 == listUser[id1].key || datos[0].key2 == usuActual && datos[0].key1 == listUser[id1].key){
    firebase.database().ref(`Chat/${referencia[0]}/comentarios`).push(
      {
        mensaje:mensaje,
        key:usuActual,
        imagen:user1.imagen
     });
   }else{
    firebase.database().ref('Chat').push({
      key1:usuActual,
      nombre1:user1.nombre,
      apellido1:user1.apellido,
      imagen1:user1.imagen,
      key2:listUser[id1].key,
      nombre2:user2.nombre,
      apellido2:user2.apellido,
      imagen2:user2.imagen,
      comentarios:[
        {
          mensaje:mensaje,
          key:usuActual,
          imagen:user1.imagen
        }
      ]
    });
   }
   
}