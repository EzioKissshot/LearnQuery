let Q = function (element) {
  this.e = element;
};

Q.prototype = {
  constructor: Q,
  addClass:function (className) {
    cssClass.add(this.e, className);
    return this;
  },
  removeClass:function (className) {
    cssClass.remove(this.e, className);
    return this;
  },
  toggleClass:function (className) {
    cssClass.toggle(this.e, className);
    return this;
  },
  hasClass:function(className){
    "use strict";
    return cssClass.has(this.e, className);
  },
  before:function (element) {
    debugger;
    dom.before(this.e, element);
    return this;
  },
  after:function (element) {
    dom.after(this.e, element);
    return this;
  },
  append:function (element) {
    dom.append(this.e, element);
    return this;
  },
  prepend:function (element) {
    dom.prepend(this.e, element);
    return this;
  },
  on:function(type, callback){
    eventListener.on(this.e, type, callback);
    return this;
  },
  off:function(type, callback){
    eventListener.off(this.e, type, callback);
    return this;
  },
  trigger:function(type){
    eventListener.trigger(this.e, type);
    return this;
  },
  delegate:function(type, selector, callback){
    eventListener.addDelegation(this.e, selector, type, callback);
    return this;
  },
  getCssProp:function(prop){
    cssProp(this.e, prop)
  },
  setCssProp:function (prop, value) {
    cssProp(this.e, prop, value);
    return this;
  },
  setCssProps:function(props){
    cssProp(this.e, props);
    return this;
  }
};

function learnQuery(elementsSelector) {
  return new Q(domSelector(elementsSelector)[0]);
}