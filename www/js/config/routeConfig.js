//Routes Configuration
//Creates the Routes/States

//Creates new Config in "cupom" module
angular.module("cupom").config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in folder controller
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  //Route for Home Tab
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'homeCtrl'
      }
    }
  })

  //Route for Cupom Tab
  .state('tab.cupom', {
    url: '/cupom',
    views: {
      'tab-cupom': {
        templateUrl: 'templates/tab-cupom.html',
        controller: 'cupomCtrl'
      }
    }
  })

  //Route for Sobre Tab
  .state('tab.sobre', {
    url: '/sobre',
    views: {
      'tab-sobre': {
        templateUrl: 'templates/tab-sobre.html',
      }
    }
  })

  //Route for Photo Tab
  .state('tab.photo', {
    url: '/photo',
    views: {
      'tab-photo': {
        templateUrl: 'templates/tab-photo.html',
        controller: 'photoCtrl'
      }
    }
  });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
