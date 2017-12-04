'use strict';

angular.module('DataStructureVisualizer.heap', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Heap', {
    templateUrl: 'StructureTemplates/Views/heap.html',
    controller: 'HeapController'
  });
}])

.controller('HeapController', [function() {
  console.log('HeapController');
}]);