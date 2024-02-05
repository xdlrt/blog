---
title: "AI 带我读论文"
pubDatetime: 2024-02-03T10:30:54.765Z
postSlug: newsletter-98
tags:
  - newsletter
description: "我已经离不开 AI 老师了。"
---

> 你好，我是小树。这是我为你写的第 98 封信。每期都会同步更新在微信公众号[一颗小树](https://weixin.sogou.com/weixin?query=a_warm_tree)。

这周来分享一下我最近正在尝试的 AI 辅助阅读论文的方法。

我们以这篇[Retrieval-Augmented Generation for Large Language Models: A Survey](https://arxiv.org/abs/2312.10997)论文为例。

这篇论文从比较上层的视角，介绍了检索生成技术（RAG），希望借助它解决大语言模型（LLMs）处理特定领域知识的局限性，比如幻觉、过时和推理过程不透明。论文详细地介绍了检索（Retrieval）、生成（Generation）和增强（Augmentation）的各个环节，解释了不同 RAG 技术的演进过程以及度量方法，承认了目前的限制，展望了未来的研究方向。

说到这里，其实我已经开始看不懂了，不过没关系，让我们请出今天的主角 - [Kimi](https://kimi.moonshot.cn/)。

和 ChatGPT 等主流的大模型不同，Kimi 最大的差异点在于**超长无损的记忆能力**，这意味着它在处理更长的信息内容的同时，还能保持足够高的精准度。

我日常使用比较多的是 Web 端，浏览器中访问 https://kimi.moonshot.cn/ 即可。

![](/images/newsletter-98/1.png)

界面很简洁，输入框用来输入 prompt，点击右边的文件图标可以上传本地文件，支持最多 50 个，每个 100 MB 的文件上传，支持 pdf、doc、xlsx、ppt、txt、图片等格式。

我已经提前把上面这篇论文以 PDF 的格式下载好，接下来看看它的表现如何。

这篇论文一共有 26 页，是全英文的，如果要全部读完需要很长时间。

特别是现在，AI 领域发展一日千里，知识迭代非常快，论文数量也非常多，因此，我希望借助 AI 进行一轮初步的筛选。

我们知道，论文的结构相对比较固定，通常是这样：标题 → 概要 → 导言 → 方法 → 实验 → 结论。

因此，我可以先借助这样的结构，概括性地了解整篇论文的关键内容。

我的 prompt 是：

```
请从以下 5 个方面帮我总结这篇论文：
1. 解决了哪些问题？
2. 提出了哪些解决方案？
3. 解决方案中关键的方法/步骤/策略是什么？
4. 最终的结论是什么？
5. 其中的解决方案有哪些约束和限制？

请有条理地组织以上信息，确保覆盖到每一方面。
```

它的回答是：
![](/images/newsletter-98/2.jpg)
看起来还不错，要点都覆盖到了。

接着，我会针对我想要了解的细节，进一步提问。

针对不同的场景，可以用一点简单的提问策略。

What：让 Kimi 基于论文内容解释不熟悉的概念。

Why：为什么要使用这种解决方案，有哪些优点。

How：在论文中解决方案具体是如何经过实验验证的。

同时，为了让 Kimi 能够更聚焦在论文内容本身，并且发现感兴趣或不确定的内容能够快速印证，我们优化一下提问的方式。

我的 prompt 是：

```
问题：对比解释一下 Naive RAG、Advanced RAG、Modular RAG 的优缺点。

请先从文档中拉取 2-3 条上述问题相关的引用(quotes)。然后回复上述问题。如果文档内容不包含问题相关信息，请回复文档中没有相关内容。
```

它的回答是：
![](/images/newsletter-98/3.jpg)
这样一来，我就大致理解了三种不同的 RAG 技术的优缺点，并且可以通过原文的引用在论文中进行搜索和查看。

如果有进一步的问题，可以通过这种提问策略，继续深入和它探讨。

通过这种方式，就可以快速了解一篇论文的核心内容，并且针对我的感兴趣地内容，不断深挖。

如果论文内容很感兴趣，就可以在此基础上继续精读；如果内容泛泛而谈或者自己比较熟悉，就可以快速完成浏览。

最后，Kimi 是国内的产品，没有网络和访问的限制，目前也是完全免费的状态。

如果大家有兴趣都可以访问 Kimi(https://kimi.moonshot.cn/) 体验，和我无利益相关，确实很好用。

这篇文章的内容还参考了：

- [用 AI 读论文](https://m.okjike.com/originalPosts/65865f9b60830f16ae4169fe?s=eyJ1IjoiNWVlMDUzYjQxMDAwMGUwMDE3NmU3MDYxIiwiZCI6MX0%3D)
- [研究 AI 和论文的经验分享](https://m.okjike.com/originalPosts/656970b9c9ed8caff01c6b0a?s=eyJ1IjoiNTdjYjdmMGZkM2Q1ZjExMzAwNWUzMDI0IiwiZCI6MX0%3D&utm_source=wechat_session)

特此致谢。

### 碎碎念

祝大家龙年大吉，开开心心过大年。

从这周开始休假，过年期间随缘更新，休息最重要。

谢谢你的关注，我们下期再见。👋🏻

---

### 往期推荐

- [改变学习方法](https://mp.weixin.qq.com/s/p6nDVqzAItfYRoSOMnax1Q)
- [小树的 2024 年计划](https://mp.weixin.qq.com/s/aONqRY6bqK5unrewoGZv7w)
- [小树的 2023 年终总结](https://mp.weixin.qq.com/s/rAcfoMnmNL5sYjQqsCm39w)
- [小树的 2023 书单](https://mp.weixin.qq.com/s/6cK60OCYpcqncs3DF9GjeA)
- [周更的第 100 篇](https://mp.weixin.qq.com/s/58mHog5-aX_ALNqVDfEbUg)

你也可以在这里找到我：[即刻](https://okjk.co/3Vsn5T)、[Twitter](https://twitter.com/yeshu_in_future)、微信公众号[一颗小树](https://weixin.sogou.com/weixin?query=a_warm_tree)。

> 如果你觉得这篇文章对你有用，欢迎分享给更多好友。
