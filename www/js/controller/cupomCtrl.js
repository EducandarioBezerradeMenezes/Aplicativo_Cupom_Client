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

  //Checks if date has already passed
  $scope.checkDate = function(data){

    var array = data.split("/");
    data = new Date(array[2],array[1]-1, array[0]);
    if(data!=null && data< new Date()) return true;

    else return false;
  }

  //Save a new Cupom
  $scope.saveCupom = function(){

    $scope.sending = true;

    $scope.cupom.valor = $scope.cupom.valor.replace("R$", "");
    //Post Cupom on Backend
    cupomApi.postCupom($scope.cupom).success(function(){

      $scope.sending = false;

      //Change focus back to COO field
      $scope.changeFocus("coo");

      //Clean Form
      $scope.cupomForm.$setPristine();

      //Clean Fields after focus is on COO
      $timeout(function(){
        $scope.err   = {};
        $scope.cupom = {};
      },100);
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


  //Cupom
  $scope.cupom = {};

  //Errors
  $scope.err   = {};

  //Call Alert to inform user
  $scope.showAlert();
});
