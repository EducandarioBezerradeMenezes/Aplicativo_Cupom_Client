//Date mask directive
//Ex: DD/MM/AAAA

//Creates new Directive in "cupom" module
angular.module("cupom").directive("uiDate",function(){
  return{
    //Requires the ngModel Directive
    require: "ngModel",

    link: function(scope, element, attrs, ctrl){
      //Function to format the date
      var _formatDate = function(date){
        //if empty return empty
        if(!date) return date;

        //live only numbers
        date = date.replace(/[^0-9]+/g,"");

        //insert the "/"
        if(date.length>2){
          date = date.substring(0,2) + "/" + date.substring(2);
        };
        if(date.length>5){
          date = date.substring(0,5) + "/" + date.substring(5);
        };
        //limit length to 10 digits
        if(date.length>10){
          date = date.substring(0,10);
        };

        //return the formated date
        return date;
      };

      //When a key is pressed do
      element.on("keyup", function(){
        //change the value to the new formated value
        ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
        //render the formated value
        ctrl.$render();
      });
    },
  };
});
