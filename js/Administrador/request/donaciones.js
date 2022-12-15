import {getDonaciones, loadCatCadena, loadCatUsuario, saveDonation, updateDonation, getProducts} from '../../Administrador/function/donaciones_functions.js';

loadCatCadena();

loadCatUsuario();

getDonaciones();

const btnSaveProducto = document.getElementById('btnSaveProducto');
btnSaveProducto.addEventListener('click', () =>{
    if(document.getElementById('fecha_recoleccion').value == ''){
        toastr.error('La fecha de recolección es obligatoria', '', toastr.options);
    }else{
        saveDonation();
    }
});

const btnEditProducto = document.getElementById('btnEditProducto');
btnEditProducto.addEventListener('click', () =>{
    updateDonation();
});

const btnBuscarProducto = document.getElementById('btnBuscarProducto');
btnBuscarProducto.addEventListener('click', () =>{
    getProducts();
});
