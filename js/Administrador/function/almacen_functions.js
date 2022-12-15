import { connection, headerAuth } from "../../config.js";

const getAlmacenes = async() => {
    var fecha_inicial = document.getElementById('fecha_inicial').value;
    var fecha_final = document.getElementById('fecha_final').value;
    var url = connection + 'picking/donationsByCollectedDate/' + fecha_inicial + '/' + fecha_final;
    fetch(url, {
        method: 'GET',
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.data.length == 0){
            toastr.error('No tenemos nada en almacen', '', toastr.options);
        }else{
            seeData(data.data);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function seeData(data){
    document.getElementById('containerAdminAlmacen').innerHTML = ''; 
    var auxToCount = 0;
        for(const almacen in data){
            auxToCount++;
            document.getElementById('containerAdminAlmacen').innerHTML += 
            '<tr>'+
                '<th scope="row">' + auxToCount + '</th>'+
                '<td>' + data[almacen].producto + '</td>'+
                '<td>' + data[almacen].categoria + '</td>'+
                '<td>' + data[almacen].cantidad + '</td>'+
                '<td>' + data[almacen].fecha_recolectado + '</td>'+
                '<td>' + data[almacen].nombre + ' ' + data[almacen].primer_apellido + ' ' + data[almacen].segundo_apellido + '</td>'+
            '</tr>';
        }
}


export { getAlmacenes }
