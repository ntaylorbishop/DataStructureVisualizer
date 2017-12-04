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


//rootScope defaults
angular.module('DataStructureVisualizer')
.run(["$rootScope", function ($rootScope) {
    angular.extend($rootScope, {
        RegLoginForm: {
            showForm: false,
            isOnLoginForm: true,
        },
        isLoggedIn : false,
        username : '',
        DataStructure: {
            currStructurePage : StructurePage.STRUCTURE_PAGE_BST,
            binarySearchTrees : { },
            stacks : { },
            queues : { },
            heaps : { },
            linkedLists : { }
        }
    });
}]);