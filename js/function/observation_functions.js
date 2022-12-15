import { connection, headerAuth } from "../config.js";

const getObservation = async ()=>{
    var url = connection + 'observation/getObservationByIdRecolectado/' + localStorage.getItem('recolectado');
    fetch(url, {
        method: 'GET',
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length == 0){
            toastr.success('Sin observaciones', '', toastr.options);
        }else{
            document.getElementById('containerObservations').innerHTML = '';
            seeData(data.data);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function seeData(data){
    var counter = 0;
    for(const obs in data){
        counter++;
        var img = '';
        var btnToShowCol = '';
        if(data[obs].evidencia != ''){
            img = '<img src="' + data[obs].evidencia + '">';
            btnToShowCol = '<p><a class="btn seeObser" href="#collapse'+ counter +'" id="seeObser'+ counter +'" data-bs-toggle="collapse" aria-expanded="true" aria-controls="collapse1"><i class="fa fa-comments" style="color: #F65005;"></i></a></p>';
        }
        document.getElementById('containerObservations').innerHTML += 
            '<div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp mt-3" data-wow-delay="0.3s">'+
                '<div class="product-item">'+
                    '<div class="text-center p-4">'+
                        '<div class="row">'+
                            '<div class="col-9">'+
                                '<div class="form-group">'+
                                    '<label for="observation">Observación:</label>'+
                                    '<textarea class="form-control" rows="4" id="observation">' + data[obs].observacion + '</textarea>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-3">'+
                                btnToShowCol+
                            '</div>'+
                        '</div>'+
                        '<div class="row">'+
                            '<div id="collapse'+ counter +'" class="collapse">'+
                            img+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
    }
}

export {getObservation};
