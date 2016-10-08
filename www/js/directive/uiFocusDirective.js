//Focus Directive
//Gives focus to an Element

//Creates new Directive in "cupom" module
angular.module("cupom").directive("uiFocus",function(){
  return{
    /*
      E = Element
      A = Attribute
      C = Class
      M = Comment
    */
    restrict:"A",

    //Functions to be executed by this directive
    link: function(scope, element, attrs, ctrl){

      //Check scope variable "focus"
      scope.$watch("focus", function(value){
        //Gives focus to the element with specific ID
        if(attrs.name == value) element[0].focus();
      });
    },
  };
});
