import { app } from "../js/config.js";

if(!localStorage.getItem('sinara') && !localStorage.getItem('role') && !localStorage.getItem('user')){
    window.location.href = app+'SINARA_login.html';
    toastr.error('Debes de iniciar sesión', '', toastr.options);
}
