(function() {
  'use strict';

  function AppCtrl($scope) {
    $scope.search = function(val) {
      if(val == 'show') {
        $scope.$emit('modalSearch:show');
      }
    }
  }

  function ProfileCtrl($scope) {
    $scope.loginBox = function(val) {
      if(val == 'show') {
        $scope.$broadcast('loginBox:show');
      }
    }
  }

  angular
    .module('app.controller', [])
    .controller('AppCtrl', AppCtrl)
    .controller('ProfileCtrl', ProfileCtrl);

}());