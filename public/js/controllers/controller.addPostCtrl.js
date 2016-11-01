var app = angular.module('controller.addPostCtrl', []);

app.controller('addPostCtrl', function($scope, postService, $state){
  $scope.newPost = {};
  $scope.writeNewPost = function(formIsValid){
   if(formIsValid){
     console.log("writing New Post");
     //anglular ladda calls
     return postService.newMagazinePost($scope.newPost.title, $scope.newPost.body, $scope.newPost.issue, $scope.newPost.imageUrl, $scope.newPost.magLink).then(function(){
       console.log("written to database");
       //ladda calls
       $state.reload();
       //show notification
     });
   }

   else{
     //form was not valid
     //show notification
     console.log("writeNewPost::Invalid Form!");
   }

 };
});
