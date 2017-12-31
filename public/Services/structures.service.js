
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


        createStructure : function(dataType) {
            var currStructurePage = this.getCurrStructurePage();

            switch(currStructurePage) {
                case StructurePage.STRUCTURE_PAGE_BST:
                    this.createBST();
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

        createBST : function(dataType) {

            var username = userService.getUsername();
            var newBST = {
                owner: username,
                title: "UNTITLED",
                values: [],
                dataType: dataType
            }

            if(!userService.getIsLoggedIn()) {
                this.binarySearchTrees.push(newBST);
                this.handleStructureChange();
                this.handleStructureSelected(StructurePage.STRUCTURE_PAGE_BST, newBST);
                return true;
            }
            else {
                $http.post('/api/structure/create-bst', newBST)
                .success(function(allBSTs) {
    
                    this.binarySearchTrees = allBSTs;
                    structureDataService.handleStructureChange();
                    return true;
                })
                .error(function(allBSTs) {
                    console.log('Error: ' + data);
                    return false;
                });
            }
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

        handleSelectedStructureDataChanged : function() {
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
                        if(this.selectedStructure.structure.dataType == "Integer") {
                            if(isInt(newValue)) {
                                this.selectedStructure.structure.values.push(parseInt(newValue));
                                this.handleSelectedStructureDataChanged();
                                return '';
                            }
                            else {
                                return 'Inserted value must be a number.';
                            }
                        }
                        else if(this.selectedStructure.structure.dataType == "Character") {
                            if(newValue.length == 1) {
                                this.selectedStructure.structure.values.push(newValue);
                                this.handleSelectedStructureDataChanged();
                                return '';
                            }
                            else {
                                return 'Inserted value must be a single character.';
                            }
                        }
                        else if(this.selectedStructure.structure.dataType == "Word") {
                            this.selectedStructure.structure.values.push(newValue);
                            this.handleSelectedStructureDataChanged();
                            return '';
                        }
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

        deleteFromCurrentStructure : function(valueIndex) {

            var isLoggedIn = userService.getIsLoggedIn();

            if(isLoggedIn) {
                return; //Need to add this
            }
            else {
                switch(this.selectedStructure.structureType) {
                    case StructurePage.STRUCTURE_PAGE_BST:
                        removeAtIndexFromArray(this.selectedStructure.structure.values, valueIndex);
                        this.handleSelectedStructureDataChanged();
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

        deleteStructureAtIndex : function(index) {

            var isLoggedIn = userService.getIsLoggedIn();

            if(isLoggedIn) {
                return; //Need to add this
            }
            else {
                switch(this.currStructurePage) {
                    case StructurePage.STRUCTURE_PAGE_BST:
                        removeAtIndexFromArray(structureDataService.binarySearchTrees, index);
                        break;
                    case StructurePage.STRUCTURE_PAGE_STACK:    
                        removeAtIndexFromArray(structureDataService.stacks, index);
                        break;
                    case StructurePage.STRUCTURE_PAGE_QUEUE:
                        removeAtIndexFromArray(structureDataService.queues, index);
                        break;
                    case StructurePage.STRUCTURE_PAGE_HEAP:
                        removeAtIndexFromArray(structureDataService.heaps, index);
                        break;
                    case StructurePage.STRUCTURE_PAGE_LINKED_LIST:
                        removeAtIndexFromArray(structureDataService.linkedLists, index);
                        break;
                    default:
                        break;
                }
                this.handleStructureChange();
            }
        },

        //LOADING IN STRUCTURES
        loadBSTs : function() {

            $http.get('/api/structure/load-default-bsts')
            .success(function(allBSTs) {
                structureDataService.binarySearchTrees = allBSTs;          
                structureDataService.handleStructureChange();
                structureDataService.handleStructureSelected(StructurePage.STRUCTURE_PAGE_BST, structureDataService.binarySearchTrees[0]);
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