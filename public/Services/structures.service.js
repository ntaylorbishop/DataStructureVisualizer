
angular.module('DataStructureVisualizer').
factory('structureDataService', function($http, userService) {
    var structureDataService = {
        //DATA MEMBERS
        currStructurePage : StructureType.STRUCTURE_TYPE_BST,
        structurePageChangedEvent : new Event(),
        structures : [],
        structureChangedEvent : new Event(),
        structureSelectedEvent : new Event(),
        structureChangeCalledEventListener : {},
        selectedStructure : {},
        isDeletingNode : false,

        //METHODS
        setCurrStructurePage : function(currStructurePage) {
            this.currStructurePage = currStructurePage;
            this.structurePageChangedEvent.fire();
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

        handleStructureChange : function() {
            this.structureChangedEvent.fire();
        },

        handleStructureSelected : function(structureType, selectedStructure) {
            this.selectedStructure.structureType = structureType;
            this.selectedStructure.structure = selectedStructure;

            this.structureSelectedEvent.fire();
        },

        handleSelectedStructureDataChanged : function() {
            this.structureSelectedEvent.fire();
        },
        
        addValueToCurrentStructure : function(newValue) {
            this.selectedStructure.changeType = 'Add';
            var timeoutInSeconds = 0;
            if(this.structureChangeCalledEventListener != undefined) {
                timeoutInSeconds = this.structureChangeCalledEventListener();
            }

            var valueToAdd;
            var retErr = '';
            var isLoggedIn = userService.getIsLoggedIn();

            if(this.selectedStructure.structure.dataType == "Integer") {
                if(isInt(newValue)) {
                    valueToAdd = parseInt(newValue);
                    if(isLoggedIn) {
                        this.postUpdateStructure();
                    }
                }
                else {
                    retErr = 'Inserted value must be a number.';
                }
            }
            else if(this.selectedStructure.structure.dataType == "Character") {
                if(newValue.length == 1) {
                    valueToAdd = newValue;
                    if(isLoggedIn) {
                        this.postUpdateStructure();
                    }
                }
                else {
                    retErr = 'Inserted value must be a single character.';
                }
            }
            else if(this.selectedStructure.structure.dataType == "Word") {
                valueToAdd = newValue;
                if(isLoggedIn) {
                    this.postUpdateStructure();
                }
            }
            retErr = '';

            if(retErr == '') {
                setTimeout(function() {
                    structureDataService.selectedStructure.structure.values.push(valueToAdd);
                    structureDataService.handleSelectedStructureDataChanged();
                }, timeoutInSeconds * 1000);
            }
            return retErr;
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

            this.selectedStructure.changeType = 'Delete';
            var timeoutInSeconds = 0;
            if(this.structureChangeCalledEventListener != undefined) {
                timeoutInSeconds = this.structureChangeCalledEventListener();
            }

            setTimeout(function() {
                switch(structureDataService.selectedStructure.structureType) {
                    case StructureType.STRUCTURE_TYPE_BST:
                    removeAtIndexFromArray(structureDataService.selectedStructure.structure.values, valueIndex);
                    break;
                    case StructureType.STRUCTURE_TYPE_STACK:    
                    if(structureDataService.selectedStructure.structure.values.length > 0) {
                        removeAtIndexFromArray(structureDataService.selectedStructure.structure.values, structureDataService.selectedStructure.structure.values.length - 1);
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
                    structureDataService.postUpdateStructure();
                }
                structureDataService.handleSelectedStructureDataChanged();
            }, timeoutInSeconds * 1000);
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