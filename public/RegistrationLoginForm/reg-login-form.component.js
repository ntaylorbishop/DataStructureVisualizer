
angular.module('DataStructureVisualizer').
component('regLoginForm', {
  templateUrl: 'RegistrationLoginForm/reg-login-form.html'
});

angular.module('DataStructureVisualizer').
controller("RegLoginController", function($scope, $rootScope) {
  
  $scope.toggleRegLoginForm = function() {
    $rootScope.RegLoginForm.showForm = ! $rootScope.RegLoginForm.showForm;
  }

  $scope.isRegLoginFormShown = function() {
    return $rootScope.RegLoginForm.showForm;
  }
});

angular.module("DataStructureVisualizer").
controller("RegLoginToggleForms", function($scope) {

  updateRegistrationText();

  function updateRegistrationText() {
    $scope.registrationText = $rootScope.RegLoginForm.isOnLoginForm ? 'Need to create an account?' : '';    
  }

  $scope.switchToRegistration = function() {
    $rootScope.RegLoginForm.isOnLoginForm = false;
    updateRegistrationText();
  }
});