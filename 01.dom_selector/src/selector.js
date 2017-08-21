var domSelector = function (selectors) {
  'use strict';

  function query(s) {
    const r = document.querySelectorAll(s);
    if (r.length === 0) return [];
    if (r.length === 1 && s.match(/^#\w+$/)) return [r[0]];
    return r;
  }

  return query(selectors)
};