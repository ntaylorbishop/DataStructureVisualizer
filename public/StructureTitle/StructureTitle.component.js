
angular.module('DataStructureVisualizer').
component('structureTitle', {
    templateUrl: 'StructureTitle/StructureTitle.html'
});


angular.module('DataStructureVisualizer').
controller("StructureTitleController", function($scope, structureDataService) {

    structureDataService.subscribeToStructureSelected(onStructureChanged);
    function onStructureChanged() {
        if(structureDataService.selectedStructure.structure) {
            $scope.headerStructureTitle = structureDataService.selectedStructure.structure.title;
            $scope.headerStructureType = structureDataService.selectedStructure.structure.dataType;
        }
    }
});