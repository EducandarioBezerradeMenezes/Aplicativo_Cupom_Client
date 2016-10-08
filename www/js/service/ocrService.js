//OCR API
//Send requests to OCR API
//https://ocr.space/OCRAPI

//Creates new Service in "cupom" module
angular.module("cupom").factory("ocrApi", function($http, config){

  var _toBlob = function(dataURI){
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  }

  //Insert new cupom
  var _postImage = function(image){
    //Key to use the ORC API
    var fd = new FormData();
    var file = _toBlob(image);
    
    fd.append('apikey', 'f334ac2c0088957');
    fd.append('language', 'por');
    fd.append('file', file, "image.jpeg");

    return $http.post(config.ocrUrl, fd, {
      transformRequest: angular.identity,
      headers:{'Content-Type': undefined}
    });
  };

  //Return functions to be used
  return{
    postImage: _postImage,
  };
});
