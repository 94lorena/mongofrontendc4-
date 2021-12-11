/**
 * autor Lorena Navas
 * escrito 10/12/2021
 * Universidad Sergio Arboleda
 */



let productos = [];
let productosSeleccionados = [];
let cantidades = [];
let cantidadesProducto = [];


$(document).ready(function () {
    estadoInicial();
    listar();
});



function listar() {
    $.ajax({
        url: "http://144.22.232.221:8081/api/accessory/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            listarProductos(respuesta);
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



function listarProductos(items){
    $("#listado").html("");
    $("#listado").show(500);
    productos = items;
    let tabla = `<table class="table table-bordered border-primary">
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
    console.table(items);
    for (let index = 0; index < items.length; index++) {
        let texto = `<strong>Referencia:</strong> ${items[index].reference}</br><strong>Descripción:</strong> ${items[index].description}`;
        let availability = items[index].availability ? 'SI':'NO';
        tabla +=`<tr>
                <td>${items[index].reference}</td>
                <td>${items[index].category}</td>
                <td>${items[index].brand}</td>
                <td>${items[index].description}</td>
                <td>${availability}</td>
                <td>${items[index].price}</td>
                <td><input type="number" id="prod_${items[index].reference}"/></td>
                <td><button id="bot_${items[index].reference}" onclick="registrarproducto('${index}')">Agregar</button></td>
                </td>
                </tr>`;     
    }
    tabla +=`</thead></table>`;
    $("#listado").html(tabla);
}



function estadoInicial(){
    let user = sessionStorage.getItem("user");
    if (user== null)
        location.href="index.html";
    else{
        let userJS = JSON.parse(user);
        let typeUser;
        if (userJS.type=='ASE')
            typeUser="ASESOR";
        else if (userJS.type=='ADM')
            typeUser="ADMINISTRADOR";
        else if (userJS.type=='COORD')
            typeUser="COORDINADOR";
        $("#nameUser").html(userJS.name);
        $("#emailUser").html(userJS.email);
        $("#typeUser").html(typeUser);
    }
    $("#nuevo").hide();
    $("#editar").hide();
    $("#listado").show(500);
    $("#nuevoRegistro").show(500)
    $("#eliminar").hide(); 
    $("#idDelete").hide();
}



function registrarproducto(indice){
    let referencia = productos[indice].reference;
    let idCaja= `prod_${referencia}`;
    let index=0;
    let encontro=false;
    cantidadProducto = parseInt(document.getElementById(idCaja).value);
    for (index = 0; index < productosSeleccionados.length; index++) {
        if (productosSeleccionados[index].reference ==referencia){
            encontro=true;
            break;
        }
    }
    if (encontro){
        cantidades[index] = cantidades[index] + cantidadProducto;
    }else{
        cantidades.push(cantidadProducto);
        productosSeleccionados.push(productos[indice]);
    }
    document.getElementById(idCaja).value="";
    document.getElementById(idCaja).focus();
    pintarCarrito();
}



function pintarCarrito(){      
    let tabla= document.querySelector("#pedido");
    tabla.innerHTML="";
    for (let indice = 0; indice < productosSeleccionados.length; indice++) {
            let tr = document.createElement("tr")
            let tdReference = document.createElement("td")
            let tdPrice = document.createElement("td")
            let tdCantidad = document.createElement("td")
            tdReference.innerHTML = productosSeleccionados[indice].reference;
            tdPrice.innerHTML =  productosSeleccionados[indice].price;
            tdCantidad.innerHTML = cantidades[indice]
            tr.appendChild(tdReference);
            tr.appendChild(tdPrice);
            tr.appendChild(tdCantidad);
            tabla.appendChild(tr);     
    }
}



function procesarOrden(){
    //creo un objeto de tipo cantidad (referencia y cantidad de producto)
    //cantidades.push({referencia:cantidadProducto});
    cantidades.push({[referencia]:cantidadProducto});
    
}