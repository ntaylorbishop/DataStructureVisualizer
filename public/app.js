'use strict';

// Declare app level module which depends on views, and components
angular.module('DataStructureVisualizer', [
  'ngRoute',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
}]);


//rootScope defaults
//angular.module('DataStructureVisualizer')
//.run(["$rootScope", function ($rootScope) {
//    angular.extend($rootScope, {
//        DataStructure: {
//            currStructurePage : StructurePage.STRUCTURE_PAGE_BST,
//            binarySearchTrees : { },
//            stacks : { },
//            queues : { },
//            heaps : { },
//            linkedLists : { }
//        }
//    });
//}]);