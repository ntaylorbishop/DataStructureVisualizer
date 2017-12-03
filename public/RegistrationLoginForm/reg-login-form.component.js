
angular.module('DataStructureVisualizer').
component('regLoginForm', {
  templateUrl: 'RegistrationLoginForm/reg-login-form.html'
});

angular.module('DataStructureVisualizer').
controller("RegLoginController", function($scope, $rootScope, $http) {

  //Show / hide login form
  $scope.toggleRegLoginForm = function() {
    $rootScope.RegLoginForm.showForm = ! $rootScope.RegLoginForm.showForm;
    
    if($rootScope.RegLoginForm.showForm == true) {
      $rootScope.RegLoginForm.isOnLoginForm = true;
    }
  }
  
  $scope.isRegLoginFormShown = function() {
    return $rootScope.RegLoginForm.showForm;
  }

  $scope.$watch('$root.RegLoginForm.isOnLoginForm', function() {

    if($rootScope.RegLoginForm.isOnLoginForm == true) {
      $scope.registrationText = 'Need to create an account?'; 
      $scope.formHeader = 'Please log in';
      $scope.submitBtn = 'Login';
      $scope.errMsg = '';
    }
    else {
      $scope.registrationText = ''; 
      $scope.formHeader = 'Make an account';
      $scope.submitBtn = 'Register';
      $scope.errMsg = '';
    }
  });

  $scope.switchToRegistration = function() {
    $rootScope.RegLoginForm.isOnLoginForm = false;
  }

  //Validation
  $scope.username = 'username';
  $scope.password = 'password';
  $scope.isSubmitting = false;

  $scope.validateInputAndSubmit = function() {

    var isValid = true;

    if($scope.password.length == 0 || ($scope.password == 'password' && $rootScope.RegLoginForm.isOnLoginForm == true)) {
      $scope.errMsg = 'Please enter a password';
      isValid = false;
    }
    if($scope.password.length <= 6) {
      $scope.errMsg = 'Password must be longer than 6 characters';
      isValid = false;
    }
    if($scope.username.length >= 15) {
      $scope.errMsg = 'User must be less than 15 characters';
      isValid = false;
    }
    if($scope.username.length == 0 || $scope.username == 'username') {
      $scope.errMsg = 'Please enter a username';
      isValid = false;
    }
    if($scope.username.length >= 20) {
      $scope.errMsg = 'Username must be less than 20 characters';
    }

    if(isValid == false) {
      return;
    }

    $scope.errMsg = '';

    if($rootScope.RegLoginForm.isOnLoginForm == true) {
      submitLogin();
    }
    else {
      submitRegistration();
    }
  }

  //Submitting
  function submitLogin() {
    $scope.isSubmitting = true;

    $http.get('/api/user')
    .success(function(data) {
        console.log(data);
        console.log("success!");
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
  }

  function submitRegistration() {
    $scope.isSubmitting = true;    
  }
});