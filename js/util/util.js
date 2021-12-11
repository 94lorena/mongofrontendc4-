/**
 * autor Lorena Navas
 * escrito 10/12/2021
 * Universidad Sergio Arboleda
 */



function upperCaseF(campo) {
    setTimeout(function () {
        campo.value = campo.value.toUpperCase();
    }, 1);
}



function validaesVacio(dato){
    return !dato.trim().length;
}



function ValidateEmail(valor) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return valor.match(mailformat);
}



function infoUsuario() {

    let user = sessionStorage.getItem("user");
    if (user == null) location.href = "index.html";
    else {
        let userJS = JSON.parse(user);
        let typeUser;
        if (userJS.type=='ASE')
            location.href= "index.html";
        else if (userJS.type=='ADM')
            typeUser="ADMINISTRADOR";
        else if (userJS.type=='COORD')
            location.href= "index.html";
        $("#userName").html(userJS.name);
        $("#userEmail").html(userJS.email);
        $("#userType").html(typeUser);
        $("#titulo").html("Bienvenido(a): " + userJS.name);    
    }
}