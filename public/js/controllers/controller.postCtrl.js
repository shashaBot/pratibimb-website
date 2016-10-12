var app = angular.module('controller.postCtrl', []);

app.controller('postCtrl', function($scope, postService, $rootScope, $anchorScroll, $location, authService, $state) {

    $scope.selectPost = function(post) {
    	$scope.selectedPost = postService.selectPost(post);
    };
    $scope.goToComments = function(post){
      $scope.selectPost(post);
      //path to comments of the selectedPost
      //..use anchorScroll maybe...
    };

    $scope.loading = false;

    $scope.load = function() {
        $scope.loading = true;
        postService.load().then(function(data) {
            if(data){
              $scope.posts = data;
            }
            $scope.loading = false;
        });
    };



    $scope.loadMore = function() {

        if (!$scope.loading) {
            if(!postService.hasMore)
              $scope.loading = false;
            else{
              $scope.loading = true;
              postService.loadMore().then(function(data){
                if(data){
                  $scope.posts = data;
                }
                $scope.loading = false;
              });
            }
        }
    };

    $scope.load();
});
