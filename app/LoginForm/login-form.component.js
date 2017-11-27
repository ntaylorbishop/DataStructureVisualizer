angular.module('DataStructureVisualizer').
  component('loginForm', {
    template:   
      '<div id="Login">' + 
        '<span>Please log in</span>' + 
        '<br />' + 
        '<form>' + 
          '<input type="text" name="username" value="username" onfocus="this.value = this.value==\'username\'?\'\':this.value;" onblur="this.value = this.value==\'\'?\'username\':this.value;"><br>' + 
          '<input type="password" name="password" value="password" onfocus="this.value = this.value==\'password\'?\'\':this.value;" onblur="this.value = this.value==\'\'?\'password\':this.value;"><br>' + 
          '<input type="button" name="login" value="Login">' + 
        '</form>' + 
        '<a href="">Need to create an account?</a>' + 
        '</div>',
    controller: function GreetUserController() {

    }
  });