const db = new PouchDB("offlinePost");

function savePostOffline(body, url, method, session) {
    return db.post({ body: body, url: url, method: method, token: session }).then((pouchResponse) => {
        return new Response(JSON.stringify(pouchResponse));
    })
}

function getAllPostOffline() {
    return db.allDocs({
        include_docs: true,
        attachments: true
    }).then((result) => {
        return result
    }).catch((err) => {
        return err
    });
}



/*
function saveMessage(message){
    message._id = new Date().toISOString();
    return db.put(message).then(()=>{
        console.log('Mensaje almacenado');
        //actividad de registro en sincronización, para cuando haya de nuevo internet la atienda
        self.registration.sync.register('nuevo-post');
        //Crear response de un JSON
        const body = {
            result:true, 
            offlineMode:true, 
            message
        }
        const respuesta = new Response(
            JSON.stringify(body),
            {
                headers:{
                    'Content-Type':'application/json'
                }
            })
        return respuesta
    })
}

function postMessageSync(){
    const promises = [];
    db.allDocs({include_docs:true})
    .then((docs)=>{
        docs.rows.forEach(row => {
            const doc = row.doc;
            const respFetch =  fetch(serverApiSW, {
                method: 'POST',
                body: JSON.stringify(doc),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((respWeb)=>{
                return db.remove(doc);
            })
            promises.push(respFetch);
        });
    })
    return Promise.all(promises);
}
*/

