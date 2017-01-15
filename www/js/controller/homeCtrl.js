//Home controller
//Manage Home template

//Creates new Controller in "cupom" module
angular.module('cupom').controller('homeCtrl', function($scope, $rootScope, $cordovaBarcodeScanner, $ionicPopup, cupomApi) {

  // //Save QrCode on server
  // $scope.saveQr = () => {
  //
  //   // hide body
  //   angular.element(document.querySelector('body')).css('display', 'none');
  //
  //   // open camera and scan qrcode
  //   QRScanner.prepare();
  //   QRScanner.scan((err, qrCode) => {
  //
  //     // show body
  //     angular.element(document.querySelector('body')).css('display', 'block');
  //
  //     // return error
  //
  //
  //     // formats qrcode
  //     qrCode = qrCode.split('|')[0];
  //
  //     // testing
  //     if(qrCode == 32) alert(qrCode);
  //     if(qrCode != 32) alert('Erro!!!');
  //   });
  //   // show camera
  //   QRScanner.show();
  // }

  $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            qrCode = imageData.text.split('|')[0];

            if( qrCode.length == 44 ) {
              console.log(qrCode);
              $scope.showAlertSucess();
            }
            console.log(qrCode);
            alert(qrCode);

        }, function(error) {
            console.alert("Falha na leitura");
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
