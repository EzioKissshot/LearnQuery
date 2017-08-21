var dom = (function () {
  function remove(element) {
    element.remove();
  }

  function append(target, element) {
    target.appendChild(element);
  }

  function prepend(target, element) {
    target.insertBefore(element, target.firstChild);
  }

  function after(target, element) {
    try {
      var parent = target.parentNode;
      parent.insertBefore(element, target.nextSibling)
    } catch (e) {
      if (e instanceof TypeError) {
        console.log(e)
      } else {
        throw e
      }
    }
  }

  function before(target, element) {
    var parent = target.parentNode;
    parent.insertBefore(element, target);
  }

  function val(target) {
    return target.value;
  }

  return {
    remove,
    append,
    prepend,
    after,
    before,
    val,
  }
})();