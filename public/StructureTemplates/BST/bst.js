'use strict';

angular.module('DataStructureVisualizer.bst', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/BinaryTree', {
    templateUrl: 'StructureTemplates/BST/bst.html',
    controller: 'BSTCtrl'
  });
}])

.controller('BSTCtrl', [function() {

}]);