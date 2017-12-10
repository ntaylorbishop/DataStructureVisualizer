
angular.module('DataStructureVisualizer').
controller("DataHandlerController", function($scope, structureDataService) {

    
    $scope.LoadStructureWithName = function(name, structureType) {
        
    };

    var arrayOfValues = [
        {
            position: new Vector2(500, 100),
            value: 23
        }, 
        {
            position: new Vector2(700, 100),
            value: 28
        }, 
        {
            position: new Vector2(900, 100),
            value: 30
        }
    ];
    structureDataService.binarySearchTrees[0] = new BinarySearchTree('first', arrayOfValues);
    
    $scope.loadAllStructures = function() {
        //get from server

        //$rootScope.stacks[0] = 6, 7, 2, 10, 14, 1;
        //queues = ;
        //heaps = ;
        //linkedLists = ;

        structureDataService.SetCurrStructurePage(StructurePage.STRUCTURE_PAGE_BST);

        console.log(structureDataService.binarySearchTrees[0]);
    }
});

