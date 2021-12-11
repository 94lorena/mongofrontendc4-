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
    $("#register").click(function () {
        if (validar()){
            register();
        }
    });
    $("#inputName").click(function () {
        errores[0].style.display = "none";
    });
    $("#inputEmail").click(function () {
        errores[1].style.display = "none";
    });
    $("#inputPassword").click(function () {
        errores[2].style.display = "none";
    });
});



function estadoInicial() {
    $("#alerta").hide();
    errores[0].style.display = "none";
    errores[1].style.display = "none";
    errores[2].style.display = "none";
    $("#inputName").focus();
}



function validar() {
    let inputName = $("#inputName").val();
    let inputEmail = $("#inputEmail").val();
    let inputPassword = $("#inputPassword").val();
    if (validaesVacio(inputName)) {
        errores[0].style.display = "block";
        $("#inputName").focus();
        return false;
    }else if (validaesVacio(inputEmail)) {
        errores[1].style.display = "block";
        $("#inputEmail").focus();
        return false;
    } else if (!ValidateEmail(inputEmail)) {
        errores[1].style.display = "block";
        $("#inputEmail").focus();
        return false;
    } else if (validaesVacio(inputPassword)) {
        errores[2].style.display = "block";
        $("#inputPassword").focus();
        return false;
    }
    return true;
}



function register(){
    let datos = {
        email: $("#inputEmail").val(),
        password: $("#inputPassword").val(),
        name: $("#inputName").val()
    }
    let datosPeticion = JSON.stringify(datos);
    $.ajax({
        url: `http://144.22.232.221:8081/api/user/new`,
        data: datosPeticion,
        type: 'POST',
        contentType: "application/JSON",
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
        $("#inputName").focus();
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
    }
}
