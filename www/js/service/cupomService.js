//Cupom API
//Send requests to server

//Creates new Service in "cupom" module
angular.module("cupom").factory("cupomApi", function($http, config){

  //Insert new cupom
  var _postCupom = (cupom) => {

    return $http.post(config.baseUrl + "/Cupom", cupom);
  };

  //Insert new QrCode
  var _postQrCode = (qrCode) => {

    return $http.post(config.baseUrl + "/Chave");
  }

  //Return functions to be used
  return{
    postCupom:_postCupom,
    postQrCode: _postQrCode
  };
});
