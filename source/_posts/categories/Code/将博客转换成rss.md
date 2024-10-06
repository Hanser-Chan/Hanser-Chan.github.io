---
title: 将博客转换成rss并上线follow
date: 2024-09-28 19:47:29
path_en: hexo_rss
categories: Code
tag:
  - rss
  - hexo
  - follow
cover: https://s2.loli.net/2024/09/28/H2tTagURemWpOKN.png
---

# 使用 hexo generator 把博客转换成 rss

## 配置

### 添加功能插件，在 hexo 项目根目录下执行该命令

```bash
npm install hexo-generator-feed --save
```

### 在 hexo 根目录下的 \_config.yml 文件中添加配置

```shell
#订阅RSS
feed:
  type: atom
  path: atom.xml
  limit: false
```

可选项配置含义：(不想搞就默认上方)

`type`: RSS 的类型(atom/rss2)
`path`: 文件路径，默认是 `atom.xml`或者`rss2.xml`
`limit`: 展示文章的数量,使用 `0` 或则 `false` 代表展示全部
`hub`: URL of the PubSubHubbub hubs (如果使用不到可以为空)
`content`: （可选）设置 true 可以在 RSS 文件中包含文章全部内容，默认：`false`
`content_limit`: （可选）摘要中使用的帖子内容的默认长度。 仅在内容设置为`false`且未显示自定义帖子描述时才使用。
`content_limit_delim`: （可选）如果 content_limit 用于缩短 post 内容，则仅在此分隔符的最后一次出现时进行剪切，然后才达到字符限制。默认不使用。
`icon`: （可选）自定义订阅图标，默认设置为主配置中指定的图标。
`order_by`: 订阅内容的顺序。 (默认: -date)

### 在 theme 目录下的 \_config.yml 文件中添加配置

> 如果是按照安知鱼视频配置的，应该在根目录的\_config.anzhiyu.yml 里面添加

```
rss: /atom.xml
```

### 重新生成博客静态文件并发布

```bash
hexo clean && hexo g && hexo d
```

在 `public` 文件夹中就会生成 `atom.xml` 文件，部署后直接在根目录中访问该文件即可，在浏览器上就可以直接访问`你的网页/atom.xml`

## 订阅

在这里我们使用新的 rss 阅读器`follow`订阅并认证我们的 rss。

### 找到发现页

这里我使用的是 mac 的软件版 follow，左上角头像旁可以找到`+`进入发现页

![discover](https://s2.loli.net/2024/09/28/3H6bUKasZAWqnuo.png)

在框中输入你的`博客地址/atom.xml`，预览，添加

### 认证你的 rss

右键你自己的订阅，可以找到认证，follow 提供 3 种认证方式，我们选择最后一种 xml。你现在需要往自己的 xml 中添加一小段代码。

找到博客目录下的`public/atom.xml`

在这里面直接添加给你的代码，然后直接`hexo d`发布，不要`hexo clean`或`hexo g`。

![1](https://s2.loli.net/2024/09/28/envW1ExGktmIBud.png)

最后点击认证，即可成功。
