
angular.module('DataStructureVisualizer').
factory('structureDataService', function() {

    var structureDataService = {
        //DATA MEMBERS
        currStructurePage : StructurePage.STRUCTURE_PAGE_BST,
        currStructurePageCallbacks : [],
        binarySearchTrees : [],
        stacks : [],
        queues : [],
        heaps : [],
        linkedLists : [],

        //METHODS
        RegisterCallbackToCurrStructurePage : function(callback) {
            this.currStructurePageCallbacks.push(callback);
        },

        SetCurrStructurePage : function(currStructurePage) {
            this.currStructurePage = currStructurePage;
            
            for(var i = 0; i < this.currStructurePageCallbacks.length; i++) {
                this.currStructurePageCallbacks[i]();
            }
        },

        GetCurrStructurePage : function() {
            return this.currStructurePage;
        }
    }

    return structureDataService;
});