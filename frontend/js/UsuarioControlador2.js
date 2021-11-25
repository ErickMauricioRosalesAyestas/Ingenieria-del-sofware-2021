if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
    llenarNavBarUsuario();
}else{
    llenarNavBar();
}

var localStorage = window.localStorage;
//Codigo para generar información de categorias y almacenarlas en un arreglo.

var catego = 
  [
      {nombre:"Nicol"},{nombre:"Yillian"},{nombre:"Aaron"},{nombre:"Mauricio"},
      {nombre:"Joaquin"},{nombre:"Andrea"}
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
      for (let j=0;j<5;j++){//Generar 10 apps por categoria
          let pre = (Math.random() * (500 - 1) + 1).toFixed(2);
          let propuesta = {
              codigo:contador,
              nombre: catego[i].nombre + ' ' + contador,
              descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
              calificacion:Math.floor(Math.random() * (5 - 1)) + 1,
              precio: pre,
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

if(localStorage.getItem("categorias")==null){
    localStorage.setItem("categorias",JSON.stringify(categorias));
}else{
    usuarios = JSON.parse(localStorage.getItem('categorias'));
}

function generarCategorias()
{
    document.getElementById("eslogan").innerHTML = '';
    document.getElementById("eslogan").innerHTML += 
    `
    <h1>Usuarios</h1>
    <h6>En este espacio se podra crear nuevos administradores, bloquear cuentas, dar permiso a administradores</h6>
    `;
    document.getElementById("contenedor").innerHTML = '';
    document.getElementById("contenedor").innerHTML +=
    `
    <div class="card">
        <div  class="card-header" style="background-color: white;">
          <h3>Nuestros Usuarios</h3><hr>
          <div class="row form-group">
                  <input class="col-lg-3 ml-auto" type="date" placeholder="Entrada">
                  <input class="col-lg-3 ml-auto" type="date" placeholder="Salida">
                  <select id="SeleccionarCategoria" class="col-lg-3 ml-auto" onchange="SeleccionarCategoria()">
                  </select>
                  <button class="btn btn-primary col-lg-3 ml-auto" type="submit">Buscar</button>
          </div>
        </div>
    </div>
    `;
    document.getElementById("usuarios").innerHTML = '';
    for(let i=0; i<categorias.length;i++){
        let cate = categorias[i];
        for(let j=0;j<cate.usuarios.length;j++){
            let pro = cate.usuarios[j];
            document.getElementById("usuarios").innerHTML +=
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
                                 <img src="img/1.jpg" alt="">
                                 <img src="img/2.jpg" alt="">
                                 <img src="img/3.jpg" alt="">
                                 <img src="img/5.jpg" alt="">
                                 <img src="img/6.jpg" alt=""><br>
                                 <div>
                                    <p>Desde</p>
                                    <h4>$${pro.calificacion}</h4>
                                    <button type="submit" onclick="informacion(${i},${j});" class="btn btn-primary">Mas informacion</button>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}
generarCategorias();

function generarSelect(){
  document.getElementById("SeleccionarCategoria").innerHTML = '';
  for(let i=0; i<categorias.length; i++){
      document.getElementById("SeleccionarCategoria").innerHTML += 
              `<option value="${i}">${categorias[i].nombreCategoria}</option> 
              `;
  }
  document.getElementById("SeleccionarCategoria").value = null;
}
generarSelect();

function SeleccionarCategoria(){
  let local = JSON.parse(localStorage.getItem("categorias"));
  var us = document.getElementById('SeleccionarCategoria');
  var usu = document.getElementById('SeleccionarCategoria').value;
  console.log(usu);
  usuarioSeleccionado = usu;
  var select = us.options[us.selectedIndex].text;
  console.log(select);
  posicion = usu;

  document.getElementById('usuarios').innerHTML = '';
  for(let j=0; j<local[usu].usuarios.length; j++){
      let usua = local[usu].usuarios[j];
      document.getElementById("usuarios").innerHTML +=
      `
          <div class="card">
              <div class="card-body">
                  <div class="row form-group">
                      <div class="col-lg-8 ml-auto">
                           <img id="izquierda" src="${usua.imagen}" alt="">
                      </div>
                      <div id="derecha" class="col-lg-4">
                           <h3>HAUSHA ${usua.nombre}</h3


                           <p id="tex" class="card-title">${usua.descripcion}</p>
                                 <img src="img/1.jpg" alt="">
                                 <img src="img/2.jpg" alt="">
                                 <img src="img/3.jpg" alt="">
                                 <img src="img/5.jpg" alt="">
                                 <img src="img/6.jpg" alt=""><br>
                                 <div>
                        
                              <p>Desde</p>
                              <h4>$${usua.calificacion}</h4>
                              <button type="submit" onclick="informacion(${usu},${j});" class="btn btn-primary">Mas informacion</button>
                           </div>
                      </div>
                  </div>
              </div>
          </div>
      `;
  }
  
}

function informacion(id1,id2){
    let cateActual = categorias[id1].usuarios[id2];
    document.getElementById("eslogan").innerHTML = '';
    document.getElementById("eslogan").innerHTML += 
    `
    <h1>Información</h1>
    <h6>En este espacio se podra crear nuevos administradores, bloquear cuentas, dar permiso a administradores</h6>
    `;
    
    document.getElementById("contenedor").innerHTML = '';
    document.getElementById("usuarios").innerHTML = '';
    document.getElementById("usuarios").innerHTML +=
    `
    <div class="card">
        <div style="display: flex; align-items: start; align-content: start;"  class="card-header" style="background-color: white;">
          <h3><button onclick="generarCategorias();" type="submit" class="btn btn-primary">Atras</button> | HAUSHA ${cateActual.nombre}</h3>
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
                     <h4>$${cateActual.calificacion}</h4>
                     <p>Por noche</p>
                     <input id="cont-date" type="date" placeholder="Entrada">
                     <input id="cont-date" type="date" placeholder="Salida">
                     <input id="cont-date" type="number" placeholder="Adultos">
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
          <p>${categorias[id1].nombreCategoria}</p>
        </div>
        <div class="col-lg-4">
          <p>Aloja: 1</p>
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
  <div id="maps">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61521.126963597715!2d-86.62179072400676!3d15
    .480643065906934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f696ca951e8fff9%3A0x99fba16f3251f51c!2sOl
    anchito!5e0!3m2!1ses!2shn!4v1634084123258!5m2!1ses!2shn" width="400" height="300" style="border:0;" 
    allowfullscreen="" loading="lazy"></iframe>
  </div>
    </div>
  </div>
    `;
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
    llenarNavBar();
}


function crearReservacion(id1, id2){
  if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
    let reservaActual = categorias[id1].propuestas[id2];
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    let usuActual = JSON.parse(sessionStorage.getItem('idUsuarioActivo'));
    const reserva = {
        nombreCategoria:categorias[id1].nombreCategoria,
        nombre:reservaActual.nombre,
        descripcion:reservaActual.descripcion,
        imagen:reservaActual.imagen,
        precio:reservaActual.precio
    }
    
        usuarios[usuActual].reservacion.push(reserva);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        window.alert("Su reservación a sido exitosa.");
        generarCategorias();
        generarSelect();
  }else{
    window.alert("Inicie sesion primero");
  }
       
}