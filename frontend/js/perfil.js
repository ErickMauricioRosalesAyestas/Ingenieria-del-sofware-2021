if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
  llenarNavBarUsuario();
}else{
  llenarNavBar();
  window.location.href = 'registro.html';
}

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
        llenarPerfil();
        llenarPropuestas();
        console.log(usuarios);
    }).catch(error=>{
        console.error(error);
    });
}
window.onload = obtenerUsuarios();

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

function llenarPerfil(){
  let user = sessionStorage.getItem('idPerfilUsuario');
  let usuar = usuarios[user];
  console.log("Usuario: ", usuar);
  document.getElementById("imgPerfil").innerHTML = '';
  document.getElementById("imgPerfil").innerHTML += 
  `
        <img src="${usuar.imagen}" alt="img-avatar">
        <button type="button" class="boton-avatar">
          <i class="far fa-image"></i>
        </button>
  `;
  document.getElementById("perfilDatos").innerHTML += 
  `
    <h3 class="titulo">${usuar.nombre} ${usuar.apellido}</h3>
    <p class="texto">${usuar.descripcion}</p>
  `;
  document.getElementById("perfilContenedor1").innerHTML += 
  `
    <li><i class="icono fas fa-user-check"></i>Nombre de usuario: ${usuar.nombreUsuario}</li>
    <li><i class="icono fas fa-map-marker-alt"></i>Nacionalidad: ${usuar.nacionalidad}</li>
    <li><i class="icono fas fa-phone-alt"></i>Telefono: ${usuar.telefono}</li>
    <li><i class="icono fas fa-user-check"></i>Genero: ${usuar.genero}</li>
  `;
  document.getElementById("perfilContenedor2").innerHTML += 
  `
    <li><i class="icono fas fa-share-alt"></i>Correo: ${usuar.correo}</li>
    <li><i class="icono fas fa-calendar-alt"></i>Fecha nacimiento: ${usuar.fecha}</li>
  `;
}

function llenarPropuestas(){
  let usuActual = sessionStorage.getItem('idPerfilUsuario');
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
                              <h4>$${usu.precio}</h4>
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
    document.getElementById("contenedor-acciones").innerHTML = '';
    document.getElementById("contenedor-acciones").innerHTML +=
      `
        <div id="propuestas">
          <div class="card">
            <p>No tiene propuestas en este momento</p>
          </div>
        </div>
        `;
  }
}


