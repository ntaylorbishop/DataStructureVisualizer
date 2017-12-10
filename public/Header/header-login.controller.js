
angular.module('DataStructureVisualizer').
controller("HeaderLoginController", function($scope, $rootScope, structureDataService, userService, loginFormService) {

    $scope.isLoggedIn = false;

    //FIX
    function subscribeToUserLogin() {
        $scope.username = userService.GetUsername();
        $scope.isLoggedIn = userService.GetIsLoggedIn();        
    }
    userService.registerCallbackToIsLoggedIn(subscribeToUserLogin);

    function subscribeToUsernameChange() {
        $scope.isLoggedIn = userService.GetIsLoggedIn();        
        $scope.username = userService.GetUsername();
    }
    userService.registerCallbackToUsername(subscribeToUsernameChange);
    
    $scope.toggleRegLoginForm = function() {

        loginFormService.SetShowForm(!loginFormService.GetShowForm());
      
        if(loginFormService.GetShowForm() == true) {
            loginFormService.SetIsOnLoginForm(true);
        }
    }
});