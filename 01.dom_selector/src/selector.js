var domSelector = function(selectors) {
  'use strict';
  function query(s){
    if(!s){
      throw new Error("Invaild args")
    }
    if(typeof s !== "string"){
      throw new Error("Invaild args")
    }
    // I tested, null == false return false, wtf?
    // TODO: how to test null?
    // And this regex only support for three simple selector 
    if(s.match(/^[.#a-zA-Z].*/)===null){
      throw new Error("Invaild args")
    }
    var tag = s.charAt(0)
    var body = s.slice(1)
    var r
    switch(tag){
      case "#":
        r = queryId(body)
        break;
      case ".":
        r = queryClass(body)
        break
      default:
        r = queryTag(s)
    }
    if(r.length===0){
      return [];
    }
    // could be danger which use Array.from in all situation?
    return Array.from(r);
  }

  function queryId(s){
    return [document.getElementById(s)];
  }

  function queryClass(s){
    return document.getElementsByClassName(s);
  }

  function queryTag(s){
    return document.getElementsByTagName(s);
  }



  return query(selectors)
};