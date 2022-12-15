import {signin} from '../function/usuarios_functions.js';

const btn = document.getElementById('btnLogin');
btn.addEventListener('click', ()=>{
    const data = {
        usuario: document.getElementById('loginUsername').value,
        contrasenia: document.getElementById('loginPassword').value
    };
    signin(data);
});

