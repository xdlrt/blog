---
title: "仅需 10 分钟，用 GPTs 实现文章总结助手"
pubDatetime: 2023-11-12T12:55:29.194Z
postSlug: newsletter-88
tags:
  - newsletter
description: "每一个 GPTs 就像是一个数字助理，一个人可以真正成为一个团队了。"
---

> 你好，我是小树。这是我为你写的第 88 封信。每期都会同步更新在微信公众号[一颗小树](https://weixin.sogou.com/weixin?query=a_warm_tree)。

## 什么是 GPTs

根据 OpenAI [官方博客文章](https://openai.com/blog/introducing-gpts)的定义，GPTs 就是根据特定的使用场景，创建出的特定版本的 ChatGPT。

相较于之前的通用模型，GPTs 提供了一种新方式，每个人都可以根据自己的日常生活、特定任务或实际工作中的问题，定制一个专属的 ChatGPT 版本。

## GPTs 解决了什么问题

![1.jpeg](/images/newsletter-88/1.jpeg)

首先，创建专属的 ChatGPT 版本不再需要具备编码能力，整个过程都是通过自然语言对话的方式来进行。

通用的 ChatGPT 模型很强大，但想要应用到实际场景中，还是有一定距离。这就产生了大量针对垂直场景的微调工作，或者长的像一篇文章一样的 prompt。

这些工作对于普通用户来说，还是具备一定的门槛，GPTs 解决了这个问题，普通用户不再需要学习复杂的技术概念，只需要进行几轮简单的对话，就可以实现自己想要的工具。

其次，借助目前已经内置的能力，可以实现非常丰富的交互。

使用 Knowledge 能力上传你自己的内容，可以实现对私有数据的学习和理解，更贴近你真实的使用场景。

还有三个内置的功能：

第一个是 Web Browsing，也就是俗称的联网能力，只需要输入一个链接，ChatGPT 就可以帮我们理解并总结链接内容，或者是查询互联网上的公开信息。

第二个是 DALL\* E 的生图能力，能够快速将脑海中的想法转化为一副图片，并且持续进行调整，直到满意为止。

第三个是 Code interpreter，即代码解释器，它能够根据你的需求，尝试读取你上传的文件，生成 Python 脚本并执行，实现数据分析等更复杂的能力。

代码解释器的效用不需要仅仅局限在数据分析，只要 Python 脚本能解决的问题，理论上都可以通过它来实现。

除此以外，借助 Actions 能力，还可以和符合 OpenAI schema 规范的内容进行联动，通过 Function Calling 的方式调用外部 AI 来实现更多的能力。

![2.jpeg](/images/newsletter-88/2.jpeg)

举个例子，可以让你的 GPTs 在完成数据分析之后，把结果以邮件的形式发送给你。

## 创建一个 GPTs

说了这么多，我们来实际创建一个自己要用的 GPTs 吧。

作为日常需要大量摄入长文的读者，我希望能够借助 AI 实现对文章的初筛。我的基础需求如下：

1. 帮我一句话总结出文章的核心内容
2. 通过分点的方式，总结文章各部分内容

![3.jpeg](/images/newsletter-88/3.jpeg)

我把我的需求告诉它之后，它为我起了个 Article Analyst 的名字，我觉得不错，确认之后就为我生成了一个还不错的 logo。

与此同时，还自动生成了对功能的描述以及四个方便使用者快速开始的指令。

![4.jpeg](/images/newsletter-88/4.jpeg)

接着，它向我确认文章更偏向于哪一类的内容，方便它进行后续的微调。

再之后，又向我明确了是否有相关的禁忌，交互时的语气风格等等。

![6.jpeg](/images/newsletter-88/6.jpeg)

至此，我们的文章阅读小助手已经可以体验了。

初次尝试，效果看起来不太符合预期。

![7.jpeg](/images/newsletter-88/7.jpeg)

没关系，我们再尝试和它沟通，优化一下输出的结构。

![8.jpeg](/images/newsletter-88/8.jpeg)

最后，点击右上角的发布，就可以愉快的使用了。

欢迎体验：[ChatGPT - Article Analyst (openai.com)](https://chat.openai.com/g/g-u4tF0Z7hO-article-analyst)

![9.jpeg](/images/newsletter-88/9.jpeg)

## 一些感想

在这个过程中，给我感触最深是 GPTs 的整个创建流程，基本实现了 LUI（自然语言交互界面）的能力。

无论是每一步的引导，或者在发现效果不符合预期时的调整，我只需要想明白并且用自然语言描述清楚我的诉求，它就能帮我把应用优化完成。

甚至你在反复调整后，选择第一版时，它也不会在心里默默抓狂。

当然，我认为目前的 GPTs 还有一些待优化的痛点。

1. 当前使用入口必须在 ChatGPT 内，如果创建好的 GPTs 能够以 API 的方式输出，会和我自己的工作流结合地更为紧密。比如上面的文章总结助手，我就可以自己实现一个浏览器插件来无缝使用。
2. GPT4 的 3 小时 50 条限制依然存在，这决定了目前 GPTs 还是更适合即用即走的工具性质的小应用，对于更为复杂地需要长时间多轮对话的场景，还不太够用。
3. Knowledge 的用法不够明确，可控性不够好。最多只允许上传 10 个文档，实际输出的内容，相关性也较差。不过也可能是我姿势不对，如果有了解的小伙伴欢迎交流、指教。

我已经在着手梳理自己日常的工作流，计划将其中可以被 AI 优化的部分都使用 GPTs 来承载。

每一个 GPTs 就像是一个数字助理，一个人可以真正成为一个团队了。

### 碎碎念

你自己有哪些使用场景呢？或是希望解决自己的哪些实际问题，我可以帮你尝试解决，欢迎转发留言评论。

谢谢你的关注，我们下期再见。👋🏻

---

### 往期推荐

- [高质量的需求交付](https://mp.weixin.qq.com/s/ZK_8I9-Qx8Bm6D6lAoockQ)
- [产品始于问题，而不是解决方案](https://mp.weixin.qq.com/s/-_4vEUm9OcmpkyNn5LdzOQ)
- [如何更好地休息](https://mp.weixin.qq.com/s/nbYs0vdCPeKQcmLSJ3Id-A)
- [最优解人生](https://mp.weixin.qq.com/s/KGfBZQwVOqe1vyc2-Vuvmw)
- [租房和生活选择权](https://mp.weixin.qq.com/s/r9bwut24cnqEX_piyjid5Q)
- [做了几个月大模型产品，我学到了什么](https://mp.weixin.qq.com/s/3b6FABhlkNY20hA_gVJsnw)
- [结构化 prompt = 数字员工？](https://mp.weixin.qq.com/s/pAjM2BG2S49Pp0uc1ocZSA)

你也可以在这里找到我：[即刻](https://okjk.co/3Vsn5T)、[Twitter](https://twitter.com/yeshu_in_future)、微信公众号[一颗小树](https://weixin.sogou.com/weixin?query=a_warm_tree)。

> 如果你觉得这篇文章对你有用，欢迎分享给更多好友。
