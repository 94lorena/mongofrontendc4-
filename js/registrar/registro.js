/**
 * autor Lorena Navas
 * escrito 26/11/2021
 * Universidad Sergio Arboleda
 */

$(document).ready(function () {
    estadoInicial()
});



function registrar(){
    let name = $("#username").val()
    let email = $("#useremail").val()
    let password = $("#password").val()
    let repeatpassword = $("#passwordrepeat").val()
    let datos={
        email : $("#useremail").val(),
        password : $("#password").val(),
        name : $("#username").val()
    }
    let datosPeticion = JSON.stringify(datos)
    $.ajax({
        //url del servicio
        url: "http://144.22.232.221:8081/api/user/new",
        data: datosPeticion,
        type: 'POST',
        contentType: "application/JSON",
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            resultado(respuesta)	
        },


        error: function (xhr, status) {
            console.log("algo fallo");	
        },
        complete: function (xhr, status) {
            console.log("Todo super bien"  + status);
        }
    });
}



function resultado(respuesta){
    let id = respuesta.id
    let nombre= respuesta.name
    if (id==null)
        alert("Usuario no registrado : " + nombre)
    else
        alert("Bienvenido : " + id + " "+ nombre)
}


function estadoInicial(){
    $("#username").focus()
}
$(document).ready(function () {
    estadoInicial()
});



function registrar(){
    let name = $("#username").val()
    let email = $("#useremail").val()
    let password = $("#password").val()
    let repeatpassword = $("#passwordrepeat").val()
    let datos={
        email : $("#useremail").val(),
        password : $("#password").val(),
        name : $("#username").val()
    }
    let datosPeticion = JSON.stringify(datos)
    $.ajax({
        url: "http://144.22.232.221:8081/api/user/new",
        data: datosPeticion,
        type: 'POST',
        contentType: "application/JSON",
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            resultado(respuesta)	
        },
        error: function (xhr, status) {
            //$("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);		
            console.log("Error");	
        },
        complete: function (xhr, status) {
            console.log("Correcto"  + status);
        }
    });
}



function resultado(respuesta){
    let id = respuesta.id
    let nombre= respuesta.name

    if (id==null)
        alert("Usuario no registrado : " + nombre)
    else
        alert("Bienvenido : " + id + " "+ nombre)

}



function estadoInicial(){
    $("#username").focus()
}

