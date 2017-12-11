'use strict';

// Declare app level module which depends on views, and components
angular.module('DataStructureVisualizer', [
  'ngRoute',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
}]);