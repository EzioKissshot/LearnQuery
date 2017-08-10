var eventListener = (function() {
  'use strict';

  var listeners = [];

  function on(element,event,callback){
    element.addEventListener(event,callback);
    listeners.push({ele:element,eve:event,c:callback});
  }

  function off(element,event,callback){
    if(callback){
      //removes a specific callback on an element of the event type

      element.removeEventListener(event,callback);
    }

    if((!callback)&&event){
      //removes all callbacks on an element of the event type
      var events = listeners.filter(i=>(i.ele===element)&&(i.eve===event));
      events.map(event=>{
        element.removeEventListener(event.eve,event.c)
      })
    }

    if((!callback)&&(!event)){
      //removes all callbacks on an element
      var events = listeners.filter(i=>(i.ele===element));
      events.map(event=>{
        element.removeEventListener(event.eve,event.c)
      })
    }
  }
  
  return {
    on,
    off
  }
})();