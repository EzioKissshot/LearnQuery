var cssClass = (function() {
  'use strict';

  function addClass(e, className){
    e.classList.add(className);
  }


  function removeClass(e, className){
    e.classList.remove(className);
  }

  function toggleClass(e, className){
    e.classList.toggle(className);
  }

  function hasClass(e, className){
    return e.classList.contains(className);
  }

  return {
    add: addClass,
    remove: removeClass,
    toggle: toggleClass,
    has: hasClass,
  }
})();