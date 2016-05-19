angular.module('app.profile', [])
.config(function($stateProvider) {
  $stateProvider

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'app/profile/index.tpl.html',
        controller: 'ProfileCtrl'
      }
    }
  });
  console.log('app.profile');
})
.run(function() {console.log('app.profile')})
.controller('ProfileCtrl', function($scope) {});