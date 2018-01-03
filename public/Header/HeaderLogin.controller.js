
angular.module('DataStructureVisualizer').
controller("HeaderLoginController", function($scope, $http, structureDataService, userService, loginFormService) {

    $scope.isLoggedIn = false;
    userService.registerCallbackToIsLoggedIn(subscribeToUserLogin);
    userService.registerCallbackToUsername(subscribeToUsernameChange);
    checkLogin();

    function checkLogin() {
        $http.get('/api/user/checkLogin')
        .success(function(data) {
            userService.setUsername(data.username);
            userService.setIsLoggedIn(data.loggedIn);
            console.log("CHECK LOGIN");
            console.log(data);

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }

    $scope.logout = function() {
        $http.post('/api/user/logout')
        .success(function(data) {
            userService.setUsername(data.username);
            userService.setIsLoggedIn(data.isLoggedIn);

            console.log("LOGOUT");
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }

    function subscribeToUserLogin() {
        $scope.username = userService.getUsername();
        $scope.isLoggedIn = userService.getIsLoggedIn();        
    }

    function subscribeToUsernameChange() {
        $scope.isLoggedIn = userService.getIsLoggedIn();        
        $scope.username = userService.getUsername();
    }
    
    $scope.toggleRegLoginForm = function() {
        loginFormService.setShowForm(!loginFormService.getShowForm());
        if(loginFormService.getShowForm() == true) {
            loginFormService.setIsOnLoginForm(true);
        }
    }
});