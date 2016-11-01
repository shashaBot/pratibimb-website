var app = angular.module('controller.followCtrl', []);

app.controller('followCtrl', function($scope, followService){
  $scope.followerEmail = "";
  //event listener for follower email enter
  var input = document.getElementsByName("email-input")[0];
    if (input.addEventListener)
        input.addEventListener("keypress", function(e) {
            if (e.keyCode === 13) {
                // do stuff
                $scope.addFollower($scope.followerEmail);
                e.preventDefault();
            }
        }, false);
    else if (input.attachEvent)
        input.attachEvent("onkeypress", function(e) {
            if (e.keyCode === 13) {
                // do stuff
                $scope.addFollower($scope.followerEmail);
                return e.returnValue = false;
            }
        });



  //load followers and store them in scope variable
  followService.loadFollowers().then(function(data){
    $scope.followers = data;
  });
  //new follower
  $scope.addFollower = function (email){
    followService.newFollower(email).then(function(){
      //show notification of successful addition to mailing list
      alert("Added '" + $scope.followerEmail + "' to the mailing list");
      $scope.followerEmail = "";
    });
  };
});
