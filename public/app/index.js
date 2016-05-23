angular.module('app', ['ionic', 'app.profile'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/template.html',
      controller: 'AppCtrl'
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/profile');
  
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {});