//Configuration Value
//Sets the Url Value


//Creates new Value in "cupom" module
angular.module("cupom").value("config",{

  //Connect to server
  baseUrl:"http://192.168.25.32:8080",
  ocrUrl :"https://api.ocr.space/parse/image",
});
