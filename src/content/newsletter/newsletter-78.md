---
title: "结构化 prompt = 数字员工？"
pubDatetime: 2023-08-27T08:36:53.258Z
postSlug: newsletter-78
tags:
  - newsletter
description: "结构化的 prompt 模版，就是一份用于招聘数字员工的岗位描述，最终可以让 ChatGPT 为你生成专注于解决这个需求场景的助理。"
---

> 你好，我是小树。这是我为你写的第 78 封信。每期都会同步更新在微信公众号[一颗小树](https://weixin.sogou.com/weixin?query=a_warm_tree)和[竹白专栏](https://xiaoshu.zhubai.love)。现在有 327 位朋友订阅了这封信，也欢迎你。

## 为什么需要结构化 prompt

最近在做大模型相关的产品需求时，发现用户实际对输出的结果反馈效果并不好。

除开国产大模型本身的一些能力限制，在用户输入这端，也存在很多问题。

常见的问题：

1. 用户无法准确地描述自己的需求
2. 用户会默认大模型能够理解需求背后的背景信息、限制条件
3. 用户会默认大模型的输出结果符合自己的预期

举几个例子：

**为我写一篇关于赤壁赋的教案**

一个更好的写法是：你是一名中学语文老师，请为我撰写一份关于《赤壁赋》的教案，内容包括：教学目标、教学内容、教学步骤和评估方法，不少于 1000 字。

**按照销售渠道分析占比**

一个更好的写法是：你是一名数据分析专家，我的表格数据为 xxx，请帮我分析不同销售渠道本年度的销售金额趋势，并给出业务增长的建议。

这种提示词的书写方式，借鉴了 [CRISPE](https://github.com/mattnigh/ChatGPT3-Free-Prompt-List) 框架。

- CR：Capacity and Role（能力与角色）。用于指定 ChatGPT 扮演的角色。
- I：Insight（洞察力），背景信息和上下文。帮助 ChatGPT 理解你当前需求的情境，从而做出更合理的解答。
- S：Statement（指令），你希望 ChatGPT 帮你完成什么任务。
- P：Personality（个性），你希望 ChatGPT 以什么风格或方式回答你。
- E：Experiment（尝试），可以要求 ChatGPT 为你提供多个答案。

这就是我们俗称的：“你告诉大模型的信息越多，返回的结果就会越好。”

但使用过几次这种方式之后，就会意识到，这类框架只教会了我们思维方式，实际还是需要我们自己编写，就像是高考时的命题作文，即使有固定的套路，依然要靠自己的逻辑和思维能力才能把话说清楚。

通过这种方式生成的提示词不容易沉淀，每次都要重新写一份新的，如果是复杂的需求，费时费力。

如果想要批量化工厂化地生产提示词，并保证结果的稳定性，我们就需要更加结构化的提示词。

## 结构化 prompt 的好处

![](/images/newsletter-78/1.png)
基于这个 prompt，我向他提问：现在是否应该买房。
![](/images/newsletter-78/2.png)

从输出结果的角度看，一方面结构化的 prompt 能够降低模型理解的语义负担，从而提升理解效果。标签化的属性词起到了对 prompt 内容归纳和总结的作用，减少被 prompt 不相关内容干扰的可能。

另一方面，特定的属性词能够确保唤醒大模型的深层能力。比如用 Role 指定模型当前的角色，将 ChatGPT 固定为某个领域专家；用 Rules 规定模型应该遵守的规则，缓解大模型的幻觉和不良内容问题。

从使用者的角度看，结构化的 prompt 符合人的阅读和表达习惯，更易于书写和维护，相当于是把写作文的难度，降低到了完形填空。基于已有的 prompt 进行微调后适应自己当前的场景，也会更容易。

从构建生产级的 prompt 角度看，结构化意味着标准化，也是批量生产和维护的前提。结构化的 prompt 清晰地划分为了不同的模块，更易于用编程语言描述，也可以方便地进行版本管理。

现在很多地方都在提数字员工的概念，我认为结构化的 prompt 模版，就是一份用于招聘数字员工的岗位描述，最终可以让 ChatGPT 为你生成专注于解决这个需求场景的助理。

## 如何编写结构化提示词

下面是一个用于生产结构化 prompt 的模版，可以按照自己的需求场景进一步完善。
![](/images/newsletter-78/3.png)

各个模块的内容，可以按照自己的需要自行填充。

这是我按照模版实现的一个简单的“数字员工”。
![](/images/newsletter-78/4.png)

![](/images/newsletter-78/5.png)

注 1：以上方法基于 ChatGPT 模型产出，不同模型可能会有不同的提示词方法。

注 2：实际场景中，部分需求需要 GPT4 才能达到更好的效果，也有部分场景需要使用英文 prompt 效果更好，需要自行尝试。

这篇文章参考了如下内容，感谢社区的无私贡献：

- [构建高性能 Prompt 之路 — 结构化 Prompt](https://github.com/yzfly/LangGPT/blob/main/Docs/HowToWritestructuredPrompts.md)
- [泛函的 prompt 结构化模版](https://m.okjike.com/originalPosts/64d82b2c62e51d2dc7afcf8c?s=eyJ1IjoiNTdjYjdmMGZkM2Q1ZjExMzAwNWUzMDI0IiwiZCI6M30%3D&utm_source=wechat_session)
- [prompt 结构化写作思考](https://web.okjike.com/originalPost/64df250262e51d2dc753dc36)

### 碎碎念

推荐一期播客：[Ep98【沈阳生存手册】要不是怕削，我可就都说了](https://www.xiaoyuzhoufm.com/episode/64e3ad10e490c5dee51710b0)

这期太好了 🥹 最后的合唱让我热泪盈眶，好久没有这么简单纯粹的快乐了。谢谢基本无害，谢谢大风天。

谢谢你的关注，我们下期再见。👋🏻

---

### 往期推荐

- [如何降低知识焦虑](https://mp.weixin.qq.com/s/1zbdWLiCksXQeXfV3GhVDg)
- [提升信噪比：过滤有价值信息的方法](https://mp.weixin.qq.com/s/Pws-J-GKtonh8sZlAs5L0A)
- [做好时间管理的几个建议](https://mp.weixin.qq.com/s/Cv26pDlg22LfH0KaZB-NFg)

你也可以在这里找到我：[即刻](https://okjk.co/3Vsn5T)、[Twitter](https://twitter.com/yeshu_in_future)、微信公众号[一颗小树](https://weixin.sogou.com/weixin?query=a_warm_tree)。

> 如果你觉得这篇文章对你有用，欢迎分享给更多好友。
