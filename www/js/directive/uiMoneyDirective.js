//Money mask directive
//Ex: R$ 999,99

angular.module("cupom").directive("uiMoney",function(){

  return{
    //Requires the ngModel Directive
    require: "ngModel",

    link: function(scope, element, attrs, ctrl){

      //Function to format the date
      var _formatMoney = function(money){

        //if empty return empty
        if(!money || money=="R$") return "";

        //replace dot for comma
        money = money.replace(/[\.]/g,",");

        //add R$ and remove anything that is not a number, comma
        money = "R$ " + money.replace(/[^0-9,\,,\.]+/g,"");

        //enable only 2 digits after a comma
        if(money.indexOf(",")!=-1){
          money = money.substring(0,money.indexOf(",")+3);
        };

        //comma or dot can't be first digit
        if(money.indexOf(",")<4 && money.indexOf(",")>0){
          money = money.substring(0,3) + "0" + money.substring(3);
        }

        //only 1 comma
        money = money.substring(0,money.indexOf(",")+1) + money.substring(money.indexOf(",")+1).replace(/[\,]/,"");

        //return money formated
        return money;
      };

      //When a key is pressed do
      element.bind("keyup", function(){
        //change the value to the new formated value
        ctrl.$setViewValue(_formatMoney(ctrl.$viewValue));
        //render the formated value
        ctrl.$render();
      });

      //what will be returned to the scope
      ctrl.$parsers.push(function(money){
        //removes "R$"
        money = money.replace("R$","");
        //Replaces "," for "."
        money = money.replace(/[\,]/,".");

        //return  money as number
        return money;
      });
    },
  };
});
