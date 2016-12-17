//Home controller
//Manage Home template

//Creates new Controller in "cupom" module
angular.module('cupom').controller('homeCtrl', function($scope, $rootScope, $qrScanner, cupomApi) {

  //Save QrCode on server
  $scope.saveQr = () => {

    //Scan QrCode
    $qrScanner.scan(qrCode => {

      //Useful information
      qrCode = qrCode.split('|')[0];

      //Send QrCode if correct size
      if(qrCode == 32) cupomApi.postQrCode(qrCode).success(result => {

        //Successful
        if(result == 'OK') alert('Obrigado por nos ajudar!');
        if(result != 'OK') alert('Ocorreu um erro!');
      });

      //Error in size
      if(qrCode != 32) alert('Ocorreu um erro na leitura!');
    });
  }
});
