
angular.module('DataStructureVisualizer').
factory('structureVisService', function($http) {

    var structureVisService = {
        //DATA MEMBERS
        startPoint : new Vector2(995, 160),
        xDiff : 400,
        yDiff : 600,
    }

    return structureVisService;
});