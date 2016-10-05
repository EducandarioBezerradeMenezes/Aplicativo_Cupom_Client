//Cupom API
//Send requests to server

//Creates new Service in "cupom" module
angular.module("cupom").factory("cupomApi", function($http, config){

  //Insert new cupom
  var _postCupom = function(cupom){

    return $http.post(config.baseUrl + "/Cupom", cupom);
  };

  //Return functions to be used
  return{
    postCupom:_postCupom,
  };
});
