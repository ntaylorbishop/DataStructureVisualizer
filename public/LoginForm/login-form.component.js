
angular.module('DataStructureVisualizer').
component('loginForm', {
  templateUrl: 'LoginForm/login-form.html'
});

angular.module('DataStructureVisualizer').
controller("LoginShowController", function($scope, $rootScope) {
  
  $scope.toggleLoginForm = function() {

    $rootScope.show = ! $rootScope.show;
    console.log($rootScope.show);
  }

  $scope.isLoginFormShown = function() {

    console.log($rootScope.show);
    return $rootScope.show;
  }
});