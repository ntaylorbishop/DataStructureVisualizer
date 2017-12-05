
angular.module('DataStructureVisualizer').
controller("NodeViewController", function($scope, $rootScope) {

    $scope.nodes = [
        {
          position: new Vector2(100, 100),
          value: 23
        }, {
            position: new Vector2(300, 100),
            value: 28
        }, {
            position: new Vector2(500, 100),
            value: 30
        }
      ];
});