
angular.module('DataStructureVisualizer').
component('dropUpMenu', {
    templateUrl: 'Sidebar/DropUpMenu/DropUpMenu.html',
});

angular.module('DataStructureVisualizer').
controller("DropUpMenuController", function($scope, structureDataService) {
    
    $scope.createStructure = function(dataType) {
        structureDataService.createStructure(dataType);
    }
});