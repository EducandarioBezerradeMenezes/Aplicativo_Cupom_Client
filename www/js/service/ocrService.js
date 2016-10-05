//OCR API
//Send requests to OCR API
//https://ocr.space/OCRAPI

//Creates new Service in "cupom" module
angular.module("cupom").factory("ocrApi", function($http, config){

  //Insert new cupom
  var _postImage = function(image){
    //Key to use the ORC API
    fd = new FormData();

    fd.append('apiKey', 'f334ac2c0088957');
    fd.append('language', 'por');
    fd.append('file', image);

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
