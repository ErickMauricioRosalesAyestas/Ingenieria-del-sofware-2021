if(sessionStorage.getItem('identificadorUsuario') == 0){
    llenarNavBarUsuario();
    window.location.href = 'superAdministrador.html';
}else if(sessionStorage.getItem('identificadorUsuario') == 1){
    llenarNavBarUsuario();
    window.location.href = 'usuario.html';
}
else if(sessionStorage.getItem('identificadorUsuario') == 2){
    llenarNavBarUsuario();
    window.location.href = 'administrador.html';
}
else{
    llenarNavBar();
}

var identificador;
var usuarios = [];
const url = '../../Proyectov1.0/backend/api/usuarios.php';
function obtenerUsuarios(){
    axios({
        method:'GET',
        url:url,
        responseType:'json'
    }).then(res=>{
        this.usuarios = res.data;
    }).catch(error=>{
        console.error(error);
    });
}
obtenerUsuarios();

function validarCredenciales(pCorreo, pContraseña){
    var bAcceso = false;
    for(const usu in usuarios){
        if(usuarios[usu].correo == pCorreo && usuarios[usu].contrasena == pContraseña){
            bAcceso = true;
            identificador = usu;
            let nom = usuarios[usu].nombre + ' ' + usuarios[usu].apellido;
            let ident = true;
            let idUsu = usu;
            sessionStorage.setItem('usuarioActivo', nom);
            sessionStorage.setItem('rolUsuarioActivo', ident);
            sessionStorage.setItem('idUsuarioActivo', idUsu);
            sessionStorage.setItem('identificadorUsuario', usuarios[usu].identificador);
        }
    }

    return bAcceso;
}

function iniciarSesion(){
    var sCorreo = '';
    var sContraseña = '';
    var bAcceso = false;

    sCorreo = document.querySelector('#txtcorreo').value;
    sContraseña = document.querySelector('#txtcontrasena').value;
    bAcceso = validarCredenciales(sCorreo, sContraseña);
    
    if(bAcceso == true){
        if(usuarios[identificador].identificador == 0){
            window.location.href = 'superAdmnistrador.html';
        }else if(usuarios[identificador].identificador == 1){
            window.location.href = 'usuario.html';
        }else if(usuarios[identificador].identificador == 2){
            window.location.href = 'administrador.html';
        }
    }else{
        window.alert("El usuario || contraseña no coinciden");
    }
}

function validarRegistro(){
    var nombre,apellido,correo,contrasena,fecha,imagen,nombreUsuario,telefono;
        nombre=document.getElementById('nombre').value,
        apellido=document.getElementById('apellido').value,
        correo=document.getElementById('correo').value,
        telefono=document.getElementById('telefono').value,
        nombreUsuario=document.getElementById('nombreUsuario').value,
        contrasena=document.getElementById('contrasena').value,
        fecha=document.getElementById('fecha').value,
        imagen=document.getElementById('lista-imagenes').value,
    
    expresion = /\w+@\w+\.+[a-z]/;
    
    if(nombre === "" || apellido === "" || correo==="" || telefono === "" || nombreUsuario == "" || contrasena === "" || fecha === "" || imagen === ""){
        alert("todos los campo son obligatorios");
        return false;
    }
    else if(nombre.length>20){
        alert("El nombre es muy largo");
        return false;
    }
    else if(apellido.length>30){
        alert("El apellido es muy largo");
        return false;
    }else if(correo.length>40){
        alert("El email es muy largo");
        return false;
    }
    else if(!expresion.test(correo)){
        alert("El email no es válido");
        return false;
    }else if(nombreUsuario.length>30 || contrasena.length>20){
        alert("El nombre es muy largo");
        return false;
    }else if(telefono.length>10){
        alert("El telefono es muy largo");
        return false;
    }else if(isNaN(telefono)){
        alert("El telefono ingresado no es un número");
        return false;
    }else{
        return true
    }
}

function crearUsuarioCliente(){
    let mail = document.getElementById('correo').value;
    let contador = 0;
    let filtro = [];
    for(const usu in usuarios){
        filtro.push(usuarios[usu]);
        contador++;
    }
    const resultado = filtro.filter(usuarios => usuarios.correo == mail);
    console.log(resultado);
    if(resultado.length == 1){
        window.alert("El correo que escribio ya existe");
    }else{
        let estado = false;
        estado = validarRegistro();
        if(estado == true){
        console.log(contador);
        const cliente = {
            id: contador,
            nombre:document.getElementById('nombre').value,
            apellido:document.getElementById('apellido').value,
            correo:document.getElementById('correo').value,
            telefono:document.getElementById('telefono').value,
            nombreUsuario:document.getElementById('nombreUsuario').value,
            contrasena:document.getElementById('contrasena').value,
            fecha:document.getElementById('fecha').value,
            nacionalidad:document.getElementById('lista-nacionalidad').value,
            genero:document.getElementById('lista-genero').value,
            imagen:document.getElementById('lista-imagenes').value,
            reservacion:[],
            propuestas:[],
            identificador:1,
            descripcion:"Ninguna"
        }
            axios({
            method:'POST',
            url:url,
            responseType:'json',
            data:cliente
        }).then(res=>{
            console.log(res.data);
            obtenerUsuarios();
            $("#modalRegistro .close").click()
            window.alert("Usuario registrado con exito");
        }).catch(error=>{
            console.error(error);
        });
        }
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
          <a class="nav-link active" aria-current="page" href="habitaciones.html">Propuestas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="contactanos.html">Contáctanos</a>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-success disabled" type="button" onclick="">Iniciar Sesión</button>
        </li>
    </ul>
    `;
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
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img id="perfil" src="img/perfil.png" alt="">Perfil
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

