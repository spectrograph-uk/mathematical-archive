var urll

var req_fifo
var returnf
function transfer(path,filee,extension, query,returnfunc){


urll= path+filee+"."+extension
urll+="?"
urll+=query
if(query!="")urll+="\&"
urll+="dummy="+Math.random().toString().substring(2,8)
//console.log("url:   "+urll)
returnf=returnfunc
GetAsyncData()
}

  // GetAsyncData sends a request to read the fifo.
  function GetAsyncData() {
   

    // branch for native XMLHttpRequest object
    if (window.XMLHttpRequest) {
      req_fifo = new XMLHttpRequest();
      //req_fifo.abort();
     req_fifo.onreadystatechange = GotAsyncData;
      //    req_fifo.onload=GotAsyncData;
      req_fifo.open("GET", urll, true);
      req_fifo.send(null);
    // branch for IE/Windows ActiveX version
    } else if (window.ActiveXObject) {
      req_fifo = new ActiveXObject("Microsoft.XMLHTTP");
      if (req_fifo) {
        req_fifo.abort();
        req_fifo.onreadystatechange = GotAsyncData;
        req_fifo.open("GET", urll, true);
        req_fifo.send();
      }
    }
  }

  // GotAsyncData is the read callback for the above XMLHttpRequest() call.
  // This routine is not executed until data arrives from the request.
  // We update the "fifo_data" area on the page when data does arrive.
  function GotAsyncData() {

    // only if req_fifo shows "loaded"
  //  if (req_fifo.readyState != 4 || req_fifo.status != 200) {
   //   returnf("error");return
   // }


if(req_fifo.readyState==4)
{
//console.log("response:   "+req_fifo.responseText)
    returnf(req_fifo.responseText);
}


    
    return;
  }

