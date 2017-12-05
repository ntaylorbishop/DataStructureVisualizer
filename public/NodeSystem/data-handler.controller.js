
angular.module('DataStructureVisualizer').
controller("DataHandlerController", function($scope, $rootScope) {

    $scope.LoadAllStructures();

    $scope.LoadStructureWithName = function(name, structureType) {

    };

    $scope.LoadAllStructures = function() {
        //get from server
        $rootScope.binarySearchTrees[0] = new BinarySearchTree('first', [
            8, 3, 10, 1, 6, 14, 4, 7, 13
        ]);
        //$rootScope.stacks[0] = 6, 7, 2, 10, 14, 1;
        //queues = ;
        //heaps = ;
        //linkedLists = ;
    }
});

