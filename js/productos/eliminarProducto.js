/**
 * autor Lorena Navas
 * escrito 10/12/2021
 * Universidad Sergio Arboleda
 */



function mostrarEliminar(reference,infproducto){
    $("#nuevo").hide();
    $("#editar").hide();
    $("#listado").hide();
    $("#nuevoRegistro").hide();
    $("#titleIdDelete").html("Desea eliminar el producto con la referncia: " + reference + " ?...");    
    $("#idDelete").val(reference);
    $("#productDelete").html(infproducto);
    $("#eliminar").show(1000);
}



function borrarRegistro(llaveRegistro) {
    let datos={
        reference: llaveRegistro
    }
    let datosPeticion = JSON.stringify(datos);
    $.ajax({
        url: "http://144.22.232.221:8081/api/accessory/" + llaveRegistro,
        data : datosPeticion,
        type: 'DELETE',
        contentType:"application/JSON",
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            $("#mensajes").show(1000);
            $("#mensajes").html("Registro eliminado...");
            $("#mensajes").hide(1000);
            listar();
            estadoInicial();
        },
        error: function (xhr, status) {
            $("#mensajes").html("No es posible eliminar el producto, por favor verifique...");
            $("#mensajes").show(1000);
        }
    });
}