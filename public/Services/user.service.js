
angular.module('DataStructureVisualizer').
factory('userService', function() {

    var userService = {
        //MEMBERS
        isLoggedInCallbacks : [],
        usernameCallbacks : [],
        isLoggedIn : false,
        username : '',
        
        //METHODS
        registerCallbackToIsLoggedIn : function(callback) {
            this.isLoggedInCallbacks.push(callback);
        },

        registerCallbackToUsername : function(callback) {
            this.usernameCallbacks.push(callback);
        },

        setUsername: function(username) {
            this.username = username;
            
            for(var i = 0; i < this.usernameCallbacks.length; i++) {
                this.usernameCallbacks[i]();
            }
        },

        setIsLoggedIn : function(isLoggedIn) {
            this.isLoggedIn = isLoggedIn;

            for(var i = 0; i < this.isLoggedInCallbacks.length; i++) {
                this.isLoggedInCallbacks[i]();
            }
        },

        getUsername : function() {
            return this.username;
        },

        getIsLoggedIn : function() {
            return this.isLoggedIn;
        }
    };

    return userService;
});