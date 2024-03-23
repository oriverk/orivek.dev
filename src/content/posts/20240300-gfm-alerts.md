---
title: GFM Alerts記法のスニペットを設定する
create: "2024-03-22"
update: "2024-03-22"
tags: [vscode, markdown]
description: "GitHubでアラート記法を使えるようになったので、VSCodeでスニペットを設定しました"
published: true
---

GitHub で `> [!NOTE]` といったアラート記法を使えるようになったので、VSCode でスニペットを設定しました。

## アラートについて

[New Markdown extension: Alerts provide distinctive styling for significant content - The GitHub Blog](https://github.blog/changelog/2023-12-14-new-markdown-extension-alerts-provide-distinctive-styling-for-significant-content/)

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

```md
> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.
```

## スニペット

```json title="/snippets/markdown.json"
{
  "GFM Alerts NOTE": {
    "prefix": [
      "alerts",
      "note"
    ],
    "body": [
      "> [!NOTE]",
      "> $0"
    ],
    "description": "Useful information that users should know, even when skimming content."
  },
  "GFM Alerts Tip": {
    "prefix": [
      "alerts",
      "tip"
    ],
    "body": [
      "> [!TIP]",
      "> $0"
    ],
    "description": "Helpful advice for doing things better or more easily."
  },
  "GFM Alerts IMPORTANT": {
    "prefix": [
      "alerts",
      "important"
    ],
    "body": [
      "> [!IMPORTANT]",
      "> $0"
    ],
    "description": "Key information users need to know to achieve their goal."
  },
  "GFM Alerts WARNING": {
    "prefix": [
      "alerts",
      "warning"
    ],
    "body": [
      "> [!WARNING]",
      "> $0"
    ],
    "description": "Urgent info that needs immediate user attention to avoid problems."
  },
  "GFM Alerts CAUTION": {
    "prefix": [
      "alerts",
      "caution"
    ],
    "body": [
      "> [!CAUTION]",
      "> $0"
    ],
    "description": "Advises about risks or negative outcomes of certain actions."
  }
}
```

## remark plugin

markdown を処理する際の remark plugin として、`remark-github-alerts` を利用した。

[hyoban/remark-github-alerts: Support GitHub-style alerts for remark](https://github.com/hyoban/remark-github-alerts)
