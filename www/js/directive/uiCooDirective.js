//coo mask directive
//Ex: 999999

//Creates new Directive in "cupom" module
angular.module("cupom").directive("uiCoo",function(){
  return{
    //Requires the ngModel Directive
    require: "ngModel",

    link: function(scope, element, attrs, ctrl){
      //Function to format the coo
      var _formatCoo = function(coo = ""){

        //live only numbers
        coo = coo.replace(/[^0-9]+/g,"");

        //limit length to 6 digits
        if(coo.length>6){
          coo = coo.substring(0,6);
        };

        //return formated coo
        return coo;
      };

      //When a key is pressed do
      element.bind("keyup", function(){
        //change the value to the new formated value
        ctrl.$setViewValue(_formatCoo(ctrl.$viewValue));
        //render the formated value
        ctrl.$render();
      });
    },
  };
});
