import {getAlmacenes} from '../../Administrador/function/almacen_functions.js';

const btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click', () =>{
    getAlmacenes();
});
