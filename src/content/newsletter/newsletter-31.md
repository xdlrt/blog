---
title: "一颗小树 #31 Figma 的成功之道"
postSlug: e84531e1
pubDatetime: 2022-09-18T22:10:26.000Z
tags:
  - newsletter
description: Figma 是为团队合作而生的设计工具，而不仅仅是设计师的设计工具。
---

> 你好，我是小树。这是我为你写的第 31 封信。每期都会同步更新在微信公众号[一颗小树](https://weixin.sogou.com/weixin?query=a_warm_tree)和[竹白专栏](https://xiaoshu.zhubai.love)。现在有 107 位朋友订阅了这封信，也欢迎你[邮件订阅](https://xiaoshu.zhubai.love)，第一时间收到更新推送。

最近看到 Adobe 200 亿美元收购 Figma 的新闻，在查看相关信息的时候发现了一篇 2020 年 6 月的文章 [Why Figma Wins](https://kwokchain.com/2020/06/19/why-figma-wins/)，内容很不错，这篇是学习笔记。

![](/images/newsletter-31/loops-2.webp)

长期成功的公司会不断找到下一个业务增长的循环，上面这张图展示了 Figma 走向成功的关键路径。

**构成 Figma 核心循环的基础是为设计过程中的每个参与者提供能力，而不仅仅是设计师。**

这推动了产品第一阶段的增长和产品的网络效应，其中有三个关键的选择：

1. 将 Figma 构建为真正的浏览器优先，而不仅仅是将存储存储在云中
2. Figma 团队在 WebGL 和 CRDT 等新技术方面领先一步，使这种浏览器优先的方法成为可能
3. 专注于数字产品构建中的矢量图形场景

![](/images/newsletter-31/01.1-merged.webp)

这张图是 Kevin Kwok 对仅仅使用云端存储和基于浏览器的在线协作的区别。事实上，如果仅仅将文件存储在云端，会面临非常繁琐的信息同步问题，没有真正解决协同效率的问题。

用户的每一次编辑都会产生一个新的副本，进而导致无数碎片化的版本产生，比如《xxx 设计稿定稿 V1.2》这样的文件，不仅繁琐低效，也很难快速反馈设计内容的变化。

![](/images/newsletter-31/figma-in-all.webp)

另外一个变化是，浏览器优先的策略使得非设计师的协作成本大大降低了，浏览器天然是跨平台的，我们再也不需要下载和学习使用 PhotoShop 或者 Sketch 这种臃肿专业的软件。

![](/images/newsletter-31/04.1-means-of-ascent-merged.webp)

Figma 也希望让非设计的角色尽早地参与进来。如果我们在 Figma 中能够将设计规范、产品原型以及设计稿都整合在一起，并且通过在线评论等协作的能力让所有人更早的参与进来，能够大大减少其它参与者的参与门槛，设计师也能更早地收到反馈，减少合作中的摩擦。

**Figma 是为团队合作而生的设计工具，而不仅仅是设计师的设计工具。**

构成 Figma 第二个增长循环的是企业销售策略和产品的交叉影响效应。

![](/images/newsletter-31/05.1-cross-side-network-effects-merged.webp)

在以往的协作流程中，设计师往往是单向和其他职能的伙伴进行协作，但在 Figma 中可以实现跨团队、跨职能的协作。使用 Figma 的设计师在这些协作中，又会影响其它非设计的伙伴向其它的设计团队传播，从而实现产品在整个组织中的转移。

![](/images/newsletter-31/06.2-product-distribution.webp)

这种交叉影响产生的网络效应，又会直接影响公司的付费意愿。如果产品经理、工程师甚至 CEO 都认为这个工具很重要，显然要比仅仅能给设计师带来好处而产生的购买决策要容易的多。

越来越多的企业会关注员工的声音，一线的员工对工作中需要的工具更有发言权，而不仅仅是依赖 KP（关键角色）的决策。

因此，自下而上的产品使用扩张，再通过自上而下的方式销售，实现了 Figma 第二个增长循环。

Figma 正在尝试的第三个增长循环是平台和开放能力。

![](/images/newsletter-31/global-network-effects.webp)

如果仅仅将创造力维系在公司内部，是比较受限的。Figma 期望能够在公司间推动协作和提高生产力，构建全球范围的网络效应。在 2019 年和 2020 年 Figma 相继推出了插件能力和社区，开始构建自己的平台能力。

仅仅靠 Figma 是不可能满足所有公司的诉求的，因此需要不断提高平台的开放能力，汇集更多公司和人的智慧。这也是产品想要进一步扩大规模行之有效的杠杆。

![](/images/newsletter-31/plugin-system.webp)

但开放能力也有不同的做法，Kevin Kwok 认为开放也需要保证使用的体验和一定的约束。比如 Sketch 的插件需要在 Github 下载后在安装，而 Figma 开箱即用；Sketch 的插件比较难以控制安全性、稳定性和性能，而 Figma 会对这些关键环节进行约束，以降低插件的开发成本，提升插件的质量。两者很像安卓和 iOS 的应用策略。

这篇文章无论是从基于浏览器的在线协同本身的价值，还是 B 端产品的销售增长策略，或是通过开放能力进一步撬动增长杠杆，都让我对正在做的协同产品领域有不小的收获，也推荐阅读英文原文。

Adobe 的数字媒体业务总裁 David Wadhwani 说：

> Figma 很早就把赌注押在浏览器上，为人们的协同开启了全新的方式。他们是第一个认识到产品设计不仅仅是一个工具：它开始于所有利益相关者的头脑风暴；它本质上是多玩家和基于网络的；它需要复杂的设计系统和分析能力。

期望未来会有越来越多真正为生产力带来变革的协同工具。

### 碎碎念

希望国庆能够出京。

谢谢你的关注，我们下期再见。👋🏻

---

### 往期推荐

- [一颗小树 #30 拓宽自己 拥抱善意](https://mp.weixin.qq.com/s/grYVHXJa4UNPkv2L-PLUyA)
- [一颗小树 #28 隐入尘烟](https://mp.weixin.qq.com/s/c-nSs-e-VxvRJu2SrrMGpw)
- [一颗小树 #27 找到并坚持自己的热爱](https://mp.weixin.qq.com/s/-tF20PdAdMuqXakuBt7_wQ)

你也可以在这里找到我：[即刻](https://okjk.co/3Vsn5T)、[Twitter](https://twitter.com/yeshu_in_future)、微信公众号[一颗小树](https://weixin.sogou.com/weixin?query=a_warm_tree)。

> 这里是小树的 [newsletter](https://xiaoshu.zhubai.love)。 每周一发布，欢迎[订阅](https://xiaoshu.zhubai.love)。
> 如果你觉得这篇文章对你有用，欢迎分享给更多好友。
