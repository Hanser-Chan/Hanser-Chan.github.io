var posts=["2024/09/24/hello-world/","2024/09/24/algo1/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };