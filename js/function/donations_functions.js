import { connection, headerAuth } from "../config.js";

const getProducts = async ()=>{
    document.getElementById('containerDonations').innerHTML = ''; 
    var url = connection + 'donations/donationsByIdUser/' + localStorage.getItem('user');
    fetch(url, {
        method: 'GET',
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.data.length == 0){
            toastr.success('No tienes recolecciones', '', toastr.options);
        }else{
            const estatus = [];
            for(const product in data.data){
                var recoleccion = '';
                if(data.data[product].estatus == 1){
                    estatus.push('flexCheck' + data.data[product].id);
                }else{
                    recoleccion = '<div id="collapse' + data.data[product].id + '" class="collapse " >'+
                                      '<div class="accordion-body">'+
                                          '<a class="btn btn-outline-primary border-2 py-2 px-4 rounded-pill" onclick="redirect(' + data.data[product].id + ')">Iniciar Recolección</a>'+
                                      '</div>'+
                                  '</div>';
                }
                document.getElementById('containerDonations').innerHTML += 
                '<div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">'+
                '<div class="bg-white p-4">'+
                    '<div class="form-check mb-3">'+
                        '<input class="form-check-input flexCheck" id="flexCheck' + data.data[product].id + '" type="checkbox">'+
                        '<label class="form-check-label" for="flexCheck' + data.data[product].id + '"><span class="fst-italic pl-1">Orden pendiente</span></label>'+
                        '<a class="d-block h5 lh-base mb-4" href="#collapse' + data.data[product].id + '" data-bs-toggle="collapse"'+
                        'aria-expanded="true" aria-controls="collapse' + data.data[product].id + '"><small'+
                            'class="fa fa-store bag-ok"></small>'+
                        data.data[product].cadena.nombre + '</a>'+
                    '</div>'+
                    recoleccion+
                    '<div class="text-muted">'+
                        '<small class="me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>' + 'Col. ' + data.data[product].cadena.ubicacion.colonia + ', C. ' + data.data[product].cadena.ubicacion.calle + ', Núm. ' + data.data[product].cadena.ubicacion.numero + '</small>'+
                    '</div>'+
                    '<div class="text-muted">'+
                        '<small class="me-3"><i class="fa fa-calendar text-primary me-2"></i>' + new Date(data.data[product].fecha_recoleccion).toLocaleDateString() + '</small>'+
                    '</div>'+
                '</div>'+
            '</div>';
            }
            for(const est in estatus){
                document.querySelector('#'+estatus[est]).checked = true;
            }
            const flexCheck = document.querySelectorAll('.flexCheck');
            flexCheck.forEach(observation => {
                observation.addEventListener('click', () => {
                    updateEstatus(observation.id.replace('flexCheck',''));
                });
            });
            
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updateEstatus(id){
    var url = connection + 'donations/updateStatus/' + id;
    fetch(url, {
        method: 'PUT',
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.estatus){
            toastr.success('Recolección exitosa!', '', toastr.options)
        }else{
            toastr.error(data.data, '', toastr.options)
        }
        getProducts();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export { getProducts };
