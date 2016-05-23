(function() {
  'use strict';

  function profileCtrl($scope, $rootScope) {
    $scope.loginBox = function(val) {
      if(val == 'show') {
        $scope.$broadcast('loginBox:show');
      }
    }
  }

  function profileDirective($ionicScrollDelegate) {
    return {
      restrict: 'AE',
      scope: {},
      templateUrl: 'app/profile/login.html',
      controller: function($scope, $element, $attrs) {

        var login = angular.element('.login'),
            email = angular.element('.open'),
            form = angular.element('.form');

        $scope.openForm = function() {
          email.hide(0, function() {
            form.fadeIn();
            
            var viewport = (login.offset().top - ((screen.height - login.height()) * 0.5));
            $ionicScrollDelegate.$getByHandle('viewport').scrollBy(0, viewport, true);

          });
        }

        $scope.$on('loginBox:show', function(event) {
          login.fadeIn('fast', function() {
            
            var viewport = (login.offset().top - ((screen.height - login.height()) * 0.5));
            $ionicScrollDelegate.$getByHandle('viewport').scrollBy(0, viewport, true);
            
          });
        });

      }
    }
  }

  angular.module('app.profile', [])
    .controller('profileCtrl', ['$scope', profileCtrl])
    .directive('profileDirective', ['$ionicScrollDelegate', profileDirective])
    .config(function($stateProvider) {
      $stateProvider

      .state('app.profile', {
        url: '/profile',
        views: {
          'menuContent': {
            templateUrl: 'app/profile/template.html',
            controller: 'profileCtrl'
          }
        }
      });
    });

}());