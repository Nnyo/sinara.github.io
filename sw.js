importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.3.1/dist/pouchdb.min.js')
importScripts('js/sw-db.js');

const STATIC_CACHE_NAME = 'static-cache-v1.1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1.1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1.1';

const cleanCache = (cacheName, maxSize) => {
    caches.open(cacheName).then((cache) => {
        cache.keys().then((items) => {
            console.log("ITEMS ", items.length);
            if (items.length >= maxSize)
            {
              cache.delete(items[0]).then(() => {
                  cleanCache(cacheName, maxSize);
              });
            }
        })
    })
}

self.addEventListener('install',(event) =>{
    console.log('SW Instalado');
    const respCache = caches.open(STATIC_CACHE_NAME).then((cache) =>{
        return cache.addAll(
            [
                '/',
                '/index.html',
                '/js/app.js',
                '/js/main.js',
                '/manifest.json',
                '/SINARA_login.html',
                '/views/SINARA_producto.html',
                '/css/style_login.css',
                '/css/toast.min.css',
                '/css/bootstrap.min.css',
                '/css/style.css',
                '/images/SINARA.ico',
                '/images/bg-icon.png',
                '/images/SINARA.png',
                '/images/bg.png',
                '/images/icons/android-launchericon-144-144.png',
                '/js/config.js',
                '/js/function/usuarios_functions.js',
                '/js/function/products_functions.js',
                '/js/function/logout_functions.js',
                '/js/function/donations_functions.js',
                '/js/function/camera.js',
                '/js/request/login.js',
                '/js/request/donation.js',
                '/js/request/logout.js',
                '/js/request/product.js',
                '/js/toast.min.js',
                '/js/validate.js'
            ]
        );
    });

    const respCacheInmutable = caches.open(INMUTABLE_CACHE_NAME).then((cache) =>{
        return cache.addAll(
            [
                'https://code.jquery.com/jquery-3.4.1.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
                'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&family=Lora:wght@600;700&display=swap',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css'
            ]
        )
    });
    event.waitUntil(Promise.all([respCache, respCacheInmutable]));
});

self.addEventListener('activate', (event) => {
  const promDeleteCaches = caches.keys().then((items) => {
      items.forEach((key) => {
          if (key !== STATIC_CACHE_NAME && key.includes('static')) {
              return caches.delete(key);
          }
      });
  });
  event.waitUntil(promDeleteCaches);
});

//self.addEventListener('fetch', (event) =>{
//  if (event.request.clone().method === 'GET') {
//    const resp = caches.match(event.request).then((resp) =>{
//      if(resp){
//          return resp;
//      }
//      return fetch(event.request).then((respWeb) =>{
//          caches.open(DYNAMIC_CACHE_NAME).then((cacheDinamico) => {
//              cacheDinamico.put(event.request, respWeb);
//          })
//          return respWeb.clone();
//      });
//  });
//  event.respondWith(resp);
//  }
//});


self.addEventListener('fetch', (event) => {
  if (event.request.clone().method === 'POST' || event.request.clone().method === 'PUT') {
      let genericResponse = fetch(event.request.clone())
          .then((response) => {
              return response
          })
          .catch((err) => {
              if (self.registration.sync.register('online')) {
                  return event.request.clone().json().then((json) => {
                      return savePostOffline(
                          json,
                          event.request.url,
                          event.request.method,
                          event.request.headers.get("Authorization")
                      )
                  })
              }
          })
      event.respondWith(genericResponse)
  } else{
      event.respondWith(
          fetch(event.request)
              .then((networkResponse) => {
                  caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                      cache.put(event.request, networkResponse);
                  })
                  return networkResponse.clone()
              })
              .catch(() => {
                  return caches.match(event.request);
              })
      )
  }
})

//self.addEventListener('fetch', (event) => {
//    if (event.request.clone().method === 'POST' || event.request.clone().method === 'PUT') {
//      const respuestFinal = fetch(event.request.clone())
//      .then((resp)=>{
//        return resp;
//      })
//      .catch(()=>{
//        if(self.registration.sync.register('online')){
//           //Si sale error guardalo en local
//          const respX = event.request.clone().json().then((obj)=>{
//            const res = saveRequestOffline(
//              obj,
//              event.request.url,
//              event.request.method,
//              event.request.headers.get("Authorization")
//            );
//            return res
//          })
//          return respX
//        }
//      })
//      //responde con la respuesta de con/sin internet
//      event.respondWith(respuestFinal);
//    } else {
//      const resp = caches
//        .match(event.request)
//        .then((respCache) => {
//          if (respCache) {
//            return respCache;
//          }
//          return fetch(event.request).then((respWeb) => {
//            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
//              cache.put(event.request, respWeb);
//              cleanCache(DYNAMIC_CACHE_NAME, 8);
//            });
//            return respWeb.clone();
//          });
//        })
//        .catch((error) => {
//          if (event.request.headers.get('accept').includes('text/html')) {
//            return caches.match('/views/SINARA_404.html');
//          }
//        });
//      event.respondWith(resp);
//    }
//  });


  self.addEventListener('sync', (event) => {
    if (event.tag == "online") {
        event.waitUntil(
            getAllPostOffline().then((document) => {
                document.rows.map((item, i) => {
                    fetch(item.doc.url, {
                        method: item.doc.method,
                        headers: {
                            'Content-type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('sinara')
                        },
                        body: JSON.stringify(item.doc.body)
                    })
                        .then((response) => {
                            db.remove(item.doc._id, item.doc._rev);
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })

            })

        )
    }
})