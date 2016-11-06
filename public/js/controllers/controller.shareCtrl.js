var app = angular.module('controller.shareCtrl', []);

app.controller('shareCtrl', function($scope, Socialshare){
  $scope.fbShare = function(post){
    Socialshare.share({
     'provider': 'facebook',
     'attrs': {
       'socialshareUrl': 'https://cognizance-dc325.firebaseapp.com/read/' + post.date,
       'socialshare-via': '1576264192675940',
       'socialshare-description': 'Check out this post by \'Cognizance: The BVPIEEE-HKN e-newsletter\'. It\'s amazing. And other stuff here.'
      }
    });
  };

  $scope.gpShare = function(post){
    Socialshare.share({
     'provider': 'google',
     'attrs': {
     'socialshareUrl': 'https://cognizance-dc325.firebaseapp.com/read/' + post.date
      }
    });
  };

  $scope.pkShare = function(post){
    Socialshare.share({
     'provider': 'pocket',
     'attrs': {
     'socialshareUrl': 'https://cognizance-dc325.firebaseapp.com/read/' + post.date
      }
    });
  };

  $scope.wsShare = function(post){
    Socialshare.share({
     'provider': 'whatsapp',
     'attrs': {
     'socialshareUrl': 'https://cognizance-dc325.firebaseapp.com/read/' + post.date
      }
    });
  };

  $scope.twShare = function(post){
    Socialshare.share({
     'provider': 'twitter',
     'attrs': {
       'socialshareUrl': 'https://cognizance-dc325.firebaseapp.com/read/' + post.date,
       'socialshareHashtags': 'Cognizance, ' + post.issue + ', BVPIEEE-HKN' //take care of this post.issue thingy when you get to know about it
      }
    });
  };
});
