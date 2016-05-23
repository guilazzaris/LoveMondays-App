angular.module('app', [
  'ionic',
  'app.profile',
  'app.search'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
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
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  $scope.search = function(val) {
    if(val == 'show') {
      $scope.$emit('search:show');
    }
  }

});