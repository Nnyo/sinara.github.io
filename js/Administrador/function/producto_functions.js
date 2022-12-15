import { connection, headerAuth } from "../../config.js";

const updateProduct = async() => {
    var url = connection + 'product/update/' + document.getElementById('idUpdate').value;
    const productToEdit = {
        nombre: document.getElementById('nombreEditar').value,
        descripcion: document.getElementById('descripcionEditar').value,
        categoria_id: document.getElementById('catCategoriaEditar').value
    };
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(productToEdit),
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.estatus){
            toastr.success('Producto Actualizado!', '', toastr.options);
            clearEditForm();
            getProducts();
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

const saveProduct = async() => {
    var url = connection + 'product/create';
    const productToSave = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        categoria_id: document.getElementById('catCategoria').value
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(productToSave),
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.estatus){
            toastr.success('Producto Registrado!', '', toastr.options);
            clearAddForm();
            getProducts();
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
    document.getElementById('nombreEditar').value = '',
    document.getElementById('descripcionEditar').value = '',
    document.getElementById('catCategoria').value = 0
    $('.close').click(); 
}

function clearAddForm(){
    document.getElementById('nombre').value = '',
    document.getElementById('descripcion').value = '',
    document.getElementById('catCategoria').value = 0
    $('.close').click(); 
}

const getProducts = async() => {
    var productToFind = document.getElementById('txtBuscar').value;
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
        seeData(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function seeData(data){
    if(data.data.length == 0){
        toastr.success('No tienes Productos', '', toastr.options);
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
                '<td><button type="button" class="btn btn-info updateUser" data-toggle="modal" data-target="#exampleModalEditar" onclick="loadDataToEdit('+ data.data[product].id +',\''+ data.data[product].nombre +'\', \''+ data.data[product].descripcion +'\', \''+ data.data[product].categoria_id +'\')">Editar</button></td>'+
            '</tr>';
        }
    }
}

function loadCatCategorias(){
    document.getElementById('catCategoria').innerHTML = '';
    document.getElementById('catCategoriaEditar').innerHTML = '';
    var url = connection + 'category/show';
    fetch(url, {
        method: 'GET',
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        for(const cat in data.data){
            document.getElementById('catCategoria').innerHTML += 
            '<option value="' + data.data[cat].id + '">' + data.data[cat].nombre + '</option>'

            document.getElementById('catCategoriaEditar').innerHTML += 
            '<option value="' + data.data[cat].id + '">' + data.data[cat].nombre + '</option>'
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export {getProducts, loadCatCategorias, saveProduct, updateProduct};

