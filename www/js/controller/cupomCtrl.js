//Cupom controller
//Manage Cupom template

//Creates new Controller in "cupom" module
angular.module('cupom').controller('cupomCtrl', function($scope, $rootScope, $location, $timeout, $ionicPopup, cupomApi) {

  //Change focus to element with specific ID
  $scope.changeFocus = function(name){
    $scope.focus = name;
    $timeout(function(){
      $scope.focus = "";
    },100);
    return 0;
  }

  //Warn about invalid value
  $scope.invalid = function(name){

    $scope.cupom[name] = "";
    $scope.err[name] = name + " invalid!";
  }

  //Verify Month of Date
  var checkMonth = function(date, day){

    //Not a Date
    if(!(date instanceof Date)) return false;

    //Get Day, Month and Year of Data
    const vDate = {
      day:   date.getDate(),
      month: date.getMonth(),
      year:  date.getFullYear()
    }

    //Get Day, Month and Year of Current Date
    const cDate = {
      day:   new Date().getDate(),
      month: new Date().getMonth(),
      year:  new Date().getFullYear()
    }

    //No Day to Validate or Same Month
    if(typeof day != 'number' || vDate.month == cDate.month) return true;

    //Day to Validate
    else {

      //Turn month 12 to Month 0 of next year
      if(vDate.month == 12) {
        vDate.month = 0;
        vDate.year += 1;
      }

      if((cDate.day < day) && (vDate.month == (cDate.month-1)) && (vDate.year == cDate.year)) return true;
    }

    //Return false if everything elses fail
    return false;
  }

  //Function Aquired Online
  $scope.checkCNPJ = function(cnpj = "") {

    cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;

    return true;
  }

  //Validate Data
  $scope.checkDate = function(data){

    //Future
    if(new Date() < data) return false;

    //Validate Month
    return checkMonth(data, 20);
  }

  //Save a new Cupom
  $scope.saveCupom = function(cupom){

    //Sending Cupom to BackEnd
    $scope.sending = true;

    //Post Cupom on Backend
    cupomApi.postCupom(cupom).then(function(){

      //Cupom Sent to BackEnd
      $scope.sending = false;

      //Inform Success to User
      $scope.showAlertSucess();


      //Change focus back to COO field
      $scope.changeFocus("coo");

      //Clean Form
      $scope.cupomForm.$setPristine();

      //Clean Fields after focus is on COO
      $timeout(function(){
        $scope.err = {};
        $scope.cupom = {};
      },100);
    }).catch(function(erro){
        $scope.sending = false;
    });
  };

  //Show Alert with cupom image
  $scope.showAlert = function() {

  //Creating Alert
  var alertPopup = $ionicPopup.alert({

    //Text to appear on Alert
    title: 'Insira os campos informados a seguir!',


    //HTML of Alert
    template: `
      <!--Image of a cupom and it's fields-->
      <img src="img/cupom.jpg" class="cupomAlert" alt="Foto contendo as informações relacionadas ao preenchimento manual do cupom" />
    `
    });
  };

  //Show Alert with sucess image
  $scope.showAlertSucess = function() {

  //Creating Alert
  var alertPopupSucess = $ionicPopup.alert({

    //Text to appear on Alert
    title: 'Doação Completa',


    //HTML of Alert
    template: `
      <!-- Send info cupom done -->
      <img src="img/sucess.png" class="cupomSucess" alt="Cadastro sucesso" />
    `
  });
};

  //Cupom
  $scope.cupom = {};

  //Errors
  $scope.err   = {};

  //Call Alert to inform user
  $scope.showAlert();
});
