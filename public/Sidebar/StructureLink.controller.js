////////////////////////////////////////////////////////////////////
//NODE VIEW CONTROLLER
////////////////////////////////////////////////////////////////////
angular.module('DataStructureVisualizer').
controller("StructureLinkController", function($scope, structureDataService, $document) {

    $scope.isTextSelected = false;
    $scope.isTextHovered = false;

    $scope.clickText = function() {
        $scope.isTextSelected = true;                
    }

    $scope.enterText = function($event) {
        if($event.keyCode == 13) {
            $scope.isTextSelected = false;        
        }
    }

    $scope.saveText = function(dataStructure) {
        structureDataService.changeNameOfStructure(dataStructure, $scope.dataStructureTitle);
        dataStructure.title = $scope.dataStructureTitle;
    }

    $scope.selectStructure = function(dataStructure) {
        $scope.isTextSelected = false;
        structureDataService.handleStructureSelected(StructureType.STRUCTURE_TYPE_BST, dataStructure);
    }

    $scope.isHoveringText = function(isHovering) {
        $scope.isTextHovered = isHovering;
    }

    $scope.deleteStructure = function(dataStructure) {
        
        var removeIndex = dataStructure.index;       
        structureDataService.deleteStructure(dataStructure);

        if($scope.structuresList.length == 0) {
            structureDataService.handleStructureSelected(StructureType.STRUCTURE_TYPE_BST, null);
        }
        else {
            if(removeIndex < $scope.structuresList.length) {
                structureDataService.handleStructureSelected(StructureType.STRUCTURE_TYPE_BST, $scope.structuresList[removeIndex + 1]);
            }
            else if(removeIndex == $scope.structuresList.length) {
                structureDataService.handleStructureSelected(StructureType.STRUCTURE_TYPE_BST, $scope.structuresList[removeIndex - 1]);
            }
        }
    }
});