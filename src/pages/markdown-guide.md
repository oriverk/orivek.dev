---
layout: '../layouts/MarkdownLayout.astro'
title: Markdown記法一覧
create: '2023-04-12'
---

可能な限り GitHub Flavored Markdown に準拠したい。

```diff
const hello = null;
- console.log("hoge")
+ console.log("hello")
console.log("normal")
```

```js index.js
function hello (){
  console.log('hello')
}
```

## 見出し heading

```md
# 見出し h1

## 見出し h2

### 見出し h3

#### 見出し h4
```

## リスト

```md
- Hello!
- Hola!
  - Bonjour!
  * Hi!
```

- Hello
- Hola
  - Bonjour
  - Hi

### 番号付きリスト

```md
1. First
2. Second
```

1. First
2. Second

## テキストリンク

```md
[アンカーテキスト](リンクのURL)
```

[oriverk.dev](https://oriverk.dev)

### bare link

in MDX v2, bare link and link with `<>` is completely deprecated to avoid `<>` as jsx component.

```plaintext
https://ixanary.com
```

## 画像

```md
![altテキスト](https://画像のURL "figcaption")
```

### 画像にリンクを貼る

```md
[![altテキスト](画像のURL)](リンクのURL)
```

## テーブル

| Head | Head | Head |
| :--- | :--: | ---: |
| Text | Text | Text |
| left | center | right |

## 引用

> quote
> > quote

## 区切り線

---

## インラインスタイル

italic _italic_

bold **太字**

~~打ち消し線~~

インラインで `code` を挿入する。
