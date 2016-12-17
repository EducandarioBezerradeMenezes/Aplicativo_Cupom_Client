//Configuration Value
//Sets the Url Value


//Creates new Value in "cupom" module
angular.module("cupom").value("config",{

  //Connect to server
  baseUrl:"http://cupomapi.herokuapp.com",
  ocrUrl :"https://api.ocr.space/parse/image",
});
