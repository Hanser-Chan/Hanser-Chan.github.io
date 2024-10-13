var posts=["docs/book_duoyu/","docs/FFmpeg_so/","docs/follow_invite/","docs/hexo_rss/","docs/target/","docs/github_edu/","docs/xiaomi_camp/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };