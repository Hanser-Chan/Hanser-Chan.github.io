var posts=["docs/FFmpeg_so/","docs/book_duoyu/","docs/csky408_algo/","docs/hexo_rss/","docs/follow_invite/","docs/target/","docs/github_edu/","docs/xiaomi_camp/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };