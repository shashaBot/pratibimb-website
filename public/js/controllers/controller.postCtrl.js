var app = angular.module('controller.postCtrl', []);

app.controller('postCtrl', function($scope, postService, $rootScope, $anchorScroll, $location, authService, $state) {

    $scope.goToComments = function(post){
      //path to comments of the selectedPost
      //..use smoothScroll maybe...
    };

    $scope.loading = false;

    $scope.load = function() {
        $scope.loading = true;
        $scope.showLoadMore = false;
        postService.load().then(function(data) {
            if(data){
              $scope.posts = data;
            }
            else{
              //no posts to display
            }
            $scope.loading = false;
            $scope.showLoadMore = true;
        }, function(){
          //loading failure error message
          $scope.showLoadMore = true;
        });
    };


    $scope.showLoadMore= true;
    $scope.loadMore = function() {
      console.log('loadMore called');
        if (!$scope.loading) {
            if(!postService.hasMore){
              $scope.showLoadMore = false;
              $scope.loading = false;
            }
            else{
              $scope.loading = true;
              postService.loadMore().then(function(data){
                if(data){
                  if(JSON.stringify(data)!==JSON.stringify($scope.posts))
                    $scope.posts = data;
                  else{
                    //notification of no more data
                    $scope.showLoadMore = false;
                  }
                }
                else{
                  //no data received, error
                }
                $scope.loading = false;
              });
            }
        }
    };
    $scope.load();


    //back to top button function
    $scope.backToTop = function (){
        console.log('back to top called');
        $("html, body").animate({ scrollTop: 0 }, 1000);
    };

    $(document).ready(function($) {

      $('.card__share > a').on('click', function(e){
        e.preventDefault() // prevent default action - hash doesn't appear in url
        console.log('found .card__share', this);
        $(this).parent().find( 'div' ).toggleClass( 'card__social--active' );
        $(this).toggleClass('share-expanded');
      });

    });


});
