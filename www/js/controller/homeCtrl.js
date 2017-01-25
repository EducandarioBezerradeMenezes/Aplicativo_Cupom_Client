//Home controller
//Manage Home template

//Creates new Controller in "cupom" module
angular.module('cupom').controller('homeCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaFlashlight, $cordovaBarcodeScanner, $ionicPopup, cupomApi) {

  $scope.scanBarcode = function() {

    // $cordovaFlashlight.switchOn()
    // .then(
    //   function (success) { console.error("sim"); },
    //   function (error) { console.error("nao" + error) });

    $ionicPlatform.ready(function() {
      $cordovaBarcodeScanner.scan().then(function(imageData) {
          //Show Spinner
          $scope.sending = true;
          console.error("Image data -> " + imageData.text);
          //Replace qrCode
          qrCode = imageData.text.split('|')[0];
          console.error("qrCode -> " + qrCode);
          qrCode = qrCode.replace(/CFe/g, '');

          if( qrCode.length == 44 || qrCode.length == 45 ) {
            cupomApi.postQrCode(qrCode).then(function(result){
                //Close Spinner
                $scope.sending = false;
                $scope.showAlertSucess();
            }).catch(function(result){
                alert("Falha no envio.");
              });
          }
          else {
              //Close Spinner
              $scope.sending = false;
              console.error("else -> " + qrCode);
              qrCode ? $scope.showAlertFalha(): '';
          }
      }, function(error) {
          $scope.showAlertFalha();
          console.error("Falha na leitura...");
      });

      //Close Spinner
      $scope.sending = false;
    });

    //     $cordovaFlashlight.switchOff()
    // .then(
    //   function (success) { console.error("batata"); },
    //   function (error) { console.error("quente"); });
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

  //Show Alert with sucess image
  $scope.showAlertFalha = function() {

  //Creating Alert
  var alertPopupFalha = $ionicPopup.alert({

    //Text to appear on Alert
    title: 'Encontramos um problema',

    //HTML of Alert
    template: `
      <!-- Send info qrCode error -->
      <center><img src="img/error.png" class="cupomError" alt="Falha na Leitura" /><center />
      Falha ao ler o cupom,, tente novamente ou insira manualmente o cupom.
      <br>
      Clique em OK para sair.
      `
  });
};

});
