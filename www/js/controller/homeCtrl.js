//Home controller
//Manage Home template

//Creates new Controller in "cupom" module
angular.module('cupom').controller('homeCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaFlashlight, $cordovaBarcodeScanner, $ionicPopup, cupomApi) {

  $scope.scanBarcode = function() {

    $ionicPlatform.ready(function() {
      $cordovaBarcodeScanner.scan().then(function(imageData) {
          //Show Spinner
          $scope.sending = true;
          console.log("Image data -> " + imageData.text);
          console.log("Image data -> " + imageData.format);
          //Replace qrCode
          qrCode = imageData.text.split('|')[0];
          console.error("qrCode -> " + qrCode);
          qrCode = qrCode.replace(/CFe/g, '');

          if( qrCode.length == 44 || qrCode.length == 45 ) {

            var objQrCode = {};

            objQrCode.valor = qrCode;

            cupomApi.postQrCode(objQrCode).then(function(result){
                //Close Spinner
                $scope.sending = false;
                $scope.showAlertSucess();
            }).catch(function(result){
                $scope.sending = false;
                qrCode ? $scope.showAlertFalha(): '';
              });
          }
          else {
              //Close Spinner
              $scope.sending = false;
              qrCode ? $scope.showAlertFalha(): '';
          }
      }, function(error) {
          $scope.sending = false;
          $scope.showAlertFalha();
      } );
      //Close Spinner
      $scope.sending = false;
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
      Falha ao ler o cupom, tente novamente ou insira manualmente o cupom.
      <br>
      Clique em OK para sair.
      `
  });
};

});
