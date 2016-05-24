(function() {
  'use strict';

  function loginBox($ionicScrollDelegate) {
    return {
      restrict: 'AE',
      scope: {},
      templateUrl: 'view/login.tpl.html',
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
        };

        $scope.$on('loginBox:show', function(event) {
          login.fadeIn('fast', function() {
            
            var viewport = (login.offset().top - ((screen.height - login.height()) * 0.5));
            $ionicScrollDelegate.$getByHandle('viewport').scrollBy(0, viewport, true);
            
          });
        });

      }
    };
  }

  function modalSearch($ionicModal) {

      return {
      restrict: 'AE',
      scope: {},
      controller: function($rootScope, $scope, $element, $attrs, $http) {

        $scope.modal = $ionicModal.fromTemplateUrl('view/search.tpl.html', {
          animation: 'slide-in-up',
          scope: $scope
        });

        $scope.modal.action = function(val) {
          this.then(function(response){
            response[val]();
          });
        };

        $scope.search = {
          input: '',
          cache: null,
          results: null,
          request: function(val) {
            clearTimeout(this.cache);
            this.cache = setTimeout(function(){

              $http({
                method: 'GET',
                headers: {
                  'Access-Control-Allow-Origin': '*'
                },
                url: 'data/data.json',
              }).then(function(response) {
                $scope.search.results = response.data.results;
                console.log($scope.search.results);
              }, function(error) {});

            },  1000);
          }
        };

        $rootScope.$on('modalSearch:show', function(event) {
          $scope.modal.action('show');
        });

        $rootScope.$on('modalSearch:hide', function(event) {
          $scope.modal.action('hide');
        });

      }
    };
  }

  angular
    .module('app.directive', [])
    .directive('loginBox', ['$ionicScrollDelegate', loginBox])
    .directive('modalSearch', ['$ionicModal', modalSearch]);

}());