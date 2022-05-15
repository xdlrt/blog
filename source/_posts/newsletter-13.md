---
title: '一颗小树 #13 别忘记你的热爱'
categories: newsletter
description: '让你很容易进入心流的事情，大概率就是你热爱的事情，别忘记你的热爱。'
abbrlink: 5b43661
date: 2022-05-15 17:10:00
tags:
---

> *你好，我是小树。这是我为你写的第 13 封信。每期都会同步更新在微信公众号「一颗小树」和[竹白专栏](https://xiaoshu.zhubai.love)。现在有 53 位朋友订阅了这封信，也欢迎你[邮件订阅](https://xiaoshu.zhubai.love)，第一时间收到更新推送。*

### 找模板的故事

2017 年年底，是我在大学的最后一个学期，即将面临毕设答辩。工作室的小伙伴们有了一个想法，既然我们最擅长的是 PPT，是否可以做一个小程序来分享积累的模板。当时我们脑子里没有什么商业模式的概念，也没有什么顾虑，就直接开干了。

记得当时小程序的开发体验简直是灾难，所以选择了 mpvue 作为开发框架。又因为当时还没有服务端的经验，最终选择了一个 BaaS 服务，开发版有免费的额度，足够我们当时用了。这个小程序，我们最终叫它「找模板」。

但遗憾的是，已经记不清楚是什么时候上线的，影响了多少人。

这四年中大部分的时间精力都投入在工作上，它就在默默运行着。最近又关注它是因为突然不能正常使用了，在 BaaS 服务的后台看到两年前已经不再提供免费额度了，但今年才正式开始生效，当前已经停止服务，并在 15 天后删除所有数据。

虽然现在看来，这个产品非常稚嫩，也没有太多技术含量，但它依然是对我记忆里那段时光和人的记录，矫情地讲，情怀还在。于是我决定翻新一下，让它活的更久一点。

这里面主要是两个问题：代码的可维护性和云服务的成本问题。

由于代码长期没有迭代，mpvue 也已经不再维护，多方调研后，选择迁移到了 uni-app，整体还算平滑，让小程序代码重新变得可维护。另外一方面，由于图片体积没有控制，客户端获取到的图片体积非常大，流量浪费很严重，因此利用图片 OSS 服务的编辑能力，进行了尺寸压缩和 WEBP 转换，图片尺寸平均缩小 70% 以上，成功解决了流量的额外支出问题，访问也更快了。

这个过程中，没有多么高大上的技术架构，就是不断解决体验的细节问题，但让我又找到了创造感、价值感和长时间保持专注的的感觉。

**让你很容易进入心流的事情，大概率就是你热爱的事情，别忘记你的热爱。**

也欢迎体验这个微信小程序。

![](/images/newsletter-13/2.jpg)

### 文章推荐

[把自己当作资产](https://mp.weixin.qq.com/s?__biz=MzIzNTQ4ODg4OA==&mid=2247487732&idx=1&sn=48c4427077cfe0eae3fff9f3d8eec3bb&chksm=e8e703e3df908af5955e0a2cda936a7ced4cdb56489b32d6dffa30e8a2223691883032f4cf14&mpshare=1&scene=1&srcid=0509yIniMvZTjsYdDts0frKn&sharer_sharetime=1652026911449&sharer_shareid=4c63140522fe404b48188e25cc789c37#rd)

![](/images/newsletter-13/1.jpeg)

如果把我们自己也当作一种资产，也许会有很多和原来不一样的发现：
- 年轻时我们是不是应该更多地投资股票？
- 当我们在考虑金融资产投资分散的时候，有没有想过和自己这种资产做一下分散？
- 我们总说能力圈，这通常导致自己投资了很多和所在行业相关的股票。如果把人力资本考虑进来，我们是不是应该投资那些和自己完全不相关的行业？
- 我们有没有充分利用保险，对冲掉可能发生的人力资本的损失？

[The Joy of Small Projects - Dominick Schroer's Blog](https://schroer.ca/2022/04/10/the-joy-of-small-projects/)

如何锻炼自己做成事的能力呢？可以从创造小的项目开始。这篇文章告诉你如何从选题到执行，花上几个小时或者一个周末的时间，创造出小的项目。

[Web3 DApp 最佳编程实践指南](https://guoyu.mirror.xyz/RD-xkpoxasAU7x5MIJmiCX4gll3Cs0pAd5iM258S1Ek)

这篇文章将会涉及到开发一个 DApp 所涵盖的几乎所有方面的内容，非常实在和接地气。

[Google I/O 2022: 促进知识和计算机技术发展](https://mp.weixin.qq.com/s?__biz=MjM5MTEyNjQ3MA==&mid=2649695895&idx=1&sn=f46ffeb62059f6d41a3a1925b3739a26&chksm=bea1c03e89d64928aaf0405eb49d9490d17a994919cbeedd88b0c90e5f8c5215b7e220c8c3a3&mpshare=1&scene=1&srcid=0512vxAZsm1GbeDHHsaDOmgE&sharer_sharetime=1652321245913&sharer_shareid=4c63140522fe404b48188e25cc789c37#rd)

Sundar Pichai 在今天的 Google I/O 开发者大会开幕式上发表的主题演讲全文。

[8400万美元撬动400亿金融帝国，UST崩盘始末](https://m.theblockbeats.info/news/30504)

最近比较出圈的一个事件，来看看 Luna 这个 TVL 近 200 亿美元的第二大公链生态，在短短 2 天时间同时重演了泰铢和雷曼的恐怖灾难。

[Terra：区块链领域的支付宝，破壁加密世界和传统商业](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247488708&idx=1&sn=e3031c4ebb1cd1968c632177102e0dc3&chksm=ce98ab5af9ef224ca05a63c8007f5dd6c48340455727f861fa6b47fa3c2e153177d80c8f6f4d&mpshare=1&scene=1&srcid=0512cR4qkkSt2YCaorJp47k5&sharer_sharetime=1652360109762&sharer_shareid=4c63140522fe404b48188e25cc789c37#rd)

除了 Luna 事件本身，我们来看看 Terra 到底想做什么，做了什么。

### 新鲜玩意儿

[Language Reactor](https://www.languagereactor.com/)

非常棒的语言学习工具，在你观看视频时实时对照字幕翻译。支持 YouTube、Netflix 等视频网站。

[Relingo | 阅读感兴趣的英语文章，观看感兴趣的视频，渐进式掌握词汇](https://relingo.net/zh/index#top)

这个浏览器插件可以帮助你发现生词和难词，自动标示和翻译，并持续积累个人生词本，日常阅读中即可轻松掌握。

[No Code Builder](https://www.nocodebuilder.co/)

网站收录了非常多的低代码/无代码的产品，可以帮助你快速了解这个行业。

### 碎碎念

又是疫情居家办公的一周，到目前为止，一切都还好。中间传出过一次要静默的谣言，引发了大家的恐慌情绪，超市和菜市场又一次人满为患。好在这周又通过网购和外卖补充了一些基础物资，做好了应对。居家的好处是省了一大块通勤的时间，厨艺也有不小的长进。

希望早日恢复正常的生活，回到办公室和大家见见面。

谢谢你的关注，我们下期再见。👋🏻

---

### 往期推荐

- [一颗小树 #11 开始投资前更重要的事](https://xiaoshu.zhubai.love/posts/2132745094586081280)
- [一颗小树 #9 疫情之下 重建内心的秩序](https://xiaoshu.zhubai.love/posts/2127657453835132928)
- [一颗小树 #8 不要倒在黎明前](https://xiaoshu.zhubai.love/posts/2125116827176398848)

你也可以在这里找到我：[即刻](https://okjk.co/3Vsn5T)、[Twitter](https://twitter.com/yeshu_in_future)、微信公众号「一颗小树」。

> 这里是小树的 [newsletter](https://xiaoshu.zhubai.love)。每周一发布，欢迎[订阅](https://xiaoshu.zhubai.love)。
> 如果你觉得这篇文章对你有用，欢迎分享给更多好友。
