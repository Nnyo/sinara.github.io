import { connection, header, app } from "../config.js";

const signin = async (data)=>{
    var url = connection + 'login';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:header
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.estatus){
            toastr.success('Inicio exitoso!', '', toastr.options);
            localStorage.setItem('sinara', data.token);
            localStorage.setItem('role', data.user.rol.nombre);
            localStorage.setItem('user', data.user.id);
            if(localStorage.getItem('role') == 'Admin'){
                window.location.href = app+'views/Administrador/donaciones.html';
            }else if(localStorage.getItem('role') == 'Recolector'){
                window.location.href = app+'index.html';
            }
           
        }else{
            if(data.message){
                toastr.error(data.message, '', toastr.options);
            }else{
                for(const error in data.data){
                    toastr.error(data.data[error], '', toastr.options);
                }
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export {signin};