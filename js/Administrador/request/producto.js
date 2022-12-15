import {getProducts, loadCatCategorias, saveProduct, updateProduct} from '../../Administrador/function/producto_functions.js';

getProducts();

loadCatCategorias();

const btn = document.getElementById('btnBuscarProducto');
btn.addEventListener('click', ()=>{
    getProducts();
});

const btnSave = document.getElementById('btnSaveProducto');
btnSave.addEventListener('click', () => {
    saveProduct();
});

const btnEdit = document.getElementById('btnEditProducto');
btnEdit.addEventListener('click', () => {
    updateProduct();
});

