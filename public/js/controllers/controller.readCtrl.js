var app = angular.module('controller.readCtrl', []);

app.controller('readCtrl', function($scope, postService, $stateParams){
  $scope.selectedPost = postService.selectedPost;
  console.log($stateParams);
  console.log($scope.selectedPost);
});
