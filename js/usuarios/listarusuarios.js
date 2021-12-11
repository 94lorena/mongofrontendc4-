/**
 * autor Lorena Navas
 * escrito 10/12/2021
 * Universidad Sergio Arboleda
 */



$(document).ready(function () {
    estadoInicial();
    listar();
});



function listar() {
    $.ajax({
        url: "http://144.22.232.221:8081/api/user/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            listarUsuarios(respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);
            //$("#mensajes").hide(1000);
        },
        complete: function (xhr, status) {
            $("#mensajes").html("Obteniendo listado productos...");
            $("#mensajes").hide(1000);
        }
    });
}



function listarUsuarios(items){
    $("#listado").html("");
    $("#listado").show(500);
    let tabla = `<table class="table table-bordered border-primary mt-5">
                <thead>
                <tr>
                    <th>Identificación</th>
                    <th>Nombres</th>
                    <th>Email</th>
                    <th>Zona</th>
                    <th>Tipo</th>
                    <th colspan="2">Acciones</th>
                </tr>`;
    console.log(items);
    for (let index = 0; index < items.length; index++) {
        let texto = `<strong>Identificación:</strong> ${items[index].identification}</br><strong>NOmbre:</strong> ${items[index].name}`;
        tabla +=`<tr>
                <td>${items[index].identification}</td>
                    <td>${items[index].name}</td>
                    <td>${items[index].email}</td>
                    <td>${items[index].zone}</td>
                    <td>${items[index].type}</td>
                    <td><button onclick="editarRegistro(${items[index].id})">Editar</button></td>
                    <td><button onclick="mostrarEliminar('${items[index].id}','${texto}')">Borrar</button></td>
                    </td>
                </tr>`;     
    }
    tabla +=`</thead></table>`;
    $("#listado").html(tabla);
}



function estadoInicial(){
    $("#nuevo").hide();
    $("#editar").hide();
    $("#listado").show(500);
    $("#nuevoRegistro").show(500)
    $("#eliminar").hide(); 
    $("#idDelete").hide();
    //limpia el contenido de los campos del formulario nuevo
    /* $("#brand").val(""),
    $("#year").val(""),
    $("#category").val(""),
    $("#description").val(""),
    $("#name").val("") */
    //ejecuta función para enviar petición al ws
    //listar();
}