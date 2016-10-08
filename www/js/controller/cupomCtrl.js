//Cupom controller
//Manage Cupom template

//Creates new Controller in "cupom" module
angular.module('cupom').controller('cupomCtrl', function($scope, $rootScope, $location, $timeout, cupomApi) {

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
    $scope.cupom.valor = $scope.cupom.valor.replace("R$", "");
    //Post Cupom on Backend
    //cupomApi.postCupom($scope.cupom).success(function(){

      //Change focus back to COO field
      $scope.changeFocus("coo");

      //Clean Form
      $scope.cupomForm.$setPristine();

      //Clean Fields after focus is on COO
      $timeout(function(){
        $scope.err   = {};
        $scope.cupom = {};
      },100);
    //});
  };

  //Cupom
  $scope.cupom = {};

  //Watchs Root Scope for new Cupom
  $rootScope.$watch("cupom", function(cupom){
    //Get Cupom from Photo
    if(cupom){
      //Put Cupom on scope
      $scope.cupom = cupom;
    }
  });

  //Errors
  $scope.err   = {};
});
