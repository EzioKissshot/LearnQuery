"use strict";

function isEmpty(str) {
    return (!str || 0 === str.length);
}

// listener use to bind to DOM element, call corresponding functions when event firing.
function geneEventListener(event) {
  console.log('gene');
  let type = Object.keys(this.handlers).find(type=>type===event.type);
  if (!type) return;
  let functions = this.handlers[type];
  functions.forEach(f=>f.call(this,event));
}

// cache elements which bound event listener
let _Cache = function () {
  this.elements = [];
  this.uid = 1;
};

_Cache.prototype = {
  constructor:Cache,
  init:function (element) {
    if(!element.uid) element.uid = this.uid++;
    if(!element.handlers) element.handlers = {};
    if(!element.lqListener) element.lqListener = geneEventListener.bind(element);
    this.elements.push(element);
  },
  removeElement:function (uid) {
    this.elements.splice(this.elements.findIndex(e=>e.uid===uid),1);
  },
  removeType:function (uid,type) {
    if(this.get(uid)) delete this.get(uid).handlers[type];
  },
  removeCallback:function (uid, type, callback) {
    if(this.get(uid) && this.get(uid).handlers[type]) {
      let functions = this.get(uid).handlers[type];
      const index = functions.findIndex(f=>f===callback);
      if(index===-1){
        console.log("no such function");
        return;
      }
      functions.splice(index,1)
    }
  },
  // return element or undefined
  get:function (uid) {
    return this.elements.find(e=>e.uid===uid);
  },

};

/*
* One type could have many event listeners, One element could have many event types of listeners
* So use element.handlers = {'click':[listener1, listener2, ...], 'hover':[...], ...}
* */
let eventListener = (function() {
  let cache = new _Cache();

  function add (element, type, callback){
    cache.init(element);
    element.addEventListener(type,element.lqListener);
    if(!element.handlers[type]){
      element.handlers[type] = [];
    }
    (element.handlers[type]).push(callback);
  }

  // remove a type of event listeners, should remove the callback array and remove DOM's event listener
  function removeType (element, type) {
    element.removeEventListener(type,element.lqListener);
    cache.removeType(element.uid,type);
  }

  // remove a event listener, just remove it from the callback array
  function removeCallback(element, type, callback) {
    cache.removeCallback(element.uid,type,callback);
  }

  // bind a callback.
  function on(element,type,callback) {
    if(!(element||type||callback)) throw new Error('Invalid arguments');
    add(element,type,callback);
  }
  
  function off(element,type,callback) {
    if(!(element instanceof HTMLElement)) throw new Error('Invaild element, need a instance of HMTLElement');
    let handlers = cache.get(element.uid).handlers;

    if(isEmpty(type)&&!callback){
      for(let type in handlers){
        removeType(element,type);
      }
    }
    console.log('off')
    if(!isEmpty(type)&&!callback) removeType(element,type);
    if(!isEmpty(type) && (typeof callback === 'function')) removeCallback(element,type,callback);
  }

  return {
    on,
    off
  }
})();