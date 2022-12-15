import { connection, headerAuth } from "../../config.js";

const updateUser = async () =>{
    var url = connection + 'person/validUpdateUser';
    const dataToTest = {
        nombre: document.getElementById('nombreUpdate').value,
        primer_apellido: document.getElementById('primerApellidoUpdate').value,
        segundo_apellido: document.getElementById('segundoApellidoUpdate').value,
        telefono: document.getElementById('telefonoUpdate').value,
        usuario: document.getElementById('usuarioUpdate').value,
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(dataToTest),
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.estatus){ //Correct Data!
            var url = connection + 'person/update/' + document.getElementById('idUpdate').value;
            const dataToPerson = {
                nombre: document.getElementById('nombreUpdate').value,
                primer_apellido: document.getElementById('primerApellidoUpdate').value,
                segundo_apellido: document.getElementById('segundoApellidoUpdate').value,
                telefono: document.getElementById('telefonoUpdate').value
            }
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(dataToPerson),
                headers:headerAuth
            })
            .then((response) => response.json())
            .then((respPerson) => {
                var url = connection + 'users/update/' + document.getElementById('idUsuarioUpdate').value;
                const dataToAuth = {
                    usuario: document.getElementById('usuarioUpdate').value
                }
                fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(dataToAuth),
                    headers:headerAuth
                })
                .then((response) => response.json())
                .then((respAuth) => {
                    if(respAuth.estatus){
                        toastr.success('Recolector actualizado!', '', toastr.options);
                        cleanDataUpdate();
                        getUsers();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }else{
            for(const error in data.data){
                toastr.error(data.data[error], '', toastr.options);
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const saveUsers = async () =>{
    var url = connection + 'person/validNewUser';
    const dataToTest = {
        nombre: document.getElementById('nombre').value,
        fecha_registro: new Date().toISOString().slice(0,10),
        primer_apellido: document.getElementById('primerApellido').value,
        segundo_apellido: document.getElementById('segundoApellido').value,
        fecha_nacimiento:  new Date().toISOString().slice(0,10),
        telefono: document.getElementById('telefono').value,
        contrasenia_confirmation: document.getElementById('contraseniaConfirm').value,
        contrasenia: document.getElementById('contrasenia').value,
        usuario: document.getElementById('usuario').value,
        rol_id: 1,
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(dataToTest),
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.estatus){ //Correct Data!
            var url = connection + 'person/create';
            const dataToPerson = {
                nombre: document.getElementById('nombre').value,
                primer_apellido: document.getElementById('primerApellido').value,
                segundo_apellido: document.getElementById('segundoApellido').value,
                fecha_nacimiento:  new Date().toISOString().slice(0,10),
                telefono: document.getElementById('telefono').value,
                fecha_registro: new Date().toISOString().slice(0,10),
            }
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(dataToPerson),
                headers:headerAuth
            })
            .then((response) => response.json())
            .then((respPerson) => {
                var url = connection + 'auth/register';
                const dataToAuth = {
                    contrasenia_confirmation: document.getElementById('contraseniaConfirm').value,
                    contrasenia: document.getElementById('contrasenia').value,
                    usuario: document.getElementById('usuario').value,
                    rol_id: 1,
                    persona_id: respPerson.data.id
                }
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(dataToAuth),
                    headers:headerAuth
                })
                .then((response) => response.json())
                .then((respAuth) => {
                    if(respAuth.estatus){
                        toastr.success('Recolector registrado!', '', toastr.options);
                        cleanData();
                        getUsers();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }else{
            for(const error in data.data){
                toastr.error(data.data[error], '', toastr.options);
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function cleanDataUpdate(){
    document.getElementById('nombreUpdate').value = '';
    document.getElementById('primerApellidoUpdate').value = '';
    document.getElementById('segundoApellidoUpdate').value = '';
    document.getElementById('telefonoUpdate').value = '';
    document.getElementById('usuarioUpdate').value = '';
    document.getElementById('idUpdate').value = '';
    document.getElementById('idUsuarioUpdate').value = '';
    $('.close').click(); 
}

function cleanData(){
    document.getElementById('nombre').value = '';
    document.getElementById('primerApellido').value = '';
    document.getElementById('segundoApellido').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('contraseniaConfirm').value = '';
    document.getElementById('contrasenia').value = '';
    document.getElementById('usuario').value = '';
    $('.close').click(); 
}

const getUsers = async () => {
    document.getElementById('containerUsers').innerHTML = '';
    var url = connection + 'users/getRecolectores';
    fetch(url, {
        method: 'GET',
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.data.length == 0){
            toastr.success('No tienes Recolectores', '', toastr.options);
        }else{
            var auxToCount = 0;
            const estatus = [];
            for(const user in data.data){
                auxToCount++;
                var btnToEnabled = '<button type="button" class="btn btn-warning btnEditEstatus" id="btnEditEstatus'+ data.data[user].usuario_id +'">Desactivar</button>';
                var strStatus = 'Activo';
                if(data.data[user].activo == 0){
                    estatus.push(data.data[user].id);
                    strStatus = 'Inactivo';
                    btnToEnabled = '<button type="button" class="btn btn-warning btnEditEstatus" id="btnEditEstatus'+ data.data[user].usuario_id +'">Activar</button>';
                }
                document.getElementById('containerUsers').innerHTML += 
                '<tr>'+
                    '<th scope="row">' + auxToCount + '</th>'+
                    '<td>' + data.data[user].nombre + '</td>'+
                    '<td>' + data.data[user].primer_apellido + '</td>'+
                    '<td>' + data.data[user].segundo_apellido + '</td>'+
                    '<td>' + data.data[user].telefono + '</td>'+
                    '<td>' + data.data[user].usuario + '</td>'+
                    '<td>' + strStatus + '</td>'+
                    '<td><button type="button" class="btn btn-info updateUser" data-toggle="modal" data-target="#exampleModal" onclick="load('+ data.data[user].id +',\''+ data.data[user].nombre +'\', \''+ data.data[user].primer_apellido +'\', \''+ data.data[user].segundo_apellido +'\', \''+ data.data[user].telefono +'\', \''+ data.data[user].usuario +'\', '+ data.data[user].usuario_id +')">Editar</button></td>'+
                    '<td>' + btnToEnabled + '</td>'
                '</tr>';
            }

            const btnEditEstatus = document.querySelectorAll('.btnEditEstatus');
            btnEditEstatus.forEach(editStatus =>{
                editStatus.addEventListener('click', () =>{
                    updateStatus(editStatus.id.replace('btnEditEstatus', ''));
                });
            })

        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updateStatus(id){
    var url = connection + 'users/updateStatus/' + id;
    fetch(url, {
        method: 'PUT',
        headers:headerAuth
    })
    .then((response) => response.json())
    .then((data) => {
        toastr.success('Recolector actualizado!', '', toastr.options);
        getUsers();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


export {getUsers, saveUsers, updateUser};
