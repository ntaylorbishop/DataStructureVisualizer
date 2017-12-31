
angular.module('DataStructureVisualizer').
factory('loginFormService', function() {

    var loginFormService = {
        //MEMBERS
        showFormCallbacks : [],
        isOnLoginFormCallbacks : [],
        isOnLoginForm : true,
        showForm : false,

        //METHODS
        registerCallbackToShowForm : function(callback) {
            this.showFormCallbacks.push(callback);
        },

        registerCallbackToIsOnLoginForm : function(callback) {
            this.isOnLoginFormCallbacks.push(callback);
        },

        setShowForm: function(showForm) {
            this.showForm = showForm;
            
            for(var i = 0; i < this.showFormCallbacks.length; i++) {
                this.showFormCallbacks[i]();
            }
        },

        setIsOnLoginForm : function(isOnLoginForm) {

            this.isOnLoginForm = isOnLoginForm;

            for(var i = 0; i < this.isOnLoginFormCallbacks.length; i++) {
                this.isOnLoginFormCallbacks[i]();
            }
        },

        getShowForm : function() {
            return this.showForm;
        },

        getIsOnLoginForm : function() {
            return this.isOnLoginForm;
        }
    };

    return loginFormService;
});