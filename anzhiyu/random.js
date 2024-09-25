var posts=["1900/01/01/hexo配置/","2024/09/24/categories/Code/algo1/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };