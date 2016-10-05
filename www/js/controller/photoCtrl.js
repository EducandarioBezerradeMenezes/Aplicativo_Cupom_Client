//Photo controller
//Controls Tab-Photo View

//Creates new Controller in "cupom" module
angular.module('cupom').controller('photoCtrl', function($scope, $location, ocrApi) {

  //Send cupom image
  var sendCupom = function(file){
    //Recive cupom text
    ocrApi.postImage(file).success(function(txtCupom){
      $scope.cupom = txtCupom;
    });
  }

  //Take Picture
  $scope.takePhoto = function(){
    navigator.camera.getPicture(function(photo){

      //Image
      image.src = photo;

      //Send Taken Photo to OCR API
      //sendCupom(photo);

      //Reload TAB
      $location.path($location.path());

      //Error
    }, function(err){
      $scope.err = err;


    }, options);
  };

  //Photo Options
  var options = {
    quality: 50,
    destinationType: 1 /*FILE_URI*/,
    correctOrientation: true
  }

  //Cupom Text
  $scope.text = "";

  //Cupom
  $scope.cupom = {};

  //Take Photo when Tab open
  $scope.takePhoto();

});
