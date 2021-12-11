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
        url: "http://144.22.232.221:8081/api/supplements/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            listarProductos(respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);
            //$("#mensajes").hide(1000);
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            $("#mensajes").html("Obteniendo listado productos...");
            $("#mensajes").hide(1000);
        }
    });
}



function listarProductos(items){
    $("#listado").html("");
    $("#listado").show(500);

    let tabla = `<table class="table table-bordered border-primary mt-5">
                <thead>
                <tr>
                    <th>Referencia</th>
                    <th>Categoría</th>
                    <th>Marca</th>
                    <th>Descripción</th>
                    <th>Disponibilidad</th>
                    <th>Precio</th>
                    <th colspan="2">Acciones</th>
                </tr>`;
    console.log(items);
    for (let index = 0; index < items.length; index++) {
        let texto = `<strong>Referencia:</strong> ${items[index].reference}</br><strong>Descripción:</strong> ${items[index].description}`;
        tabla +=`<tr>
                    <td>${items[index].reference}</td>
                    <td>${items[index].category}</td>
                    <td>${items[index].brand}</td>
                    <td>${items[index].description}</td>
                    <td>${items[index].availability}</td>
                    <td>${items[index].price}</td>
                    <td><button class="btn btn-primary text-center" onclick="editarRegistro(${items[index].reference})">Editar</button></td>
                    <td><button class="btn btn-danger text-center" onclick="mostrarEliminar('${items[index].reference}','${texto}')">Borrar</button></td>
                    </td>
                    </tr>`;     
    }
    tabla +=`</thead></table>`;
    $("#listado").html(tabla);
}



function estadoInicial(){
    $("#alerta").hide();
    $("#nuevo").hide();
    $("#editar").hide();
    $("#eliminar").hide(); 
    $("#idDelete").hide();
    $("#nuevoRegistro").show(500)
    $("#listado").show(500);
    infoUsuario();
}