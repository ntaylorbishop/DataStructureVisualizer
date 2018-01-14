
angular.module('DataStructureVisualizer').
component('structureTitle', {
    templateUrl: 'StructureTitle/StructureTitle.html'
});


angular.module('DataStructureVisualizer').
controller("StructureTitleController", function($scope, structureDataService) {

    $scope.isHovered = "";
    $scope.isTextSelected = false;
    structureDataService.structureSelectedEvent.subscribe(onStructureChanged);
    $scope.savedText = "";

    function onStructureChanged() {
        if(structureDataService.selectedStructure.structure) {
            $scope.headerStructureTitle = structureDataService.selectedStructure.structure.title;
            $scope.headerStructureType = structureDataService.selectedStructure.structure.dataType;
        }
    }

    $scope.submitText = function($event) {
        if($event.keyCode == 13) {
            structureDataService.changeNameOfStructure($scope.headerStructureTitle);
            $scope.isTextSelected = false;
            $scope.savedText = structureDataService.selectedStructure.structure.title;
        }
    }

    $scope.selectText = function() {
        $scope.isTextSelected = true;
        $scope.savedText = structureDataService.selectedStructure.structure.title;
    }

    $scope.resetText = function() {
        $scope.headerStructureTitle = $scope.savedText;
    }
});