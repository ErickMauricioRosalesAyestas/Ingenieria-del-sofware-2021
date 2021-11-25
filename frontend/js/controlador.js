if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
  llenarNavBarUsuario();
}else{
  llenarNavBar();
}

/*
var usuarios2 = [
    {
        id:0,
        nombre:"Pedro",
        apellido:"Martinez",
        correo:"pedro.martinez@gmail.com",
        telefono:"98124158",
        nombreUsuario:"Pedrito",
        contrasena:"pedro123",
        fecha:"1996-07-21",
        identificador:"1",
        imagen:"img/perfil/lufi.jpg",
        genero:"Masculino",
        nacionalidad:"Honduras",
        descripcion:"Ninguna",
        propuestas:[],
        reservacion:[
          {
            nombreCategoria:"Casa",
            nombre:"Casa 1",
            descripcion:"Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
            imagen:"img/propuestas/Casa/1.jpg",
            precio:"124.32"
          }
        ]
    },
    {
        id:1,
        nombre:"Mario",
        apellido:"Cruz",
        correo:"mario.cruz@gmail.com",
        telefono:"33548569",
        nombreUsuario:"Marito",
        contrasena:"mario123",
        fecha:"1995-01-21",
        identificador:"1",
        imagen:"img/perfil/goku.jpg",
        genero:"Masculino",
        nacionalidad:"Honduras",
        descripcion:"Ninguna",
        propuestas:[],
        reservacion:[
          {
            nombreCategoria:"Casa",
            nombre:"Casa 1",
            descripcion:"Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
            imagen:"img/propuestas/Casa/1.jpg",
            precio:"124.32"
          }
        ]
    },
    {
        id:2,
        nombre:"Luisa",
        apellido:"Lopez",
        correo:"luisa.lopez@gmail.com",
        telefono:"96857420",
        nombreUsuario:"Lulu",
        contrasena:"lulu123",
        fecha:"1997-07-21",
        identificador:"1",
        imagen:"img/perfil/naruto.jpg",
        genero:"Femenino",
        nacionalidad:"Honduras",
        descripcion:"Ninguna",
        propuestas:[],
        reservacion:[
          {
            nombreCategoria:"Casa",
            nombre:"Casa 1",
            descripcion:"Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
            imagen:"img/propuestas/Casa/1.jpg",
            precio:"124.32"
          }
        ]
    },
    {
      id:2,
      nombre:"Luis",
      apellido:"Lopez",
      correo:"luis.lopez@gmail.com",
      telefono:"96857420",
      nombreUsuario:"luis",
      contrasena:"luis123",
      fecha:"1997-07-21",
      identificador:"2",
      imagen:"img/perfil/naruto.jpg",
      genero:"Masculino",
      nacionalidad:"Honduras",
      descripcion:"Ninguna",
      reservacion:[
        {
          nombreCategoria:"Casa",
          nombre:"Casa 1",
          descripcion:"Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
          imagen:"img/propuestas/Casa/1.jpg",
          precio:"124.32"
        }
      ],
      propuestas:[]
    },
    {
      id:3,
      nombre:"Hugo",
      apellido:"Lopez",
      correo:"hugo@gmail.com",
      telefono:"98565475",
      nombreUsuario:"hugo",
      contrasena:"hugo123",
      fecha:"1997-07-21",
      identificador:"0",
      imagen:"img/perfil/naruto.jpg",
      genero:"Masculino",
      nacionalidad:"Honduras",
      descripcion:"Ninguna",
      reservacion:[
        {
          nombreCategoria:"Casa",
          nombre:"Casa 1",
          descripcion:"Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
          imagen:"img/propuestas/Casa/1.jpg",
          precio:"124.32"
        }
      ],
      propuestas:[]
    }
];

function guardar(){
  for(let i=0;i<usuarios2.length;i++){
        axios({
          method:'POST',
          url:'../../Proyectov1.0/backend/api/usuarios.php',
          responseType:'json',
          data:usuarios2[i]
      }).then(res=>{
          console.log(res.data);
          obtenerUsuarios();
      }).catch(error=>{
          console.error(error);
      });
  }
}
guardar();
*/

var usuarios = [];
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
        }
        console.log(usuarios);
    }).catch(error=>{
        console.error(error);
    });
}
obtenerUsuarios();

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
          <a class="nav-link disabled" aria-current="page" href="index.html">Inicio</a>
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
        <li class="nav-item">
        <button class="btn btn-outline-success" type="button" onclick="iniciar();">Iniciar Sesión</button>
         </li>
        </ul>
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
          <a class="nav-link disabled" aria-current="page" href="index.html">Inicio</a>
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
  <img id="perfil" src="${usuarios[usuar].imagen}" alt="">${usuarios[usuar].nombre} ${usuarios[usuar].apellido}
  </a>
  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
    <li><a class="dropdown-item" href="#" type="button" onclick="redireccionar();">Ver perfil</a></li>
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
//hasta aqui

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
      restablecer();
    }
  }
}

function mostrarBusqueda(contenido){
  document.getElementById("contenedor-cuerpo").innerHTML = '';
  for(let j=0; j<contenido.propuestas.length; j++){
      let propu = contenido.propuestas[j];
      document.getElementById("contenedor-cuerpo").innerHTML +=
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

function restablecer(){
  document.getElementById("contenedor-cuerpo").innerHTML = '';
  document.getElementById("contenedor-cuerpo").innerHTML +=
  `
      <div id="contenedor-cuerpo">
        <div id="eslogan">
          <h1>No Hay Nada Mejor Que El Hogar</h1>
        </div>
       <div id="contenedor-info">
       <div class="container-fluid" id="contenedor-apps">
           <div class="container text-center text-md-left mt-5">
               <!-- Grid row -->
               <div class="row mt-3 dark-grey-text">
       
                     <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                       <div class="card" style="width: 18rem;">
                           <h5 class="card-title">¿PORQUE</h5>
                           <img class="card-img-top" src="img/icons/mundo.png" alt="Card image cap">
                           <div class="card-body">
                             <h5 class="card-title">Comuidad</h5>
                             <p class="card-text">Haz nuevos amigos en las famosas HAUSHA nights</p>
                             <a href="#" style="color: white;">Leer más</a>
                           </div>
                         </div>
                     </div>
                     <!-- Grid column -->
       
                     <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                       <div class="card" style="width: 18rem;">
                           <h5 class="card-title">ELEGIR</h5>
                           <img class="card-img-top" src="img/icons/altavoz.png" alt="Card image cap">
                           <div class="card-body">
                             <h5 class="card-title">Comuidad</h5>
                             <p class="card-text">Haz nuevos amigos en las famosas HAUSHA nights</p>
                             <a href="#" style="color: white;">Leer más</a>
                           </div>
                         </div>
                     </div>
                     <!-- Grid column -->
       
                     <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                       <div class="card" style="width: 18rem;">
                           <h5 class="card-title">A</h5>
                           <img class="card-img-top" src="img/icons/seguridad.png" alt="Card image cap">
                           <div class="card-body">
                             <h5 class="card-title">Comuidad</h5>
                             <p class="card-text">Haz nuevos amigos en las famosas HAUSHA nights</p>
                             <a href="#" style="color: white;">Leer más</a>
                           </div>
                         </div>
                     </div>
                     <!-- Grid column -->
                     <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                       <div class="card" style="width: 18rem;">
                           <h5 class="card-title">HAUSHA?</h5>
                           <img class="card-img-top" src="img/icons/estrella.png" alt="Card image cap">
                           <div class="card-body">
                             <h5 class="card-title">Comuidad</h5>
                             <p class="card-text">Haz nuevos amigos en las famosas HAUSHA nights</p>
                             <a href="#" style="color: white;">Leer más</a>
                           </div>
                         </div>
                     </div>
                     <!-- Grid column -->
               </div>
           </div>      
       </div>
       <div id="contenedor-carrusel">
         <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
           <ol class="carousel-indicators">
             <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
             <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
             <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
           </ol>
           <div class="carousel-inner">
             <div class="carousel-item active">
               <img id="img-carrusel" class="d-block w-100" src="img/carrusel/1.jpg" alt="First slide">
             </div>
             <div class="carousel-item">
               <img id="img-carrusel" class="d-block w-100" src="img/carrusel/2.jpg" alt="Second slide">
             </div>
             <div class="carousel-item">
               <img id="img-carrusel" class="d-block w-100" src="img/carrusel/3.jpg" alt="Third slide">
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
       
       <div id="pregunta">
         <h1>¿Como Funciona?</h1>
       </div>
       <div class="container-fluid" id="contenedor-apps2">
       <div class="container text-center text-md-left mt-5">
           <!-- Grid row -->
           <div class="row mt-3 dark-grey-text">
               
               <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                   <div class="card" style="width: 18rem;">
                       <img class="card-img-top" src="img/icons/viviendas.png" alt="Card image cap">
                       <div class="card-body">
                         <h5 class="card-title">Comuidad</h5>
                         <p class="card-text">Haz nuevos amigos en las famosas HAUSHA nights</p>
                         <a href="#" style="color: white;">Leer más</a>
                       </div>
                     </div>
                 </div>
                 <!-- Grid column -->
       
                 <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                   <div class="card" style="width: 18rem;">
                       <img class="card-img-top" src="img/icons/formulario.png" alt="Card image cap">
                       <div class="card-body">
                         <h5 class="card-title">Comuidad</h5>
                         <p class="card-text">Haz nuevos amigos en las famosas HAUSHA nights</p>
                         <a href="#" style="color: white;">Leer más</a>
                       </div>
                     </div>
                 </div>
                 <!-- Grid column -->
       
                 <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                   <div class="card" style="width: 18rem;">
                       <img class="card-img-top" src="img/icons/contrato.png" alt="Card image cap">
                       <div class="card-body">
                         <h5 class="card-title">Comuidad</h5>
                         <p class="card-text">Haz nuevos amigos en las famosas HAUSHA nights</p>
                         <a href="#" style="color: white;">Leer más</a>
                       </div>
                     </div>
                 </div>
                 <!-- Grid column -->
                 <div id="card-cont" class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                   <div class="card" style="width: 18rem;">
                       <img class="card-img-top" src="img/icons/viaje.png" alt="Card image cap">
                       <div class="card-body">
                         <h5 class="card-title">Comuidad</h5>
                         <p class="card-text">Haz nuevos amigos en las famosas HAUSHA nights</p>
                         <a href="#" style="color: white;">Leer más</a>
                       </div>
                     </div>
                 </div>
                 <!-- Grid column -->
           </div>
       </div>
       </div>
       </div>
      </div>
  `;
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