function ajaxReq() {
  'use strict';
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


  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState === 4){
      //recived response
      if(httpRequest.status===200){
        if(option.success) {
          option.success.call(
          context,
          JSON.parse(httpRequest.responseText),
          httpRequest.status,
          httpRequest
          )
        };
      }else{
        if(option.failure){
          option.failure.call(
            context,
            httpRequest,
            httpRequest.status,
            httpRequest.responseText
          )
        };
      }
      if(option.complete){ 
        option.complete.call(
          context,
          httpRequest,
          httpRequest.status,
          httpRequest.responseText
        )
      };

    }else{

    }
  }

  if(option.method==='POST'){
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }

  httpRequest.open(option.method,url,true);
  httpRequest.send(dataStr);

}
