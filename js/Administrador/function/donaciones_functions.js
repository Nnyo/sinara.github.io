import { connection, headerAuth } from "../../config.js";

const getDonaciones = async () => {
    document.getElementById('containerAdminDonaciones').innerHTML = '';
    var url = connection + 'donations/show';
    fetch(url, {
        method: 'GET',
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.data.length == 0){
            toastr.success('No tienes Cadenas', '', toastr.options);
        }else{
            seeData(data.data);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function seeData(data){
    var auxToCount = 0;
    for(const dona in data){
        var strStatus = 'Recogido';
        if(data[dona].estatus == 0){
            strStatus = 'No Recogido';
        }
        auxToCount++;
        document.getElementById('containerAdminDonaciones').innerHTML += 
                '<tr>'+
                    '<th scope="row">' + auxToCount + '</th>'+
                    '<td>' + data[dona].folio + '</td>'+
                    '<td>' + data[dona].fecha_recoleccion + '</td>'+
                    '<td>' + data[dona].cadena + '</td>'+
                    '<td>' + data[dona].nombre + '</td>'+
                    '<td>' + data[dona].primer_apellido + '</td>'+
                    '<td>' + data[dona].segundo_apellido + '</td>'+
                    '<td>' + data[dona].telefono + '</td>'+
                    '<td>' + strStatus + '</td>'+
                    '<td><button type="button" class="btn btn-info updateDonacion" data-toggle="modal" data-target="#exampleModalEditar" onclick="load(' + data[dona].id + ', \'' + data[dona].fecha_recoleccion + '\', ' + data[dona].cadena_id + ', ' + data[dona].usuario_id + ', \'' + data[dona].folio + '\', ' + data[dona].estatus + ')">Editar</button></td>'+
                    '<td><button type="button" class="btn btn-secondary seeProductos" id="seeProductos' + data[dona].id + '" data-toggle="modal" data-target="#exampleModalProductos">Asignar</button></td>'
                '</tr>';
    }
    const seeProductos = document.querySelectorAll('.seeProductos');
    seeProductos.forEach(obs => {
        obs.addEventListener('click', () => {
            document.getElementById('id_donacion').value = obs.id.replace('seeProductos','')
        })
    })
}

const getProducts = async() => {
    var productToFind = document.getElementById('nombreToSearch').value;
    document.getElementById('containerAdminProducts').innerHTML = '';
    var url = '';
    if(productToFind.length == 0){
        url = connection + 'product/show';
    }else{
        url = connection + 'product/getProductsByFilter/' + productToFind;
    }
    fetch(url, {
        method: 'GET',
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        seeProducts(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function seeProducts(data){
    if(data.data.length == 0){
        toastr.success('Producto no encontrado', '', toastr.options);
    }else{
        var auxToCount = 0;
        for(const product in data.data){
            auxToCount++;
            document.getElementById('containerAdminProducts').innerHTML += 
            '<tr>'+
                '<th scope="row">' + auxToCount + '</th>'+
                '<td>' + data.data[product].nombre + '</td>'+
                '<td>' + data.data[product].descripcion + '</td>'+
                '<td>' + data.data[product].categoria + '</td>'+
                '<td><button type="button" class="btn btn-info loadDataToAssign" id="loadDataToAssign'+ data.data[product].id +'">Asignar</button></td>'+
            '</tr>';
        }

        const loadDataToAssign = document.querySelectorAll('.loadDataToAssign');
        loadDataToAssign.forEach(obs => {
            obs.addEventListener('click', () => {
                saveRecolectado(obs.id.replace('loadDataToAssign',''));
            })
        })
    }
}

function saveRecolectado(id_producto){
    var url = connection + 'picking/create';
    const productToAssign = {
        cantidad: parseInt(document.getElementById('cantidad').value),
        producto_id: id_producto,
        estatus: 0,
        donacion_id: parseInt(document.getElementById('id_donacion').value)
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(productToAssign),
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.estatus){
            document.getElementById('cantidad').value = '';
            toastr.success('Producto Asignado!', '', toastr.options);
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

const loadCatCadena = async() => {
    document.getElementById('catCadena').innerHTML = '';
    document.getElementById('catCadenaEditar').innerHTML = '';
    var url = connection + 'store/getOnlyActive/1';
    fetch(url, {
        method: 'GET',
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        for(const cat in data.data){
            document.getElementById('catCadena').innerHTML += 
            '<option value="' + data.data[cat].id + '">' + data.data[cat].nombre + '</option>'

            document.getElementById('catCadenaEditar').innerHTML += 
            '<option value="' + data.data[cat].id + '">' + data.data[cat].nombre + '</option>'
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const loadCatUsuario = async() => {
    document.getElementById('catRecolector').innerHTML = '';
    document.getElementById('catRecolectorEditar').innerHTML = '';
    var url = connection + 'users/getRecolectorByEstatus/1';
    fetch(url, {
        method: 'GET',
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        for(const cat in data.data){
            document.getElementById('catRecolector').innerHTML += 
            '<option value="' + data.data[cat].id + '">' + data.data[cat].persona.nombre + ' ' + data.data[cat].persona.primer_apellido + ' ' + data.data[cat].persona.segundo_apellido + '</option>'

            document.getElementById('catRecolectorEditar').innerHTML += 
            '<option value="' + data.data[cat].id + '">' + data.data[cat].persona.nombre + ' ' + data.data[cat].persona.primer_apellido + ' ' + data.data[cat].persona.segundo_apellido + '</option>'
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const updateDonation = async() =>{
    var id_donation = document.getElementById('idUpdate').value;
    var url = connection + 'donations/update/' + id_donation;
    const donationToSave = {
        folio: parseInt(document.getElementById('folioEditar').value),
        fecha_recoleccion: new Date(document.getElementById('fecha_recoleccionEditar').value).toISOString().slice(0,10),
        cadena_id: document.getElementById('catCadenaEditar').value,
        usuario_id: parseInt(document.getElementById('catRecolectorEditar').value),
        estatus: parseInt(document.getElementById('estatus').value)
    };
    console.log(donationToSave);
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(donationToSave),
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.data.estatus){
            toastr.success('Donación Actualizada!', '', toastr.options);
            clearEditForm();
            getDonaciones();
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

const saveDonation = async() =>{
    var url = connection + 'donations/create';
    const donationToSave = {
        folio: parseInt(document.getElementById('folio').value),
        fecha_recoleccion: new Date(document.getElementById('fecha_recoleccion').value).toISOString().slice(0,10),
        estatus: 0,
        cadena_id: document.getElementById('catCadena').value,
        usuario_id: parseInt(document.getElementById('catRecolector').value),
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(donationToSave),
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.estatus){
            toastr.success('Donación Registrada! Agrega los produtos...', '', toastr.options);
            clearAddForm();
            getDonaciones();
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

function clearEditForm(){
    document.getElementById('idUpdate').value = '';
    document.getElementById('folioEditar').value = '';
    document.getElementById('fecha_recoleccionEditar').value = '';
    document.getElementById('catCadenaEditar').value = '';
    document.getElementById('catRecolectorEditar').value = '';
    document.getElementById('estatus').value = '';
    $('.close').click(); 
}

function clearAddForm(){
    document.getElementById('folio').value = '';
    document.getElementById('fecha_recoleccion').value = '';
    document.getElementById('catCadena').value = '';
    document.getElementById('catRecolector').value = '';
    $('.close').click(); 
}

export {getDonaciones, loadCatCadena, loadCatUsuario, saveDonation, updateDonation, getProducts};