
angular.module('DataStructureVisualizer').
factory('structureDataService', function($http, userService) {
    var structureDataService = {
        //DATA MEMBERS
        currStructurePage : StructureType.STRUCTURE_TYPE_BST,
        currStructurePageCallbacks : [],
        structures : [],
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
                case StructureType.STRUCTURE_TYPE_BST:
                    this.createBST(dataType, StructureType.STRUCTURE_TYPE_BST);
                    break;
                case StructureType.STRUCTURE_TYPE_STACK:    

                    break;
                case StructureType.STRUCTURE_TYPE_QUEUE:

                    break;
                case StructureType.STRUCTURE_TYPE_HEAP:

                    break;
                case StructureType.STRUCTURE_TYPE_LINKED_LIST:

                    break;
                default:
                    break;
            }
        },

        createBST : function(dataType, structureType) {

            var username = userService.getUsername();
            var newBST = {
                owner: username,
                title: "UNTITLED",
                values: [],
                dataType: dataType,
                structureType: structureType,
            }

            if(!userService.getIsLoggedIn()) {
                this.structures.push(newBST);
                this.handleStructureChange();
                this.handleStructureSelected(StructureType.STRUCTURE_TYPE_BST, newBST);
                return true;
            }
            else {
                $http.post('/api/structure/create-structure', newBST)
                .success(function(allBSTs) {
    
                    structureDataService.structures = allBSTs.allBSTs;
                    var returnedBST = structureDataService.structures[structureDataService.structures.length - 1];
                    structureDataService.handleStructureChange();
                    structureDataService.handleStructureSelected(StructureType.STRUCTURE_TYPE_BST, returnedBST);
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
            var isLoggedIn = userService.getIsLoggedIn();

            if(this.selectedStructure.structure.dataType == "Integer") {
                if(isInt(newValue)) {
                    this.selectedStructure.structure.values.push(parseInt(newValue));
                    if(isLoggedIn) {
                        this.postUpdateStructure();
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
                        this.postUpdateStructure();
                    }
                }
                else {
                    return 'Inserted value must be a single character.';
                }
            }
            else if(this.selectedStructure.structure.dataType == "Word") {
                this.selectedStructure.structure.values.push(newValue);
                if(isLoggedIn) {
                    this.postUpdateStructure();
                }
            }
            this.handleSelectedStructureDataChanged();
            return '';
        },

        postUpdateStructure : function() {
            var sendData = { 'docId' : this.selectedStructure.structure._id, 'updatedStructure' : this.selectedStructure.structure };
            $http.post('api/structure/update-structure', sendData)
            .success(function(sentData) {
            })
            .error(function(err) {
                //WARNING: need to handle this
            });
            return true;
        },

        deleteFromCurrentStructure : function(valueIndex) {
            switch(this.selectedStructure.structureType) {
                case StructureType.STRUCTURE_TYPE_BST:
                removeAtIndexFromArray(this.selectedStructure.structure.values, valueIndex);
                break;
                case StructureType.STRUCTURE_TYPE_STACK:    
                if(this.selectedStructure.structure.values.length > 0) {
                    removeAtIndexFromArray(this.selectedStructure.structure.values, this.selectedStructure.structure.values.length - 1);
                }
                break;
                case StructureType.STRUCTURE_TYPE_QUEUE:
                
                break;
                case StructureType.STRUCTURE_TYPE_HEAP:
                
                break;
                case StructureType.STRUCTURE_TYPE_LINKED_LIST:
                
                break;
                default:
                break;
            }
            
            var isLoggedIn = userService.getIsLoggedIn();
            if(isLoggedIn) {
                this.postUpdateStructure();
            }
            this.handleSelectedStructureDataChanged();
        },

        deleteStructure : function(dataStructure) {
            removeAtIndexFromArray(structureDataService.structures, dataStructure.index);
            var isLoggedIn = userService.getIsLoggedIn();
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

        changeNameOfStructure : function(newTitle) {
            this.selectedStructure.structure.title = newTitle;

            var isLoggedIn = userService.getIsLoggedIn();
            if(isLoggedIn) {
                this.postTitleChange(this.selectedStructure.structure._id, newTitle);
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
        loadDefaultStructuresOfType : function(structureType) {
            var sendData = { 'structureType' :  structureType };
            $http.post('/api/structure/load-default-structures', sendData)
            .success(function(allStructuresOfType) {
                structureDataService.structures = allStructuresOfType;    
                structureDataService.handleStructureChange();
                structureDataService.handleStructureSelected(structureType, structureDataService.structures[0]);
                return true;
            })
            .error(function() {
                console.log('Error: ' + data);
                return false;
            });
        },

        loadUserStructuresOfType : function(structureType) {
            var sendData = { 'username' : userService.getUsername(), 'structureType' : structureType };
            $http.post('/api/structure/get-user-structures', sendData)
            .success(function(allBSTs) {
                structureDataService.structures = allBSTs;    
                structureDataService.handleStructureChange();
                structureDataService.handleStructureSelected(StructureType.STRUCTURE_TYPE_BST, structureDataService.structures[0]);
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