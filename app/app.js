'use strict';

// Declare app level module which depends on views, and components
angular.module('DataStructureVisualizer', [
  'ngRoute',
  'DataStructureVisualizer.view1',
  'DataStructureVisualizer.view2',
  'DataStructureVisualizer.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/BinaryTree'});
}]);
