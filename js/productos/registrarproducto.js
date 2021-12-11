/**
 * autor Lorena Navas
 * escrito 10/12/2021
 * Universidad Sergio Arboleda
 */

const errores = document.getElementsByClassName("err");



function activaNuevo() {
    $("#nuevo").show(500);
    $("#editar").hide();
    $("#nuevoRegistro").hide(500)
    $("#listado").hide(500);
    const errores = document.getElementsByClassName("err");
    errores[0].style.display = "none";
    errores[1].style.display = "none";
    errores[2].style.display = "none";
    errores[3].style.display = "none";
    errores[4].style.display = "none";
    errores[5].style.display = "none";
    errores[6].style.display = "none";
    errores[7].style.display = "none";
    errores[8].style.display = "none";
    $("#inputReference").focus();
}



function registrar() {
    let datos = {
        reference: $("#inputReference").val(),
        brand: $("#inputBrand").val(),
        category: $("#inputCategory").val(),
        objetivo: $("#inputObjetive").val(),
        description: $("#inputDescription").val(),
        availability: $("#inputAvailability").val(),
        price: $("#inputPrice").val(),
        quantity: $("#inputQuantity").val(),
        photography: $("#inputImage").val()
    }
    if (validar()) {
        let datosPeticion = JSON.stringify(datos);
        $.ajax({
            url: "http://144.22.232.221:8081/api/supplements/new",
            data: datosPeticion,
            type: 'POST',
            contentType: "application/JSON",
            success: function (respuesta) {
                console.table(respuesta);
                $("#mensajes").show(1000);
                $("#mensajes").html("Registro ingresado...");
                $("#mensajes").hide(1000);
                listar();
                estadoInicial();
            },
            error: function (xhr, status) {
                $("#mensajes").show(1000);
                $("#mensajes").html("Error peticion POST..." + status);
            }
        });
    }
}



function validar() {
    let reference = $("#inputReference").val();
    let brand =  $("#inputBrand").val();
    let category =  $("#inputCategory").val();
    let objetivo = $("#inputObjetive").val();
    let description= $("#inputDescription").val();
    let availability = $("#inputAvailability").val();
    let price = $("#inputPrice").val();
    let quantity= $("#inputQuantity").val();
    let photography= $("#inputImage").val();
    if (validaesVacio(reference)) {
        errores[0].style.display = "block";
        $("#inputReference").focus();
        return false;
    } else if (validaesVacio(brand)) {
        errores[1].style.display = "block";
        $("#inputBrand").focus();
        return false;
    } else if (validaesVacio(category)) {
        errores[2].style.display = "block";
        $("#inputCategory").focus();
        return false;
    } else if (validaesVacio(objetivo)) {
        errores[3].style.display = "block";
        $("#inputObjetive").focus();
        return false;
    } else if (validaesVacio(description)) {
        errores[4].style.display = "block";
        $("#inputDescription").focus();
        return false;
    } else if (validaesVacio(availability)) {
        errores[5].style.display = "block";
        $("#inputAvailability").focus();
        return false;
    } else if (validaesVacio(price)) {
        errores[6].style.display = "block";
        $("#inputPrice").focus();
        return false;
    } else if (validaesVacio(quantity)) {
        errores[7].style.display = "block";
        $("#inputQuantity").focus();
        return false;
    } else if (validaesVacio(photography)) {
        errores[8].style.display = "block";
        $("#inputImage").focus();
        return false;
    }

    return true;
}


$("#inputReference").click(function () {
    errores[0].style.display = "none";
});
$("#inputBrand").click(function () {
    errores[1].style.display = "none";
});
$("#inputinputCategoryEmail").click(function () {
    errores[2].style.display = "none";
});
$("#inputObjetive").click(function () {
    errores[3].style.display = "none";
});
$("#inputDescription").click(function () {
    errores[4].style.display = "none";
});
$("#inputAvailability").click(function () {
    errores[5].style.display = "none";
});
$("#inputPrice").click(function () {
    errores[6].style.display = "none";
});
$("#inputQuantity").click(function () {
    errores[7].style.display = "none";
});
$("#inputImage").click(function () {
    errores[8].style.display = "none";
});