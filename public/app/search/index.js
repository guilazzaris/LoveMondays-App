(function() {
  'use strict';

  function modalSearch($ionicModal) {

	    return {
			restrict: 'AE',
			scope: {},
			controller: function($rootScope, $scope, $element, $attrs, $http) {

				$scope.modal = $ionicModal.fromTemplateUrl('app/search/template.html', {
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
          result: null,
          request: function(val) {
            clearTimeout(this.cache);
            this.cache = setTimeout(function(){

              $http({
                method: 'GET',
                headers: {
                  'Access-Control-Allow-Origin': '*'
                },
                url: 'https://www.lovemondays.com.br/pesquisa/empresa/autocomplete?q=' + val,
              }).then(function(response) {
                console.log(response);
              }, function(error) {
                console.log(error);
              });

            },  1000);
          }
        };

				$rootScope.$on('search:show', function(event) {
					$scope.modal.action('show');
				});

				$rootScope.$on('search:hide', function(event) {
					$scope.modal.action('hide');
				});

			}
		};

	}

  angular.module('app.search', [])
    .directive('modalSearch', ['$ionicModal', modalSearch]);

}());