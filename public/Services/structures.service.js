
angular.module('DataStructureVisualizer').
factory('structureDataService', function($http) {

    var structureDataService = {
        //DATA MEMBERS
        currStructurePage : StructurePage.STRUCTURE_PAGE_BST,
        currStructurePageCallbacks : [],
        binarySearchTrees : [],
        stacks : [],
        queues : [],
        heaps : [],
        linkedLists : [],
        structureChangeCallbacks : [],


        //METHODS
        registerCallbackToCurrStructurePage : function(callback) {
            this.currStructurePageCallbacks.push(callback);
        },


        setCurrStructurePage : function(currStructurePage) {
            this.currStructurePage = currStructurePage;
            
            for(var i = 0; i < this.currStructurePageCallbacks.length; i++) {
                this.currStructurePageCallbacks[i]();
            }
        },


        getCurrStructurePage : function() {
            return this.currStructurePage;
        },


        createStructure : function(user) {

            var currStructurePage = this.getCurrStructurePage();

            switch(currStructurePage) {
                case StructurePage.STRUCTURE_PAGE_BST:
                    this.createBST(user);
                    break;
                case StructurePage.STRUCTURE_PAGE_STACK:    

                    break;
                case StructurePage.STRUCTURE_PAGE_QUEUE:

                    break;
                case StructurePage.STRUCTURE_PAGE_HEAP:

                    break;
                case StructurePage.STRUCTURE_PAGE_LINKED_LIST:

                    break;
                default:
                    debugger;
                    break;
            }
        },

        createBST : function(user) {

            if(user == '') {
                return;
            }

            var sendData = {
                owner: user,
                title: "UNTITLED",
                values: []
            }

            $http.post('/api/structure/create-bst', sendData)
            .success(function(allBSTs) {

                var returnBSTs = {
                    successful: true,
                    BSTs: allBSTs
                };



                return returnBSTs;
            })
            .error(function(allBSTs) {
                console.log('Error: ' + data);

                var returnBSTs = {
                    successful: false,
                    BSTs: []
                };

                return returnBSTs;
            });
        },

        subscribeToStructureChange : function(callback) {
            structureChangeCallbacks.push(callback);
        },

        handleStructureChange : function() {
            for(var i = 0; i < structureChangeCallbacks.length; i++) {
                structureChangeCallbacks[i]();
            }
        }
    }

    

    return structureDataService;
});