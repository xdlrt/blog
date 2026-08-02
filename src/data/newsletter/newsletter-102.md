---
title: "Cubox 导出至 Obsidian 的工作流优化"
pubDatetime: 2024-03-10T11:51:07.694Z
postSlug: newsletter-102
tags:
  - newsletter
description: "随着 AI 的发展，那些以前很难得到满足的长尾需求会变得越来越容易实现，每个人在使用应用时的个性化程度也将会越来越高。在这条路上，会有越来越多有趣的变化和发展。"
---

> 你好，我是小树。这是我为你写的第 102 封信。每期都会同步更新在微信公众号[一颗小树](https://weixin.sogou.com/weixin?query=a_warm_tree)。

Cubox 是我的稍后读和标记工具，而 Obsidian 是我的个人知识库管理利器。

在 Cubox 中，我常会标记大量文章并附上个人见解，然而遗憾的是，Cubox 并未具备直接联动 Obsidian 的功能。

因此，我不得不先将标注导出为 Markdown 文件，再手动复制之至 Obsidian 的目录下，此过程无疑相当繁琐。

值得庆幸的是，经过学习 Cubox 的帮助文档，我发现 Cubox 提供了自定义动作的能力，能够很好的解决这个场景。

在我们着手这个问题之前，需要先在 Obsidian 中安装一个 Advanced URI 插件。

![](https://blog-1253298428.cos.ap-shanghai.myqcloud.com/uPic/7ce7459b2bb898b3a73746b749cfeaa8_MD5.png)

## Cubox 自定义动作实现

![](https://blog-1253298428.cos.ap-shanghai.myqcloud.com/uPic/bc12e08af0fbc5f092425641e5f650f4_MD5.png)

在 Cubox 客户端文章视图的「三个点」菜单里，点击「编辑」，可以看到自定义动作的标签。在这里，我们可以添加一个导出标注到 Obsidian 中的自定义动作。

![](https://blog-1253298428.cos.ap-shanghai.myqcloud.com/uPic/7fbd105638dc91c02993c23af3bd716a_MD5.png)

在这里，我们将使用 advanced-uri 插件，来打造一个全新动作。每当该动作被执行时，它将以 Cubox 卡片的标题作为文件名，并以标注的 Markdown 内容作为主体，生成一个全新的文档。

完整 URL 如下所示：

```
obsidian://advanced-uri?vault=wiki&filepath=/0. Inbox/Cubox/[card_title].md&mode=overwrite&data=[[card_title]]([web_url])%0A%0A[annote_markdown]
```

初看起来可能会有点复杂，不过不必担心，我们可以逐一拆分看：

- obsidian://advanced-uri，这代表调用 Obsidian 应用内指定的插件
- vault，代表 Obsidian 中知识库的名称，如果是中文的话，需要转义为 URL 支持的形式
- filepath，代表希望新建文件的指定路径
- mode=overwrite，意思是覆盖式更新文件内容
- data，代表希望写入文件的内容，可以用 Markdown 进行简单的排版，这里的 %0A 是换行符。
- 其余用方括号括起的内容为 Cubox 特定的模版变量，在下方有说明

![](https://blog-1253298428.cos.ap-shanghai.myqcloud.com/uPic/82764f3ebe80d1d90942a874ca9f3b3d_MD5.png)

保存设置后，只需单击启动这个自定义动作，就可以将当前文章的标签快速导出到 Obsidian。

## 优化导出内容

通过观察，我们可以发现上述导出的内容中，有一些内容是深度绑定于 Cubox 而我们实际并不需要的。

比如，额外的一级标题、Web 深度链接和 App 深度链接，这些并不适合存储在知识库中，不会产生实际的链接和价值。但每次导出后手动删除这些信息又显得十分繁琐。

考虑到 Obsidian 开放能力很强，于是我决定实现一个 format 插件，用来解决这个问题。我的需求很明确：

1. 文件导入至 Obsidian 后，自动触发 format 指令
2. format 指令能够删除额外的一级标题、Web 深度链接和 App 深度链接

在 GPT 老师的指导下，我用了大约一个小时就实现了这个插件。

插件的核心的逻辑并不复杂。为了实现需求 1 ，我需要监听文件的创建事件，而为了实现需求 2 ，插件需要遍历文档每行的内容，当匹配到指定规则后，就删除当前行。

![](https://blog-1253298428.cos.ap-shanghai.myqcloud.com/uPic/b6e9fe84e594ce6c560a9401a764a391_MD5.png)

如上图所示，经过 format 之后的文档内容，只保留了我所需的标注内容，整个视图变得非常清爽和舒服。

除了对工作流的优化，GPT-4 还帮我实现了插件 90% 的代码。它就像是一位知识储备丰富的实习生，只要我能够清楚地表达我的需求，它就能为我提供所需的解决方案。对于一些非常个性化的需求，我无需深入学习 Obsidian 插件开发的知识，也能快速解决当前面临的问题。

随着 AI 的发展，那些以前很难得到满足的长尾需求会变得越来越容易实现，每个人在使用应用时的个性化程度也将会越来越高。

在这条路上，会有越来越多有趣的变化和发展。

想要了解插件实现或直接使用，可以查阅 [obsidian-cubox](https://github.com/xdlrt/obsidian-cubox/)。

谢谢你的关注，我们下期再见。👋🏻

---

### 往期推荐

- [让时间慢下来](https://mp.weixin.qq.com/s/NCPsncu4VBDezQ6x2vWeVg)
- [Sam Altman 对提高个人生产力的建议](https://mp.weixin.qq.com/s/rNmCVV_XI0Ly8DziSK6lQw)
- [改变学习方法](https://mp.weixin.qq.com/s/p6nDVqzAItfYRoSOMnax1Q)

你也可以在这里找到我：[即刻](https://okjk.co/3Vsn5T)、[Twitter](https://twitter.com/yeshu_in_future)、微信公众号[一颗小树](https://weixin.sogou.com/weixin?query=a_warm_tree)。

> 如果你觉得这篇文章对你有用，欢迎分享给更多好友。
