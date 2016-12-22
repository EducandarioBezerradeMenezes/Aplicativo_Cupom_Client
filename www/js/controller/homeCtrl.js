//Home controller
//Manage Home template

//Creates new Controller in "cupom" module
angular.module('cupom').controller('homeCtrl', function($scope, $rootScope, cupomApi) {

  //Save QrCode on server
  $scope.saveQr = () => {

    // hide body
    angular.element(document.querySelector('body')).css('display', 'none');

    // open camera and scan qrcode
    QRScanner.prepare();
    QRScanner.scan((err, qrCode) => {

      // show body
      angular.element(document.querySelector('body')).css('display', 'block');

      // return error
      

      // formats qrcode
      qrCode = qrCode.split('|')[0];

      // testing
      if(qrCode == 32) alert(qrCode);
      if(qrCode != 32) alert('Erro!!!');
    });
    // show camera
    QRScanner.show();
  }
});
