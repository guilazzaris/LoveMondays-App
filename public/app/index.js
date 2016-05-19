angular.module('app', ['ionic', 'app.profile'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/index.tpl.html',
      controller: 'AppCtrl'
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/profile');
  console.log('app');
})
.run(function() {console.log('app')})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {});