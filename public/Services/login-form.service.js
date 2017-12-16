
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

        SetShowForm: function(showForm) {
            this.showForm = showForm;
            
            for(var i = 0; i < this.showFormCallbacks.length; i++) {
                this.showFormCallbacks[i]();
            }
        },

        SetIsOnLoginForm : function(isOnLoginForm) {

            this.isOnLoginForm = isOnLoginForm;

            for(var i = 0; i < this.isOnLoginFormCallbacks.length; i++) {
                this.isOnLoginFormCallbacks[i]();
            }
        },

        GetShowForm : function() {
            return this.showForm;
        },

        GetIsOnLoginForm : function() {
            return this.isOnLoginForm;
        }
    };

    return loginFormService;
});