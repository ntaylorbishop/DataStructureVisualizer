
angular.module('DataStructureVisualizer').
factory('structureDataService', function($http) {

    function createLocalBST() {

    }

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
        },


        CreateStructure : function(user) {

            var currStructurePage = this.GetCurrStructurePage();

            switch(currStructurePage) {
                case StructurePage.STRUCTURE_PAGE_BST:
                    this.CreateBST(user);
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

        CreateBST : function(user) {

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
        }
    }

    

    return structureDataService;
});