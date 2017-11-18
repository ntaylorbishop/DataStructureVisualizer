'use strict';

angular.
    module('DataStructureVisualizer').
    component('Header', {
        template:         
        '<ul>' +
            '<li ng-repeat="phone in $ctrl.phones">' +
                '<span>{{phone.name}}</span>' +
                '<p>{{phone.snippet}}</p>' +
            '</li>' +
        '</ul>',
        controller: function HeaderController() {
            this.user = 'world';
        }
    });