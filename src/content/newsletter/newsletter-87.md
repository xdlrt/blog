---
title: "高质量的需求交付"
pubDatetime: 2023-11-05T13:11:54.221Z
postSlug: newsletter-87
tags:
  - newsletter
description: "让产品能够因为自己，更好一点点。"
---

> 你好，我是小树。这是我为你写的第 87 封信。每期都会同步更新在微信公众号[一颗小树](https://weixin.sogou.com/weixin?query=a_warm_tree)。

最近的一些讨论内容，整理润色之后，分享给大家。

作为互联网公司的前端同学，本职工作是实现用户交互和逻辑，交付业务需求。

那么什么是一次高质量的交付呢？

我按照一次需求交付的周期来划分，总结了一些自己的经验。

## 开发前

### 需求评估

这个阶段我会做两件事。

首先是以用户视角来评估产品需求是否合理，在讨论中充分表达自己的意见。

其次是理解需求的核心诉求，即究竟要解决什么问题。发现需求中明显不合理的部分，或是提出一些可能成本更低，效果类似的方案。

### 需求拆解

详细拆解需求，我的习惯是会拆分比较细，具体到每一个设计稿以及每一个交互点。

对于复杂的业务或技术流程，推荐多画图，时序图、流程图等图标能够很好地帮助我们厘清业务流程。

在拆解过程中，一定能发现一些新的问题，如果在开发前能够及时确认，就能够尽早暴露问题，尽可能避免过程中再返工或者耽误时间。

当然，在开发过程中会发现新的问题，可以持续更新这份文档，是一份非常好的过程留痕。

无论是日后自己拿出来回顾做总结，还是为其他人以后的需求开发提供依据，都是很好的归档资料。

根据自己的业务场景，可以沉淀一份模版，把一些格式性或是需要重点思考的内容固定下来，方便日后使用。

### 测试驱动

在需求拆解完之后，我们就能够梳理出完备的测试用例。

有一些复杂的业务和大型的业务团队，这部分功能可能是由专业的测试同学来完成，开发同学只需要确认用例内容是否合理。

但多数情况下，开发同学最理解需求是如何实现，以及实际的影响范围有哪些，我依然建议开发同学能够自己梳理测试用例。

对于前端同学来说，开发过程往往会更关注单点问题的解决，在某个点上反复测试，反而容易忽略实际的用户链路。

如果事先梳理一份用户视角的测试用例，可以一定程度上破除这种知识的「诅咒」。

### 需求排期

需求拆解完之后，就可以将它转换为一系列任务。这部分需要有一定的项目管理经验，具体的情况很多，不展开讲。

但我自己的一个最常用的指标是：任务是否对外部有依赖。管理是期望提高进度的可控性，而外部依赖相较而言是没有自身（或团队内部）可控的。

优先解决外部依赖可能的问题，是降低需求交付风险的一种方法。

### 数据意识

了解当前负责业务的关键指标，结合此需求的目标，和产品经理明确数据埋点的需求。

多数情况下，埋点都不会影响技术方案，但预先聊清楚也会规避一些小概率的风险。

## 开发中

### 自动化

对于开发者来说，一切能自动化的流程，都应当自动化，这样能够提升需求交付的下限。

如果发现一次需求开发中有大量的人工流程，就可以多考虑提升自动化的水平。

一点暴论：一切依赖人工的流程都是不可靠的、不可持续的。

### 可维护性

这部分有很多成熟的内容去讲，不同的场景也会有不同的考量，我这里挑几条自己最常用的：

- 写让同事看的懂的代码，实现简单直接，越简单越不容易出错
- 模块能够低耦合、高内聚，后续迭代影响的范围会更小，问题定位会更快
- 关键逻辑增加日志，方便线上增加监控，辅助定位和排查问题

### 充分自测

至少要保证用户视角的功能自测通过。

有条件的情况下，补充关键模块的单元测试以及核心链路的 E2E 测试。

### 埋点验证

功能开发完成后，按照需求完成数据埋点，并在上线前验证数据埋点的结果符合预期，能够推演出需要的数据结论。

## 上线后

### 线上监控

配置并关注异常监控，关注相关的用户反馈，保持对问题的敏感，及时处理，避免小问题扩大成大问题。

### 跟踪业务效果

持续跟进业务数据，为产品同学改进产品功能提供依据，协助团队实现业务目标。

## 小结

最后，总结一下，我会在实际写代码之前进行大量的梳理和文档工作，把更多的脑力工作前置，最好能够达到写代码只需要逐步「翻译」文档中梳理的逻辑。

让自己更有参与感，不要做工具人，很多时候更好的方案都是产品和技术共同碰撞出来的。

不过，也不必太过教条，很多步骤都可以结合实际情况灵活处理。

希望对你有些启发。

### 碎碎念

这周拔草了西塔老太太，酸甜口芝麻酱的烧烤蘸料还是第一次尝试，很特别。

服务出乎意料的恰到好处，比如：在生菜吃完快吃完的时候，会主动帮你续上一份；在烤肉的篦子有些焦糊处的时候，已经安排了人来更换；在你烤累的时候，主动帮你把剩下的肉烤完。

其它的一些需求响应同样很快，不会过分热情，但能够在有需要的时候快速解决。

整体品质不错，值得一试。

谢谢你的关注，我们下期再见。👋🏻

---

### 往期推荐

- [产品始于问题，而不是解决方案](https://mp.weixin.qq.com/s/-_4vEUm9OcmpkyNn5LdzOQ)
- [如何更好地休息](https://mp.weixin.qq.com/s/nbYs0vdCPeKQcmLSJ3Id-A)
- [最优解人生](https://mp.weixin.qq.com/s/KGfBZQwVOqe1vyc2-Vuvmw)
- [租房和生活选择权](https://mp.weixin.qq.com/s/r9bwut24cnqEX_piyjid5Q)
- [做了几个月大模型产品，我学到了什么](https://mp.weixin.qq.com/s/3b6FABhlkNY20hA_gVJsnw)
- [结构化 prompt = 数字员工？](https://mp.weixin.qq.com/s/pAjM2BG2S49Pp0uc1ocZSA)

你也可以在这里找到我：[即刻](https://okjk.co/3Vsn5T)、[Twitter](https://twitter.com/yeshu_in_future)、微信公众号[一颗小树](https://weixin.sogou.com/weixin?query=a_warm_tree)。

> 如果你觉得这篇文章对你有用，欢迎分享给更多好友。