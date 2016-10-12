var app = angular.module('controller.loginCtrl', []);

app.controller('loginCtrl', function($scope, authService, $state, $rootScope ) {

  $scope.adminLogin = function (adminUser, validation) {
    if (validation) {
      authService.adminLogin(adminUser).then(function(){
        //show some notification of success
        $state.go('home');
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
      if($state.current === 'home'){
        $statel.reload();
      }
      else{
        $state.go('home');
      }
    });
  };
});
