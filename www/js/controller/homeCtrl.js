//Home controller
//Manage Home template

//Creates new Controller in "cupom" module
angular.module('cupom').controller('homeCtrl', function($scope, $rootScope, $cordovaBarcodeScanner, $ionicPopup, cupomApi) {

  $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            //Show Spinner
            $scope.sending = true;

            //Replace qrCode
            qrCode = imageData.text.split('|')[0];
            qrCode = qrCode.replace(/[CFe]{1}/g, '');

            if( qrCode.length == 44 || qrCode.length == 45 ) {
              cupomApi.postQrCode(qrCode).then(function(result){
                  //Close Spinner
                  $scope.sending = true;
                  $scope.showAlertSucess();
              }).catch(function(result){
                  alert("Falha no envio.");
                });
            }
            else {
                //Close Spinner
                $scope.sending = false;
                alert("Falha na leitura." );
            }
        }, function(error) {
            console.error("Falha na leitura...");
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

});
