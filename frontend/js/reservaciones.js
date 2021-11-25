if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
    llenarNavBarUsuario();
}else{
    llenarNavBar();
    window.location.href = 'registro.html';
}

var usuarios = [];
const url = '../../Proyectov1.0/backend/api/usuarios.php';
function obtenerUsuarios(){
    axios({
        method:'GET',
        url:url,
        responseType:'json'
    }).then(res=>{
        this.usuarios = res.data;
        console.log(usuarios);
        generarReservaciones();
    }).catch(error=>{
        console.error(error);
    });
}
obtenerUsuarios();

function llenarNavBar(){
    document.getElementById("navbar-form").innerHTML = '';
    document.getElementById("navbar-form").innerHTML +=
    `
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link disabled" aria-current="page" href="index.html">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="nosotros.html">Nosotros</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="habitaciones.html">Propuestas</a>
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
              <a class="nav-link active" aria-current="page" href="habitaciones.html">Propuestas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Contáctanos</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img id="perfil1" src="img/perfil.png" alt="">Perfil
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="perfil.html">Editar Perfil</a></li>
                <li><a class="dropdown-item" href="reservaciones.html">Reservaciones</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a type="button" class="dropdown-item" onclick="cerrarSesion();">Cerrar Sesion</a></li>
              </ul>
            </li>
        </ul>
    `;
}

function cerrarSesion(){
    sessionStorage.clear();
    window.location.href = 'registro.html';
}

function generarReservaciones(){
  let usuActual = sessionStorage.getItem('idUsuarioActivo');
  if(usuarios[usuActual].reservacion){
    document.getElementById("eslogan").innerHTML = '';
    document.getElementById("eslogan").innerHTML += 
    `
    <h1>Reservaciones</h1>
    <h6>En este espacio encontraras todas tus reservaciones disponibles</h6>
    `;
    document.getElementById("contenedor").innerHTML = '';
    console.log(usuarios[usuActual].reservacion.length);
    for(let i=0;i<usuarios[usuActual].reservacion.length;i++){
      let reser = usuarios[usuActual].reservacion[i];
      document.getElementById("contenedor").innerHTML +=
      `
          <div class="card">
          <div style="display: flex; align-items: start; align-content: start;"  class="card-header" style="background-color: white;">
              <h3>HAUSHA ${reser.nombre}</h3>
          </div>
              <div class="card-body">
                  <div class="row form-group">
                      <div class="col-lg-8 ml-auto">
                           <img id="izquierda" src="${reser.imagen}" alt="">
                      </div>
                      <div id="derecha" class="col-lg-4">
                           <h3>HAUSHA Col. ${reser.nombre}</h3>
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
    }
  }else{
    document.getElementById("eslogan").innerHTML = '';
    document.getElementById("eslogan").innerHTML += 
    `
    <h1>Reservaciones</h1>
    <h6>En este momento no cuentas con reservaciones</h6>
    `;
  }
}
