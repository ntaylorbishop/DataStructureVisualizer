'use strict';

angular.module('DataStructureVisualizer').
directive('resizableWindow', ['$window', function ($window) {

     return {
        link: link,
        restrict: 'A'           
     };

     function link(scope, element, attrs) {
       angular.element($window).bind('resize', function() {
           $scope.windowWidth = $window.innerWidth;
           $scope.windowHeight = $window.innerHeight;
           debugger;
       });    
     }    
 }]);