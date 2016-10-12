var app = angular.module('controller.addPostCtrl', []);

app.controller('addPostCtrl', function($scope){
  $('.datepicker').datepicker({

              weekStart:1,

              color: 'orange'

     });
  $scope.writeNewPost = function(newPost, formIsValid){
   if(formIsValid){
     console.log("writing New Post");
     postService.writeNewPost(newPost.title, newPost.body, newPost.type, newPost.imageUrl, newPost.magLink, newPost.issue).then(function(){
       $state.reload();
       $scope.newPost = {};
     });
   }

   else{
     //form was not valid
     //show notification
     console.log("writeNewPost::Invalid Form!");
   }

 };
});
