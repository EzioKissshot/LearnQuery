function cssProp() {
  'use strict';
  var args = Array.from(arguments);

  // write less check logic first

  if (!(args[0] instanceof HTMLElement)) {
    throw new Error('Args 1 is not a HTMLElement')
  }

  var element = args[0]

  if (args.length === 2) {
    if ((typeof args[1] === 'object')) {
      //set multiple properties
      //cssProp(element, {cssProperty: value, cssProperty: value});
      var props = args[1]
      for (var prop in props) {
        setProp(element, prop, props[prop])
      }

    } else if ((typeof args[1] === 'string')) {
      //get CSS property value
      //cssProp(element, cssProperty);
      return getProp(element, args[1]);

    } else {
      throw new Error('Invalid arguments 2')
    }
  } else if (args.length === 3) {
    if ((typeof args[1] === 'string') && (typeof args[2] === 'string')) {
      // set single property
      // cssProp(element, cssProperty, value);
      setProp(element, args[1], args[2])

    } else {
      throw new Error('Invalid arguments prop name or value')
    }
  }

  // don't do this stupid things : e.style.prop
  function getProp(e, prop) {
    return e.style[prop];
  }

  function setProp(e, prop, value) {
    e.style[prop] = value;
  }

  function isEmpty(str) {
    return (!str || 0 === str.length);
  }

}