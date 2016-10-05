//cnpj mask directive
//Ex: 999.999.999-99

//Creates new Directive in "cupom" module
angular.module("cupom").directive("uiCnpj",function(){
  return{
    //Requires the ngModel Directive
    require: "ngModel",

    link: function(scope, element, attrs, ctrl){
      //Function to format the cnpj
      var _formatCnpj = function(cnpj){

        //if empty return empty
        if(!cnpj) return cnpj;

        //live only numbers
        cnpj = cnpj.replace(/[^0-9]+/g,"");

        //insert the ".","/","-"
        if(cnpj.length>2){
          cnpj = cnpj.substring(0,2) + "." + cnpj.substring(2);
        };
        if(cnpj.length>6){
          cnpj = cnpj.substring(0,6) + "." + cnpj.substring(6);
        };
        if(cnpj.length>10){
          cnpj = cnpj.substring(0,10) + "/" + cnpj.substring(10);
        };
        if(cnpj.length>15){
          cnpj = cnpj.substring(0,15) + "-" + cnpj.substring(15);
        };

        //limit length to 18 digits
        if(cnpj.length>18){
          cnpj = cnpj.substring(0,18);
        };

        //return formated cnpj
        return cnpj;
      };

      //When a key is pressed do
      element.bind("keyup", function(){
        //change the value to the new formated value
        ctrl.$setViewValue(_formatCnpj(ctrl.$viewValue));
        //render the formated value
        ctrl.$render();
      });
    },
  };
});
