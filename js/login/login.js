/**
 * autor Lorena Navas
 * escrito 10/12/2021
 * Universidad Sergio Arboleda
 */



const errores = document.getElementsByClassName("err");
const alerta = document.getElementById("alerta");
const mensaje = document.getElementById("mensaje");



$(document).ready(function () {
    estadoInicial();
    $("#autenticate").click(function () {
        if (validar()){
            autenticate();
        }
    });
    $("#inputEmail").click(function () {
        errores[0].style.display = "none";
    });
    $("#inputPassword").click(function () {
        errores[1].style.display = "none";
    });
});



function estadoInicial() {
    $("#alerta").hide();
    errores[0].style.display = "none";
    errores[1].style.display = "none";
    $("#inputEmail").focus();
}



function validar() {
    let inputEmail = $("#inputEmail").val();
    let inputPassword = $("#inputPassword").val();
    if (validaesVacio(inputEmail)) {
        errores[0].style.display = "block";
        $("#inputEmail").focus();
        return false;
    } else if (!ValidateEmail(inputEmail)) {
        errores[0].style.display = "block";
        $("#inputEmail").focus();
        return false;
    } else if (validaesVacio(inputPassword)) {
        errores[1].style.display = "block";
        $("#inputPassword").focus();
        return false;
    }
    return true;
}



function autenticate(){
    let inputEmail = $("#inputEmail").val();
    let inputPassword = $("#inputPassword").val();
    $.ajax({
        url: `http://144.22.232.221:8081/api/user/${inputEmail}/${inputPassword}`,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.table(respuesta);
            gestionaResultado(respuesta);
        },
        error: function (xhr, status) {
            $("#alerta").show();
            $("#mensaje").html("Ocurrio un problema al ejecutar la petición..." + status);
        }
    });
}



function gestionaResultado(respuesta){

    if (respuesta.id==null){
        $("#alerta").show();
        $("#mensaje").html("Usuario no registrado, por favor valide credenciales de acceso...");
        $("#inputEmail").focus();
    }else{
        let userJS ={
            id:respuesta.id,
            identification: respuesta.identification,
            name:respuesta.name,
            address:respuesta.address,
            cellPhone:respuesta.cellPhone,
            email:respuesta.email,
            password:respuesta.password,
            zone:respuesta.zone,
            type:respuesta.type
        };
        let user = JSON.stringify(userJS);
        sessionStorage.setItem("user",user);
        location.href="menu.html";
        $("#alerta").show();
        $("#mensaje").html("Bienvenido(a) " + userJS.name);
        $("#inputEmail").focus();
    }
}
