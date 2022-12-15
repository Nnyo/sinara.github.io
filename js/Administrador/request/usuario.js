import {getUsers, saveUsers, updateUser} from '../../Administrador/function/usuario_functions.js';

getUsers();


const btn = document.getElementById('btnSaveCollector');
btn.addEventListener('click', ()=>{
    saveUsers();
});

const btnUpdate = document.getElementById('btnUpdateCollector');
btnUpdate.addEventListener('click', ()=>{
    updateUser();
});

