var app = angular.module('controller.authCtrl', []);

app.controller('authCtrl', function($scope, authService, $state, $rootScope ) {


  $scope.adminLogin = function (adminUser, validation) {
    if (validation) {
      authService.adminLogin(adminUser).then(function(user){
        console.log(user);
        if(user){
          //show some notification of success
          $state.go('home');
        }
        else{
          //authentication failed!
          $state.reload();
        }
      });
    }
    else{
      //user did not enter the credentials properly
      //show toaster message or something
    }
  };

  $scope.signOut = function() {
    authService.signOut().then(function() {
      console.log("signed out!");
      //reloading state is not working...look into this or have it looked upon by someone
      if($state.current === 'home'){
        console.log('already at home');
        $state.reload();
      }
      else{
        $state.go('home');
      }
    });
  };
});
