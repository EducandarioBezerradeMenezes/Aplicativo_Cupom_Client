//Money mask directive
//Ex: R$ 999,99

angular.module("cupom").directive("uiMoney",function(){

  return{
    //Requires the ngModel Directive
    require: "ngModel",

    link: function(scope, element, attrs, ctrl){

      //Function to format the date
      var _formatMoney = function(money = ""){

        //if empty return empty
        if(money=="R$") return "";

        //replace dot for comma
        money = money.replace(/[^\d]*[,]*/g,"");

        if(money.length > 2){
          money = money.substring(0,money.length - 2) + ',' + money.substring(money.length-2);
        }

        //add R$ and remove anything that is not a number, comma
        money = "R$ " + money;

        //return money formated
        return money;
      };

      //When a key is pressed do
      element.bind("keyup", function(){
        //change the value to the new formated value
        ctrl.$setViewValue(_formatMoney(ctrl.$viewValue));
        //render the formated value
        ctrl.$render();

        //What will be passed to scope
        ctrl.$parsers.push(function(money = ""){

          money = money.toString();

          //Format to number
          money = money.replace(/[,]+/g, '.');
          money = money.replace(/[^0-9.]+/g,"");

          //Return money as number
          return parseFloat(money);
        });
      });
    },
  };
});
