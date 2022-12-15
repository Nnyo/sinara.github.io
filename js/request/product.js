import {getProducts, filterProducts} from '../function/products_functions.js';

getProducts();

const btn = document.getElementById('btnSearch');
btn.addEventListener('click', ()=>{
    const productToSearch = document.getElementById('productToSearch').value
    filterProducts(productToSearch);
});


