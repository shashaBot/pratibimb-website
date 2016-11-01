var app = angular.module('service.postService', []);

app.factory('postService', function($state, $stateParams, $q) {

    var self = {
        'loading': false,
        'page': 1
    };
    var postsPerPage = 3;
    var page = 1;
    self.newMagazinePost = function(title, body, issue, imageUrl, magLink) {
        // A post entry.
        var fix;
        if (body) {
            fix = body;
        } else {
            fix = "Let us know how you like it:)";
        }
        var postData = {
            title: title,
            body: fix,
            imageUrl: imageUrl,
            magLink: magLink,
            issue: issue,
            date: new Date()
        };

      // Get a key for a new Post.
      var newPostKey = firebase.database().ref().child('posts').push().key;
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/posts/' + newPostKey] = postData;
      return firebase.database().ref().update(updates);
    };

    self.editPost = function(title, body, imageUrl, magLink, issue, postKey) {

        // A post entry.
        var fix;
        if (body) {
            fix = body;
        } else {
            fix = "Let us know how you like it:)";
        }
        var postData = {
            body: fix,
            title: title,
            type: type,
            magLink: magLink,
            issue: issue,
            date: self.selectedPost.date,
            editedDate: new Date()
        };

      var updates = {};
      updates['/posts/' + postKey] = postData;
      return firebase.database().ref().set(updates);
    };


    var dataRef = firebase.database().ref();

    self.load = function() {
        var d = $q.defer();

        self.loading = true;
        console.log("self.load::" + page);
        var queryPosts = dataRef.child('posts').orderByKey().limitToLast(postsPerPage*self.page);

        queryPosts.on("value", function(data) {
          //order incoming data
          if(data.val()){
            var ordered = self.orderPosts(data.val());
          }
          //compare if old data and data received is same
            if (JSON.stringify(self.posts) === JSON.stringify(ordered) && self.page!==1) {
                console.log("no more data");
                self.hasMore = false;
            } else {
                console.log("there is more data");
                self.hasMore = true;
            }

            self.posts = {};
            self.posts = ordered;

            console.log("postService::on function called: ");
            self.loading = false;
            d.resolve(self.posts);
        });

        self.loading = false;

        return d.promise;

    };

    self.findPostKey = function(post){
      for (var key in self.posts) {
          if (self.posts[key].date === post.date) {
              return key;
          }
      }
    };

    self.loadMore = function() {
      if (self.hasMore && !self.loading) {
          self.loading = true;
          self.page += 1;
          console.log("postService :: load more");
          return self.load();
      }
    };
    self.orderPosts = function(unordered){
      var ordered = {};
      Object.keys(unordered).reverse().forEach(function(key) {
        ordered[key] = unordered[key];
      });

      return ordered;
    };

    self.selectPost = function(inputPost) {
        self.selectedPost = inputPost;
        return self.selectedPost;
    };

    return self;
});
