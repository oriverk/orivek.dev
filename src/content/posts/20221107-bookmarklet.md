---
title: js ブックマークレットのメモ書き
create: "2022-11-07"
tags: [memo, javascript, chrome]
description: "js ブックマークレットのメモ"
published: true
---

## はじめに

この投稿は自分用のメモ書きなので、参考を利用することで説明をできるだけ省き、保存しておきたいコードなどをメモ書きすることに徹する。

## ブックマークレットとは

> ブックマークレット (Bookmarklet) とは、ユーザーがウェブブラウザのブックマークなどから起動し、なんらかの処理を行う簡易的なプログラムのことである。携帯電話のウェブブラウザで足りない機能を補ったり、ウェブアプリケーションの処理を起動するために使われることが多い。
> > Wikipedia『ブックマークレット』より

## 作成方法

作り方を忘れたときは大体 [Bookmarkletを作ろう(準備編） - Qiita](https://qiita.com/kanaxx/items/63debe502aacd73c3cb8) を見ている。([魚拓](https://megalodon.jp/2022-1107-1612-25/https://qiita.com:443/kanaxx/items/63debe502aacd73c3cb8))

## 本題：普段使っているもの

### markdown 用のリンクを取得

ブログを書くときにいつも使う。

```js title=pre-minified.js
// copy text to clipboard: e.g. [Google](https://www.google.com/)

'use strict'; (
  function () {
    const a = `[${document.title.trim()}](${location.href})`;
    navigator.clipboard.writeText(a)
      .then(
        () => { alert(`Successfully copied ${a}`) },
        () => { alert("Unfortunately failed to copy..") }
      )
  }
)();
```

```js title=minified.js
'use strict'; (function(){const a=`[${document.title.trim()}](${location.href})`;navigator.clipboard.writeText(a).then(()=>{alert(`Successfully copied ${a}`)},()=>{alert("Unfortunately failed to copy..")})})();
```

### はみ出した Element を見つけるやつ

- [横スクロールバーの発生源を素早く特定する方法と最新の防止策 | TAKLOG](https://www.tak-dcxi.com/article/methods-to-quickly-identify-the-source-of-horizontal-scrolling-and-the-latest-prevention-measures)
- [CODEPEN | tack-dcxi 横スクロールの原因を調べる](https://codepen.io/tak-dcxi/pen/ZEJJWxE)

こちらのコードをそのまま利用すると `Uncaught ReferenceError: $$ is not defined` となるので、一部弄って

```js title=pre-minified.js
(
  function () {
    const a = document.documentElement.clientWidth;
    Array.from(document.getElementsByTagName("*")).forEach(function (b) {
      b.style.outline = "1px solid tomato";
      a < b.clientWidth && console.log(b)
    })
  }
)();
```

```js title=minified.js
'use strict';(function(){const b=document.documentElement.clientWidth;Array.from(document.getElementsByTagName("*")).forEach(function(a){a.style.outline="1px solid tomato";b<a.clientWidth&&console.log(a)})})();
```

こうなる。

![image](https://i.imgur.com/bE9Kd2W.png)

## 参照

- [Bookmarkletを作ろう(準備編） - Qiita](https://qiita.com/kanaxx/items/63debe502aacd73c3cb8)
- [Closure Compiler Service](https://closure-compiler.appspot.com/home)
- [Clipboard.writeText() - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Clipboard/writeText)
