var posts=["docs/FFmpeg_so/","docs/follow_invite/","docs/hexo_rss/","docs/github_edu/","docs/xiaomi_camp/","docs/target/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };