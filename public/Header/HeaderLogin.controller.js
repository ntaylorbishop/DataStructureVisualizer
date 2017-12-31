
angular.module('DataStructureVisualizer').
controller("HeaderLoginController", function($scope, $rootScope, structureDataService, userService, loginFormService) {

    $scope.isLoggedIn = false;

    //FIX
    function subscribeToUserLogin() {
        $scope.username = userService.getUsername();
        $scope.isLoggedIn = userService.getIsLoggedIn();        
    }
    userService.registerCallbackToIsLoggedIn(subscribeToUserLogin);

    function subscribeToUsernameChange() {
        $scope.isLoggedIn = userService.getIsLoggedIn();        
        $scope.username = userService.getUsername();
    }
    userService.registerCallbackToUsername(subscribeToUsernameChange);
    
    $scope.toggleRegLoginForm = function() {

        loginFormService.setShowForm(!loginFormService.getShowForm());
      
        if(loginFormService.getShowForm() == true) {
            loginFormService.setIsOnLoginForm(true);
        }
    }
});