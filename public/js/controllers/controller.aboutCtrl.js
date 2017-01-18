var app = angular.module('controller.aboutCtrl', []);

app.controller('aboutCtrl', function($scope){
  $(document).ready(function() {

    $("#cogniOwlCarousel").owlCarousel({
      autoPlay: 5300,
      items : 4,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [979,4],
      lazyLoad: true
    });

  });
});
