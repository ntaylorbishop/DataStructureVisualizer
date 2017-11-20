angular.module('DataStructureVisualizer').
directive('dragDrop', function () {
  return {
      link: function ($scope, element, attrs) {
        var mouseLocX = 0;
        var mouseLocY = 0;
        var isElementHeldDown = false;
        var elementHeldDown;
        var heldDownElementWidth = 0;
        var heldDownElementHeight = 0;

        //Bind callback to get mouse position
        $scope.captureCoordinate = function($event) {
            mouseLocX = $event.x;
            mouseLocY = $event.y;

            if(isElementHeldDown == true) {
                elementHeldDown.css('position', 'absolute');
                elementHeldDown.css('left', mouseLocX - heldDownElementWidth / 2 + 'px');
                elementHeldDown.css('top', mouseLocY - heldDownElementHeight / 2 + 'px');
            }
        }

        var dragDroppables = element[0].children;

        for (var elementIdx = 0; elementIdx < dragDroppables.length; elementIdx++) {
            var bindElement = dragDroppables[elementIdx];

            var elementID = bindElement.attributes['id'].value;

            if(elementID == "DragDroppable") {

                var bindElementAngular = angular.element(bindElement);

                bindElementAngular.on('mousedown', function() {
                    bindElementAngular.css('background-color', 'rgb(17, 83, 252)');            
                    elementHeldDown = bindElementAngular;
                    isElementHeldDown = true;
    
                    var style = window.getComputedStyle(bindElementAngular);           
                    heldDownElementWidth = parseInt(style.getPropertyValue('width'));
                    heldDownElementHeight = parseInt(style.getPropertyValue('height'));     
                });
                bindElementAngular.on('mouseup', function () {
                    bindElementAngular.css('background-color', 'rgb(73, 122, 255)');
                    isElementHeldDown = false;
                });
            }
        }
      }
  };
});