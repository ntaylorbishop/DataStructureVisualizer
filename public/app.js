'use strict';

// Declare app level module which depends on views, and components
angular.module('DataStructureVisualizer', [
  'ngRoute',
  'DataStructureVisualizer.bst',
  'DataStructureVisualizer.heap'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/BinaryTree'});
}]);


