---
title: Chrome拡張機能のフォルダはどこに保存されているか
create: "2024-02-08"
update: "2024-02-08"
tags: ["chrome extension"]
description: 
published: true
---

## はじめに

ChromeウェブストアからChrome拡張機能を導入した際の保存フォルダがどこにあるのかを、毎回調べている様な気がしたので、メモすることにしました。

なお、Chrome拡張機能それぞにれ付与されているIDは、[chrome://extensions](chrome://extensions)中の拡張機能一覧で知ることができます。

![image](https://i.gyazo.com/febed5801285983d50af1cfebbd409cd.png)

※スクショ中の拡張機能はChromeウェブストアに公開していない野良拡張機能です。

### Windows OS の場合

hoge はユーザ名に、fizzbuzzの箇所はChrome拡張機能IDに置き換えてください。

```plaintext
C:\Users\hoge\AppData\Local\Google\Chrome\User Data\Default\Extensions\fizzbuzz
```

### Mac OS の場合

```plaintext
/Users/hoge/Library/Application Support/Google/Chrome/Default/Extensions/fizzbuzz
```
