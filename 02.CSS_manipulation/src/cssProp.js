function cssProp(element, property, value) {
  'use strict';
  var args = Array.from(arguments);

  // write less check logic first

  if (!(element instanceof HTMLElement)) {
    throw new Error('Args 1 is not a HTMLElement')
  }

  if (args.length === 2) {
    if ((typeof property === 'object')) {
      //set multiple properties
      //cssProp(element, {cssProperty: value, cssProperty: value});
      var props = property;
      for (var prop in props) {
        setProp(element, prop, props[prop])
      }

    } else if ((typeof property === 'string')) {
      //get CSS property value
      //cssProp(element, cssProperty);
      return getProp(element, property);

    } else {
      throw new Error('Invalid arguments 2')
    }
  } else if (args.length === 3) {
    if ((typeof property === 'string') && (typeof value === 'string')) {
      // set single property
      // cssProp(element, cssProperty, value);
      setProp(element, property, value)

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