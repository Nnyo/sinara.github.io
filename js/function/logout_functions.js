import { app } from "../config.js";

const logout = async ()=>{
    localStorage.clear();
    window.location.href = app+'SINARA_login.html';
}

const loadMenu = async ()=>{
    var menuByRol = '';
    if(localStorage.getItem('role') == 'Admin'){
        menuByRol = '<a href="https://nnyo.github.io/sinara.github.io/views/Administrador/almacen.html" class="nav-item nav-link">Almacen</a>'+
                    '<a href="https://nnyo.github.io/sinara.github.io/views/Administrador/cadenas.html" class="nav-item nav-link">Cadenas</a>'+
                    '<a href="https://nnyo.github.io/sinara.github.io/views/Administrador/donaciones.html" class="nav-item nav-link">Donaciones</a>'+
                    '<a href="https://nnyo.github.io/sinara.github.io/views/Administrador/productos.html" class="nav-item nav-link">Productos</a>'+
                    '<a href="https://nnyo.github.io/sinara.github.io/views/Administrador/usuarios.html" class="nav-item nav-link">Usuarios</a>';
    }else if(localStorage.getItem('role') == 'Recolector'){
        menuByRol = '<a href="https://nnyo.github.io/sinara.github.io/index.html" class="nav-item nav-link active">Inicio</a>';
    }
    document.getElementById('containerMenu').innerHTML =
        '<div class="top-bar row gx-0 align-items-center d-none d-lg-flex">'+
            '<div class="col-lg-6 px-5 text-start">'+
                '<small><i class="fa fa-map-marker-alt me-2"></i>Emiliano Zapata, Morelos</small>'+
                '<small class="ms-4"><i class="fa fa-envelope me-2"></i>atencion@sinara.org</small>'+
            '</div>'+
            '<div class="col-lg-6 px-5 text-end">'+
                '<small>Síguenos</small>'+
                '<a class="text-body ms-3" href="https://www.facebook.com/bancodealimentosmorelos/"><i class="fab fa-facebook-f"></i></a>'+
                '<a class="text-body ms-3" href="https://www.youtube.com/channel/UCk2bd7nzPpjumiXzqKajf8A"><i class="fab fa-youtube"></i></a>'+
                '<a class="text-body ms-3" href="https://www.instagram.com/bamxmorelos/?hl=es-la&fbclid=IwAR360gX6ZxQ3rCYjJz-n6xCcedlW5Hy5wmMHQE9hc_BNvRWQ5wPul1pR-rw"><i class="fab fa-instagram"></i></a>'+
            '</div>'+
        '</div>'+
        '<nav class="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">'+
            '<a href="#" class="navbar-brand ms-4 ms-lg-0">'+
                '<img src="https://nnyo.github.io/sinara.github.io/images/SINARA.ico" width="30%" alt="">'+
            '</a>'+
            '<button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">'+
                '<span class="navbar-toggler-icon"></span>'+
            '</button>'+
            '<div class="collapse navbar-collapse" id="navbarCollapse">'+
                '<div class="navbar-nav ms-auto p-4 p-lg-0">'+
                    menuByRol+
                    '<a id="btnLogout" class="nav-item nav-link">Cerrar sesión</a>'+
                '</div>'+
                '<div class="d-none d-lg-flex ms-2">'+
                    '<a class="btn-sm-square bg-white rounded-circle ms-3" href="/SINARA_login.html">'+
                        '<small class="fa fa-user text-body"></small>'+
                    '</a>'+
                '</div>'+
            '</div>'+
        '</nav>';
}

export {logout, loadMenu};
