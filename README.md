# openclaw-blog-live-example

Astro + GitHub Pages 的最小可用部落格範例（含文章列表、Tags、RSS、Sitemap）。

## 已完成

- Astro 架構（`src/content/blog/*.md` 發文）
- 首頁文章列表（`/`）
- 分類 / tag 頁（`/tags/<tag>/`）
- 單篇文章頁（`/posts/<slug>/`）
- RSS（`/rss.xml`）
- Sitemap（`/sitemap-index.xml`）
- GitHub Actions 自動部署到 Pages

## 本機開發

```bash
npm install
npm run dev
```

## 發文方式

在 `src/content/blog/` 新增 markdown 檔案：

```md
---
title: "你的文章標題"
description: "一句摘要"
pubDate: 2026-04-14
---

內文...
```

push 到 `main` 後會自動部署。
