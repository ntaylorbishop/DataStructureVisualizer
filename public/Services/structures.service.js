
angular.module('DataStructureVisualizer').
factory('structureDataService', function($http, userService) {

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
        structureSelectedCallbacks : [],
        selectedStructure : {},

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
                    break;
            }
        },

        createBST : function(user) {

            if(user == '') {
                return false;
            }

            var sendData = {
                owner: user,
                title: "UNTITLED",
                values: []
            }

            $http.post('/api/structure/create-bst', sendData)
            .success(function(allBSTs) {

                this.binarySearchTrees = allBSTs;
                return true;
            })
            .error(function(allBSTs) {
                console.log('Error: ' + data);

                return false;
            });
        },

        subscribeToStructureChange : function(callback) {
            this.structureChangeCallbacks.push(callback);
        },

        handleStructureChange : function() {
            for(var i = 0; i < this.structureChangeCallbacks.length; i++) {
                this.structureChangeCallbacks[i]();
            }
        },

        handleStructureSelected : function(structureType, selectedStructure) {

            this.selectedStructure.structureType = structureType;
            this.selectedStructure.structure = selectedStructure;

            for(var i = 0; i < this.structureSelectedCallbacks.length; i++) {
                this.structureSelectedCallbacks[i]();
            }
        },

        subscribeToStructureSelected : function(callback) {
            this.structureSelectedCallbacks.push(callback);
        },
        
        updateCurrentStructure : function(newValue) {

            var isLoggedIn = userService.getIsLoggedIn();

            if(isLoggedIn) {
                return; //Need to add this
            }
            else {
                switch(this.selectedStructure.structureType) {
                    case StructurePage.STRUCTURE_PAGE_BST:
                        selectedStructure.insert();
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
                        break;
                }
            }
        },

        //LOADING IN STRUCTURES
        loadBSTs : function() {

            $http.get('/api/structure/load-default-bsts')
            .success(function(allBSTs) {
                structureDataService.binarySearchTrees = allBSTs;          
                structureDataService.handleStructureChange();
                return true;
            })
            .error(function(allBSTs) {
                console.log('Error: ' + data);
                return false;
            });
        }
    }

    

    return structureDataService;
});