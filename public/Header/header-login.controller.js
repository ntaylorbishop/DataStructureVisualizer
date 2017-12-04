
angular.module('DataStructureVisualizer').
controller("HeaderLoginController", function($scope, $rootScope) {

    $scope.isLoggedIn = false;

    $scope.$watch('$root.isLoggedIn', function() {

        $scope.isLoggedIn = $rootScope.isLoggedIn;
    });

    $scope.$watch('$root.username', function() {
        
        $scope.isLoggedIn = $rootScope.isLoggedIn;        
        $scope.username = $rootScope.username;
    });

    $scope.toggleRegLoginForm = function() {
        $rootScope.RegLoginForm.showForm = ! $rootScope.RegLoginForm.showForm;
      
        if($rootScope.RegLoginForm.showForm == true) {
            $rootScope.RegLoginForm.isOnLoginForm = true;
        }
    }
});