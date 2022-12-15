if(navigator.serviceWorker){
    navigator.serviceWorker.register('./sw.js');
  }

setTimeout(function(){
document.querySelector('input[type="checkbox"]').setAttribute('checked',true);
},100);
