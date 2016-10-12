var app = angular.module('service.authService', []);

app.service('authService', function($q) {
    var auth = firebase.auth();
    var self = {};

    //admin login
    self.adminLogin = function(userObj){
      return auth.signInWithEmailAndPassword(userObj.email, userObj.password)
      .catch(function(error){
        console.log("There was an error loggin in : ", error.code, ": ", error.message);
      });
    };

    //logout user
    self.signOut = function(){
      return auth.signOut();
    };
    //event listener for login state
    auth.onAuthStateChanged(function(user){
      if(user){
        //user signed in
        self.user = user;

      }
      else {
        //user signed out
        self.user = null;
      }
    });

    return self;
});
