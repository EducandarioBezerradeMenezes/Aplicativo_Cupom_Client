//Photo controller
//Controls Tab-Photo View

//Creates new Controller in "cupom" module
angular.module('cupom').controller('photoCtrl', function($scope, $rootScope, $location, ocrApi) {

  //Check if date has passed
  var checkDate = function(date){

    //Create Date
    array = date.split("/");
    date = new Date(array[2], array[1]-1, array[0]);
    return date<new Date();
  }

  //Extract COO, CNPJ, DATA and VALUE
  var extractInfo = function(txtCupom){

    try{//COO

      //COO Regular Expression
      var cooExp = /\d{6}/;

      //Find COO
      if(txtCupom.toUpperCase().indexOf("COO:")!=-1)
        var txtCoo = txtCupom.substring(txtCupom.toUpperCase().indexOf("COO:"));

      //Extract COO
      var coo = cooExp.exec(txtCoo)[0];
    }catch(err){}

    try{//Data

      //Data Regular Expression
      var dataExp = /\d{2}\/\d{2}\/\d{4}/;

      //Extract data
      var data = dataExp.exec(txtCupom)[0];

      if(!checkDate(data)) data = undefined;
    }catch(err){}

    try{//CNPJ

      //CNPJ Regular Expression
      var cnpjExp = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/;

      //Extract CNPJ
      var cnpj = cnpjExp.exec(txtCupom)[0];
    }catch(err){}

    try{//Valor

      //Valor Regular Expression
      var valorExp = /\d+\,\d{2}/g;

      //Array of Values
      var valores = txtCupom.match(valorExp);

      //String to Float
      for(valor in valores){
        valores[valor] =  valores[valor].replace(",",".");
        valores[valor] = parseFloat(valores[valor]);
      }

      //Largest Value
      var valor = Math.max.apply(null,valores);

      //Back to String
      valor = "R$ " + valor.toFixed(2).replace(".",",");

    }catch(err){}

    //Return Cupom Object
    return{
      coo: coo,
      data: data,
      cnpj: cnpj,
      valor: valor
    }
  }

  //Take Picture
  $scope.takePhoto = function(){
    navigator.camera.getPicture(function(photo){

      //Image
      image.src = "data:image/jpeg;base64," + photo;

      //Send Image to OCR API
      ocrApi.postImage(image.src).success(function(txtCupom){

        //Get Text
        txtCupom = txtCupom.ParsedResults[0].ParsedText;

        //Create Cupom Object From Text
        $rootScope.cupom = extractInfo(txtCupom);

        //Reload TAB
        $location.path("tab/cupom");
      });

      //Error
    }, function(err){
      //$scope.err = err;


    }, options);
  };

  //Photo Options
  var options = {
    quality: 50,
    destinationType: 0 /*DATA_URI*/,
    correctOrientation: true
  }

  $scope.text ="";

  //Take Photo when Tab open
  $scope.takePhoto();

});
