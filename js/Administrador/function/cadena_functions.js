import { connection, headerAuth } from "../../config.js";

const getCadenas = async () => {
    document.getElementById('containerAdminCadenas').innerHTML = '';
    var url = '';
    var cadenaToSearch = document.getElementById('txtBuscar').value;
    if(cadenaToSearch.length == 0){
        url = connection + 'store/getCadenas';
    }else{
        url = connection + 'store/getCadenasByFilter/' + cadenaToSearch;
    }
    fetch(url, {
        method: 'GET',
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.data.length == 0){
            toastr.success('No tienes Cadenas', '', toastr.options);
        }else{
            if(cadenaToSearch.length == 0){
                seeData(data.data);
            }else{
                seeData2(data.data);
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function seeData2(data){
    var auxToCount = 0;
    for(const cad in data){
        var strStatus = 'Activo';
        if(data[cad].estatus == 0){
            strStatus = 'Inactivo';
        }
        auxToCount++;
        document.getElementById('containerAdminCadenas').innerHTML += 
                '<tr>'+
                    '<th scope="row">' + auxToCount + '</th>'+
                    '<td>' + data[cad].nombre + '</td>'+
                    '<td>' + data[cad].descripcion + '</td>'+
                    '<td>' + strStatus + '</td>'+
                    '<td>' + data[cad].calle + '</td>'+
                    '<td>' + data[cad].colonia + '</td>'+
                    '<td>' + data[cad].numero + '</td>'+
                    '<td>' + data[cad].codigo_postal + '</td>'+
                    '<td><button type="button" class="btn btn-info updateCadena" data-toggle="modal" data-target="#exampleModalEditar" onclick="load('+ data[cad].ubicacion_id +','+ data[cad].id +',\''+ data[cad].nombre +'\', \''+ data[cad].descripcion +'\', \''+ data[cad].calle +'\', \''+ data[cad].colonia +'\', \''+ data[cad].numero +'\', \'' + data[cad].codigo_postal + '\')">Editar</button></td>'+
                '</tr>';
    }
}

function seeData(data){
    var auxToCount = 0;
    for(const cad in data){
        var strStatus = 'Activo';
        if(data[cad].estatus == 0){
            strStatus = 'Inactivo';
        }
        auxToCount++;
        document.getElementById('containerAdminCadenas').innerHTML += 
                '<tr>'+
                    '<th scope="row">' + auxToCount + '</th>'+
                    '<td>' + data[cad].nombre + '</td>'+
                    '<td>' + data[cad].descripcion + '</td>'+
                    '<td>' + strStatus + '</td>'+
                    '<td>' + data[cad].ubicacion.calle + '</td>'+
                    '<td>' + data[cad].ubicacion.colonia + '</td>'+
                    '<td>' + data[cad].ubicacion.numero + '</td>'+
                    '<td>' + data[cad].ubicacion.codigo_postal + '</td>'+
                    '<td><button type="button" class="btn btn-info updateCadena" data-toggle="modal" data-target="#exampleModalEditar" onclick="load('+ data[cad].ubicacion.id +','+ data[cad].id +',\''+ data[cad].nombre +'\', \''+ data[cad].descripcion +'\', \''+ data[cad].ubicacion.calle +'\', \''+ data[cad].ubicacion.colonia +'\', \''+ data[cad].ubicacion.numero +'\', \'' + data[cad].ubicacion.codigo_postal + '\')">Editar</button></td>'+
                '</tr>';
    }
}

const saveCadena = async () =>{
    var url = connection + 'store/validAddCadena';
    const dataToValidate = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        calle: document.getElementById('calle').value,
        codigo_postal: document.getElementById('codigo_postal').value,
        colonia:  document.getElementById('colonia').value,
        numero: document.getElementById('numero').value
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(dataToValidate),
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.estatus){
            register();
        }else{
            for(const error in data.data){
                toastr.error(data.data[error], '', toastr.options);
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function register(){
    var url2 = connection + 'ubication/create';
    var ubication = 0;
    const dataUbication = {
        calle : document.getElementById('calle').value,
        codigo_postal: document.getElementById('codigo_postal').value,
        colonia: document.getElementById('colonia').value,
        numero: document.getElementById('numero').value,
        updated_at: new Date().toISOString().slice(0,10),
        created_at: new Date().toISOString().slice(0,10)
    };
    fetch(url2, {
        method: 'POST',
        body: JSON.stringify(dataUbication),
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((respAuth) => {
        if(respAuth.estatus){
            ubication= respAuth.data.id;
            var url3 = connection + 'store/create';
            const dataCadena = {
                nombre: document.getElementById('nombre').value,
                descripcion: document.getElementById('descripcion').value,
                estatus: 1,
                ubicacion_id: ubication
            }
            fetch(url3, {
                method: 'POST',
                body: JSON.stringify(dataCadena),
                headers:headerAuth
            })
            .then((response) => response.json())
            .then((respAuth2) => {
                if(respAuth2.estatus){
                    toastr.success('Cadena registrada!', '', toastr.options);
                    cleanData();
                    getCadenas();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function cleanData(){
    document.getElementById('calle').value = '';
    document.getElementById('codigo_postal').value = '';
    document.getElementById('colonia').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('descripcion').value = '';
    $('.close').click(); 
}

const updateCadena = async () =>{
    var url = connection + 'store/validAddCadena';
    const dataToValidate = {
        nombre: document.getElementById('nombreEditar').value,
        descripcion: document.getElementById('descripcionEditar').value,
        calle: document.getElementById('calleEditar').value,
        codigo_postal: document.getElementById('codigo_postalEditar').value,
        colonia:  document.getElementById('coloniaEditar').value,
        numero: document.getElementById('numeroEditar').value
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(dataToValidate),
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.estatus){
            update();
        }else{
            for(const error in data.data){
                toastr.error(data.data[error], '', toastr.options);
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function update(){
    var url2 = connection + 'ubication/update/' + document.getElementById('updateUbicationId').value;
    var ubication = 0;
    const dataUbication = {
        calle : document.getElementById('calleEditar').value,
        codigo_postal: document.getElementById('codigo_postalEditar').value,
        colonia: document.getElementById('coloniaEditar').value,
        numero: document.getElementById('numeroEditar').value,
        updated_at: new Date().toISOString().slice(0,10),
        created_at: new Date().toISOString().slice(0,10)
    };
    fetch(url2, {
        method: 'PUT',
        body: JSON.stringify(dataUbication),
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((respAuth) => {
        if(respAuth.estatus){
            ubication= document.getElementById('updateId').value
            var url3 = connection + 'store/update/' + ubication;
            const dataCadena = {
                nombre: document.getElementById('nombreEditar').value,
                descripcion: document.getElementById('descripcionEditar').value,
                estatus: 1,
                ubicacion_id: ubication
            }
            fetch(url3, {
                method: 'PUT',
                body: JSON.stringify(dataCadena),
                headers:headerAuth
            })
            .then((response) => response.json())
            .then((respAuth2) => {
                if(respAuth2.estatus){
                    toastr.success('Cadena actualizada!', '', toastr.options);
                    cleanData();
                    getCadenas();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export {getCadenas, saveCadena, updateCadena};
