---
title: "把手弄脏：细节藏在过程中"
pubDatetime: 2023-03-12T09:26:50.854Z
postSlug: newsletter-54
tags:
  - newsletter
description: "做一件看似简单的事情，实际上需要相当多的经验和知识储备，才能真正又好又快地把事情做成。"
---

> 你好，我是小树。这是我为你写的第 54 封信。每期都会同步更新在微信公众号[一颗小树](https://weixin.sogou.com/weixin?query=a_warm_tree)和[竹白专栏](https://xiaoshu.zhubai.love)。现在有 221 位朋友订阅了这封信，也欢迎你[邮件订阅](https://xiaoshu.zhubai.love)，第一时间收到更新推送。

在过去，我常听到「躬身入局」、「把手弄脏」等描述，这意味着只有亲身实践才能真正获得收获，但其实我并没有太多的感同身受。

这篇文章是我最近对「把手弄脏」的思考和感悟。

### 业余时间的探索

最近，大家或多或少都听说过 ChatGPT，国内外也涌现出了很多优秀的应用。

我也利用业余时间进行了一些探索。目前很多应用都是基于 OpenAI API 的浅层封装，看起来仿佛很容易模仿和借鉴，因此我也尝试了一下。

在这个过程中，我遇到了第一个问题：作为一个独立开发者，如何在最低成本的情况下，最高效率地上线应用。

我的前同事 @EclipsePrayer 给了我一种可行的方案：

- NextJS：全栈应用框架
- TailwindCSS：CSS 框架，有大量社区资源可供复用
- Vercel：用于前端静态资源和 Edge Function 的部署，还可以开启 Analytics 作为简单的业务数据看板
- next-auth：和 NextJS 配合使用，解决用户登录问题
- prisma + planetscale：数据库方案
- tRPC + TypeScript：端到端的类型安全方案

得益于开源和云服务，上述方案可以实现零成本上线全栈应用。

如果我不亲自尝试，就不会意识到我之前几年基于公司内部技术栈的能力跟社区的脱节程度。

OpenAI 直接提供了 HTTP 接口，接入确实很简单。但是当我意识到需要将其开放给其他用户使用时，我发现需要解决几个问题：

1. 代理，保证国内用户能够正常访问
2. 鉴权，防止被不怀好意的人或者爬虫滥用
3. 限流，限制单个账号用量
4. 调用记录，记录用户用量，是限流和计费的基础

单纯基于 OpenAI 的接口做一次调用，在浏览器的控制台或者 terminal 中都很容易做到。

但是，如果想要将这个能力开放给其他用户使用，需要做很多额外的工作。这些“水下”的工作，如果不亲自参与去做的话，是无法真正感受到的。

由于需要支持微信登录，我希望实现过程越简单越好。在调研了一番后，发现腾讯云云开发看起来不错。接入其 SDK 后，只需要几行代码就可以支持微信授权登录。

为了减少按量付费可能带来的额外成本，我选择了最便宜的套餐，预付了一个月。

然而，当我开始准备基于公众号做微信授权登录时，我开始发现事情并不简单：

1. 公众号必须是服务号，不能是订阅号
2. 公众号必须要完成企业认证，成本 300 元和 1 ~ 3 个工作日
3. 网页授权页面需要完成 ICP 备案，这个过程可能几周到几个月不等
4. 腾讯云的域名备案甚至还需要绑定一个云资源
5. 腾讯云云开发的 SDK 只能支持微信端内的公众号授权登录，无法实现 Web 端的扫码登录
6. 腾讯云云开发的账密登录需要先通过其他方式登录再绑定；短信验证码登录预付费用户需要额外购买资源包；邮箱登录需要额外配置用于转发邮件的 SMTP 服务器

总之，我最初预想利用云开发快速实现用户登录的美好愿望落空了。

实际上，实现一件看似简单的事情需要相当多的经验和知识储备，才能真正又好又快地把事情做成。

希望自己以后能够更加注重细节，再简单的小事中也蕴含着不少知识，能够知其然也能知其所以然。

### 碎碎念

周末我偶然在 B 站上看到了一部名为《这货哪来的》的纪录片，它是由淘宝和《人生一串》原班人马制作的，聚焦于小生意人和烟火气的故事。

除了制作水平和观察视角外，对于我这样的 toB 从业者来说，对于中小企业的实际运作模式有了更深刻的了解和收获。

推荐给大家观看。

谢谢你的关注，我们下期再见。👋🏻

---

### 往期推荐

- [述职之后：见他人和见自己](https://mp.weixin.qq.com/s/Y0y-xW465GP5CLCfFKWJ6g)
- [给 flomo MEMO 做一次断舍离](https://mp.weixin.qq.com/s/L6DVfyfhCOqEcDLH31giAw)
- [一颗小树 #51 个人知识管理的困境与改进](https://mp.weixin.qq.com/s/kPeKgRTkefrodqnl_UUtpg)

你也可以在这里找到我：[即刻](https://okjk.co/3Vsn5T)、[Twitter](https://twitter.com/yeshu_in_future)、微信公众号[一颗小树](https://weixin.sogou.com/weixin?query=a_warm_tree)。

> 这里是小树的 [newsletter](https://xiaoshu.zhubai.love)。 每周一发布，欢迎[订阅](https://xiaoshu.zhubai.love)。
> 如果你觉得这篇文章对你有用，欢迎分享给更多好友。