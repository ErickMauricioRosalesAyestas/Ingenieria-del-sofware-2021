function validarRegistro(){
var name,apellido,email,nombreUsuario,password,telefono;

name= document.getElementById("name").value;
apellido= document.getElementById("apellido").value;
email= document.getElementById("email").value;
nombreUsuario= document.getElementById("nombreUsuario").value;
password= document.getElementById("password").value;
telefono= document.getElementById("telefono").value;

expresion = /\w+@\w+\.+[a-z]/;

if(name === "" || apellido === "" || email==="" || nombreUsuario === "" || password === "" || telefono===""){
    alert("todos los campo son obligatorios");
    return false;
}
else if(name.length>20){
    alert("El nombre es muy largo");
    return false;
}
else if(apellido.length>30){
    alert("El apellido es muy largo");
    return false;
}else if(email.length>40){
    alert("El email es muy largo");
    return false;
}
else if(!expresion.test(email)){
    alert("El email no es válido");
    return false;
}else if(nombreUsuario.length>30 || password.length>20){
    alert("El nombre es muy largo");
    return false;
}else if(telefono.length>10){
    alert("El telefono es muy largo");
    return false;
}else if(isNaN(telefono)){
    alert("El telefono ingresado no es un número");
    return false;
}
}