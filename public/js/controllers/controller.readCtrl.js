var app = angular.module('controller.readCtrl', []);

app.controller('readCtrl', function($scope, postService, $stateParams, $location){
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
  $scope.disqusConfig = {
    disqus_shortname: 'cognizance-4',
    disqus_identifier: $stateParams.id,
    disqus_url: 'https://cognizance-dc325.firebaseapp.com' + $location.path()
  };
  console.log($location.path());
  $scope.commentsLoaded = false;
  $scope.disqusLoaded = function(){
    $scope.commentsLoaded = true;
    console.log('disqus comments loaded');
    //other stuff you wanna do when comments get loaded
  };
});
