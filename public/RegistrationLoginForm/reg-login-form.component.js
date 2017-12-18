
angular.module('DataStructureVisualizer').
component('regLoginForm', {
  templateUrl: 'RegistrationLoginForm/reg-login-form.html'
});

angular.module('DataStructureVisualizer').
controller("RegLoginController", function($scope, $rootScope, $http, userService, structureDataService, loginFormService, userService) {

  //Show / hide login form
  $scope.toggleRegLoginForm = function() {

    loginFormService.SetShowForm(!loginFormService.GetShowForm());

    if(loginFormService.GetShowForm() == true) {
      loginFormService.SetIsOnLoginForm(true);
    }
}

  $scope.isRegLoginFormShown = function() {
    return loginFormService.GetShowForm();
  }

  function SubscribeToIsOnLoginForm() {

    if(loginFormService.GetIsOnLoginForm() == true) {
      $scope.registrationText = 'Need to create an account?'; 
      $scope.formHeader = 'Please log in';
      $scope.submitBtn = 'Login';
      $scope.outputMsg = '';
    }
    else {
      $scope.registrationText = ''; 
      $scope.formHeader = 'Make an account';
      $scope.submitBtn = 'Register';
      $scope.outputMsg = 'NOTE: Info you submit is NOT safe';
    }
  }
  loginFormService.registerCallbackToIsOnLoginForm(SubscribeToIsOnLoginForm);

  $scope.switchToRegistration = function() {
    loginFormService.SetIsOnLoginForm(false);
  }

  //Validation
  $scope.username = 'username';
  $scope.password = 'password';
  $scope.isSubmitting = false;

  $scope.validateInputAndSubmit = function() {

    var isValid = true;

    if($scope.password.length == 0 || ($scope.password == 'password' && loginFormService.GetIsOnLoginForm() == true)) {
      $scope.outputMsg = 'Please enter a password';
      isValid = false;
    }
    if($scope.password.length <= 6) {
      $scope.outputMsg = 'Password must be longer than 6 characters';
      isValid = false;
    }
    if($scope.username.length >= 15) {
      $scope.outputMsg = 'User must be less than 15 characters';
      isValid = false;
    }
    if($scope.username.length == 0 || $scope.username == 'username') {
      $scope.outputMsg = 'Please enter a username';
      isValid = false;
    }
    if($scope.username.length >= 20) {
      $scope.outputMsg = 'Username must be less than 20 characters';
    }

    if(isValid == false) {
      return;
    }

    $scope.outputMsg = '';

    if(loginFormService.GetIsOnLoginForm() == true) {
      submitLogin();
    }
    else {
      submitRegistration();
    }
  }

  //Submitting
  function submitLogin() {
    $scope.isSubmitting = true;

    var userData = {
      username : $scope.username,
      password : $scope.password
    };

    $http.post('/api/user/login', userData)
    .success(function(data) {

      if(data.doesExist == false) {
        $scope.outputMsg = 'Username does not exist.';
      }
      else {
        $scope.outputMsg = data.outputMsg;
        userService.SetUsername($scope.username);
        setTimeout(closeFormAndUpdateHeader, 1000);
      }

      $scope.isSubmitting = false;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
  }

  function submitRegistration() {
    $scope.isSubmitting = true;

    var userData = {
      username : $scope.username,
      password : $scope.password
    };

    $http.post('/api/user/register', userData)
    .success(function(data) {
      
      if(data.accountCreated == false) {
        $scope.outputMsg = data.outputMsg;
      }
      else {
        $scope.outputMsg = data.outputMsg;
        userService.SetUsername($scope.username);
        setTimeout(closeFormAndUpdateHeader, 1000);      
      }

      $scope.isSubmitting = false;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
  }

  function closeFormAndUpdateHeader() {
    userService.SetIsLoggedIn(true);
    loginFormService.SetShowForm(false);
    $rootScope.$apply();
  }
});