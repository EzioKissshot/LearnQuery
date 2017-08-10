function ajaxReq() {
  'use strict';
  // check args
  var args = Array.from(arguments);
  if(args[0]&&(typeof args[0] === 'string')){
    var url = args[0];
  }else{
    throw new Error('Invalid url argument')
  }
  var defaultOption = {
    method : "GET"
  }
  var option = args[1]?args[1]:defaultOption;

  // if have data obj, build a query string
  var data = option.data;
  var dataStr = '';
  if(typeof data === 'object'){
    for(var k in data){
      dataStr += ('&'+k+'='+data.k)
    }
  }else{
    dataStr = data;
  }
  
  var context = option.context?option.context:option;

  // handle response callback
  var r = new XMLHttpRequest();
  r.onreadystatechange = function(){
    if(r.readyState === 4){
      //recived response
      if(r.status===200){
        if(option.success) {
          option.success.call(
          context,
          JSON.parse(r.responseText),
          r.status,
          r
          )
        };
      }else{
        if(option.failure){
          option.failure.call(
            context,
            r,
            r.status,
            r.responseText
          )
        };
      }
      if(option.complete){ 
        option.complete.call(
          context,
          r,
          r.status,
          r.responseText
        )
      };

    }else{
      // do nothing while not complete requset
    }
  }

  // POST need a special header
  if(option.method==='POST'){
    r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }

  // Do ajax
  r.open(option.method,url,true);
  r.send(dataStr);

}
