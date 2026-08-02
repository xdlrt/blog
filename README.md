# 一颗小树

也树的个人博客，记录技术、产品与生活。

在线访问：[yeshu.cloud](https://yeshu.cloud)

站点使用 Markdown 管理内容，提供文章归档、标签、搜索、RSS、深色模式与响应式阅读体验。

## 技术栈

- Astro 7
- React 19
- Tailwind CSS 4
- TypeScript
- Playwright

## 本地运行

项目需要 Node.js 24.x，推荐使用 `.nvmrc` 切换版本：

```bash
nvm use
npm install
npm run dev
```

访问 <http://localhost:4321> 查看站点。

```bash
npm run build         # 构建生产版本
npm run preview       # 预览生产构建
npm run format:check  # 检查代码格式
npm run test:ui       # 运行端到端测试
```

## 内容位置

- 博客文章：`src/data/blog/`
- Newsletter：`src/data/newsletter/`
- 关于页：`src/pages/about.md`
- 站点配置：`src/config.ts`
