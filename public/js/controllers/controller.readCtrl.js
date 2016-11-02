var app = angular.module('controller.readCtrl', []);

app.controller('readCtrl', function($scope, postService, $stateParams){
  $scope.loading = false;
  if(!postService.posts){
    $scope.loading = true;
    postService.load().then(function(){
      $scope.selectedPost = postService.selectPost($stateParams.id);
      $scope.loading = false;
    });
  }
  else{
    $scope.selectedPost = postService.selectPost($stateParams.id);
  }
});
