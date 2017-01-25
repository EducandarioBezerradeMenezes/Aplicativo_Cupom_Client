//Cupom controller
//Manage Cupom template

//Creates new Controller in "cupom" module
angular.module('cupom').controller('cupomCtrl', function($scope, $rootScope, $location, $timeout, $ionicPopup, cupomApi, ionicDatePicker) {

  Number.prototype.padding = function padding(qtd) {

    let zeros = '';
    for(let i = 0; i < (qtd -1); i++) zeros += '0';
    return ((zeros + this).slice(-qtd));
  }

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

  //Minimal Valid Date
  var minimalDate = function(){

    let month = (new Date()).getMonth();
    let year = (new Date()).getFullYear();
    if((new Date()).getDate() < 20) {
      month --;

      if(month < 0) {
        month = 11;
        year--;
      }
    }

    return new Date(year, month, 1);
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
    if(!data) return false;

    data = data.split('/');
    console.error(data[2] + " - " + (xdata[1] - 1) + " - " + data[0]);
    data = new Date(data[2], data[1] - 1, data[0]);

    return data > minimalDate() && data <= (new Date());
  }

  $scope.chooseDate = function() {

    const month = (new Date()).getDate() > 20 ? (new Date()).getMonth() -1 : (new Date()).getMonth();
    ionicDatePicker.openDatePicker({callback: function(date){
        date = new Date(date);
        $scope.cupom.data = date.getDate().padding(2) + '/' + (date.getMonth() + 1).padding(2) + '/' + date.getFullYear().padding(4);
      },
      from: minimalDate(),
      to: new Date(),
    });
  }

  //Save a new Cupom
  $scope.saveCupom = function(cupom){

    //Sending Cupom to BackEnd
    $scope.sending = true;

    //Post Cupom on Backend
    cupomApi.postCupom(angular.copy(cupom)).then(function(){

      //Cupom Sent to BackEnd
      $scope.sending = false;

      //Inform Success to User
      $scope.showAlertSucess();


      //Change focus back to COO field
      $scope.changeFocus("coo");

      //Clean Form
      $scope.cupomForm.$setPristine();

      //Clean Fields after focus is on COO
      $scope.err = {};
      $scope.cupom = {};

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
