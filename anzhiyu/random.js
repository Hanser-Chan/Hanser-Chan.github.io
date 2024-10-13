var posts=["docs/book_duoyu/","docs/xiaomi_camp/","docs/github_edu/","docs/FFmpeg_so/","docs/follow_invite/","docs/hexo_rss/","docs/target/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };