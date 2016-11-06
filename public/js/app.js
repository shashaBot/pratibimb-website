var app = angular.module('CogniApp',
[
  'firebase',
  'ui.router',
  'CogniApp.services',
  'CogniApp.controllers',
  'jcs-autoValidate',
  'textAngular',
  'wu.masonry',
  'angularUtils.directives.dirDisqus',
  '720kb.socialshare'
]);
// crossdomain loading iframes
app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.
        'https://www.yumpu.com/**'
    ]);
});
// stateProvider
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'postCtrl'
        })
        .state('add', {
            url: '/add',
            templateUrl: 'templates/addPost.html',
            controller: 'addPostCtrl',
            data: {
              needAdmin: true
            }
        })
        .state('read', {
          url: '/read/:id',
          templateUrl: 'templates/read.html',
          controller: 'readCtrl'
        })
        .state('followers', {
            url: '/followers',
            templateUrl: 'templates/follow.html',
            controller: 'followCtrl',
            data: {
              needAdmin: true
            }
        })
        .state('adminLogin', {
            url: '/admin-login',
            templateUrl: 'templates/admin-login.html',
            controller: 'authCtrl'

        })
        .state('about', {
          url: '/about-us',
          templateUrl: 'templates/about-us.html',
          controller: 'aboutCtrl'
        });

    $urlRouterProvider.otherwise('/');
});

app.run(function($rootScope, $state){
  //check login state
  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      console.log('user is signed in', user);
      $rootScope.user = user;
      //show notification of user logged in
    }
    else{
      $rootScope.user = null;
      console.log('user is signed out');
      //show notification of user signed out
    }
  });

  //check state change permissions
  $rootScope.$on( "$stateChangeStart", function(e, to) {
    if(to.data.needAdmin && !$rootScope.user){
      e.preventDefault();
      console.log('prevented the collapse of my world');
      //maybe show a dialog like you snooping slimy bitch types
      $state.go('home');
    }
    else if (to.data.needAdmin && $rootScope.user){
      console.log('welcome fellow teammate');
    }
    else{
      console.log("I don't give two shits!");
    }
  });

});
