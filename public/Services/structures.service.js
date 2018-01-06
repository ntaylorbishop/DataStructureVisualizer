
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
                    this.createBST(dataType);
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
    
                    structureDataService.binarySearchTrees = allBSTs.allBSTs;
                    var returnedBST = structureDataService.binarySearchTrees[structureDataService.binarySearchTrees.length - 1];
                    structureDataService.handleStructureChange();
                    structureDataService.handleStructureSelected(StructurePage.STRUCTURE_PAGE_BST, returnedBST);
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
        
        addValueToCurrentStructure : function(newValue) {
            switch(this.selectedStructure.structureType) {
                case StructurePage.STRUCTURE_PAGE_BST:
                    return this.addValueToCurrentBST(newValue);
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
        
        addValueToCurrentBST : function(newValue) {
            var isLoggedIn = userService.getIsLoggedIn();

            if(this.selectedStructure.structure.dataType == "Integer") {
                if(isInt(newValue)) {
                    this.selectedStructure.structure.values.push(parseInt(newValue));
                    if(isLoggedIn) {
                        this.postValueBST(newValue);
                    }
                }
                else {
                    return 'Inserted value must be a number.';
                }
            }
            else if(this.selectedStructure.structure.dataType == "Character") {
                if(newValue.length == 1) {
                    this.selectedStructure.structure.values.push(newValue);
                    if(isLoggedIn) {
                        this.postValueBST(newValue);
                    }
                }
                else {
                    return 'Inserted value must be a single character.';
                }
            }
            else if(this.selectedStructure.structure.dataType == "Word") {
                this.selectedStructure.structure.values.push(newValue);
                if(isLoggedIn) {
                    this.postValueBST(newValue);
                }
            }
            this.handleSelectedStructureDataChanged();
            return '';
        },

        postValueBST : function(newValue) {
            var sendData = { 'docId' : this.selectedStructure.structure._id, 'updatedStructure' : this.selectedStructure.structure };
            $http.post('api/structure/update-bst', sendData)
            .success(function(sentData) {
            })
            .error(function(err) {
                //WARNING: need to handle this
            });
            return true;
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

        deleteStructure : function(dataStructure) {
            removeAtIndexFromArray(structureDataService.binarySearchTrees, dataStructure.index);
            var isLoggedIn = userService.getIsLoggedIn();
            console.log('deleting');
            if(isLoggedIn) {
                this.postDeleteStructure(dataStructure._id);
            }
            this.handleStructureChange();
        },

        postDeleteStructure : function(docId) {
            var sendData = { 'docId' : docId };
            $http.post('/api/structure/delete-structure', sendData)
            .success(function() {
                //Handle success vs failure
            })
            .error(function(err) {
                console.log('[Error] /api/structure/delete-structure: ' + err);
            });
        },

        changeNameOfStructure : function(dataStructure, newTitle) {
            this.binarySearchTrees[dataStructure.index].title = newTitle;
            
            var isLoggedIn = userService.getIsLoggedIn();
            if(isLoggedIn) {
                this.postTitleChange(dataStructure._id, newTitle);
            }
        },

        postTitleChange : function(docId, newTitle) {
            var sendData = { 'docId' : docId, 'newTitle' : newTitle };
            $http.post('/api/structure/update-title', sendData)
            .success(function() {
                //Handle success vs failure
            })
            .error(function(err) {
                console.log('[Error] /api/structure/update-title: ' + err);
            });
        },

        //LOADING IN STRUCTURES
        loadDefaultBSTs : function() {
            $http.get('/api/structure/load-default-bsts')
            .success(function(allBSTs) {
                structureDataService.binarySearchTrees = allBSTs;    
                console.log(structureDataService.binarySearchTrees);      
                structureDataService.handleStructureChange();
                structureDataService.handleStructureSelected(StructurePage.STRUCTURE_PAGE_BST, structureDataService.binarySearchTrees[0]);
                return true;
            })
            .error(function(allBSTs) {
                console.log('Error: ' + data);
                return false;
            });
        },

        loadDefaultAndUserBSTs : function() {
            var sendData = { 'username' : userService.getUsername() };

            $http.post('/api/structure/get-default-and-user-bsts', sendData)
            .success(function(allBSTs) {
                structureDataService.binarySearchTrees = allBSTs;    
                console.log(structureDataService.binarySearchTrees);      
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