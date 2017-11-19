var xMouseLoc = 0;
var yMouseLoc = 0;
var heldDownElementWidth = 0;
var heldDownElementHeight = 0;
var isElementHeldDown = false;
var elementHeldDown;

angular.module('DataStructureVisualizer').
controller('DragDropController', function DragDropController($scope) {
  $scope.captureCoordinate = function($event) {
    xMouseLoc = $event.x;
    yMouseLoc = $event.y;

    if(isElementHeldDown == true) {
      elementHeldDown.css('position', 'absolute');
      elementHeldDown.css('left', xMouseLoc - heldDownElementWidth / 2 + 'px');
      elementHeldDown.css('top', yMouseLoc - heldDownElementHeight / 2 + 'px');
    }
   }
});

angular.module('DataStructureVisualizer').
directive('dragDrop', function () {
  return {
      link: function ($scope, element, attrs) {
          element.bind('mousedown', function () {
              element.css('background-color', 'rgb(17, 83, 252)');            
              elementHeldDown = element;
              isElementHeldDown = true;

              var style = window.getComputedStyle(element[0]);           
              heldDownElementWidth = parseInt(style.getPropertyValue('width'));
              heldDownElementHeight = parseInt(style.getPropertyValue('height'));              
          });
          element.bind('mouseup', function () {
              element.css('background-color', 'rgb(73, 122, 255)');
              isElementHeldDown = false;
              console.log("mouse went up!");
          });
      }
  };
});