
angular.module('DataStructureVisualizer').
controller("NodeViewController", function($scope, structureDataService) {

    var startPoint = new Vector2(995, 160);

    var arrayOfValues = [
        {
            position: new Vector2(995, 160),
            value: 100
        },
        {
            position: new Vector2(995, 160),
            value: 25
        },
        {
            position: new Vector2(995, 160),
            value: 20
        },
        {
            position: new Vector2(995, 160),
            value: 50
        },
        {
            position: new Vector2(995, 160),
            value: 110
        },
        {
            position: new Vector2(995, 160),
            value: 105
        },
        {
            position: new Vector2(995, 160),
            value: 103
        },
        {
            position: new Vector2(995, 160),
            value: 113
        },
        {
            position: new Vector2(995, 160),
            value: 112
        }
    ];
    structureDataService.binarySearchTrees[0] = new BinarySearchTree('first', arrayOfValues);

    $scope.nodes = structureDataService.binarySearchTrees[0].arrayOfValues;
});