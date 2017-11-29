'use strict';

angular.module('DataStructureVisualizer.heap', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Heap', {
    templateUrl: 'StructureTemplates/Heap/heap.html',
    controller: 'HeapCtrl'
  });
}])

.controller('HeapCtrl', [function() {

}]);