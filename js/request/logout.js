import {logout, loadMenu} from '../function/logout_functions.js';

loadMenu();

const btn = document.getElementById('btnLogout');
btn.addEventListener('click', ()=>{
    logout();
});

var conecction = false;

function isOnline(){
    if(navigator.onLine){
        if(conecction){
            conecction = false;
            toastr.success('En Línea', '', toastr.options);
        }
    }else{
        conecction = true;
        toastr.error('Sin Conexión', '', toastr.options);
    }
}

window.addEventListener('online', (event) => {
    isOnline();
});

window.addEventListener('offline', (event) => {
    isOnline();
});

isOnline();

