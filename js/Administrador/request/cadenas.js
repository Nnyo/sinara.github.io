import {getCadenas, saveCadena, updateCadena} from '../../Administrador/function/cadena_functions.js';

getCadenas();

const btnCadenaToSearch = document.getElementById('btnBuscarCadena');
btnCadenaToSearch.addEventListener('click', ()=>{
    getCadenas();
});

const btnSaveCollector = document.getElementById('btnSaveCollector');
btnSaveCollector.addEventListener('click', () =>{
    saveCadena();
});

const btnUpdateCadena = document.getElementById('btnUpdateCadena');
btnUpdateCadena.addEventListener('click', () =>{
    updateCadena();
})

