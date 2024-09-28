var posts=["2024/05/01/categories/Code/ff/","2024/09/26/categories/University/join github edu/","2024/09/28/categories/README_副本/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };