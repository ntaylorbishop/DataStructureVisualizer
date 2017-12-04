'use strict';

angular.module('DataStructureVisualizer.bst', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/BinaryTree', {
    templateUrl: 'StructureTemplates/Views/bst.html',
    controller: 'BSTController'
  });
}])

.controller('BSTController', [function() {
  console.log('BSTController');  
}]);



//BST definition
class BinarySearchTree {
  constructor(name, arrayOfValues) {

    this.name = name;
    parseValues(arrayOfValues);

    function parseValues(arrayOfValues) {

    }
  }
}