---
title: Chrome拡張機能のフォルダはどこに保存されているか
create: "2024-02-08"
update: "2024-02-08"
tags: ["chrome extension"]
published: true
---

## はじめに

Chrome ウェブストアから Chrome 拡張機能を導入した際の保存フォルダがどこにあるのかを、毎回調べている様な気がしたので、メモすることにしました。

なお、Chrome 拡張機能それぞに付与されている ID は、[chrome://extensions](chrome://extensions) 中の拡張機能一覧で知ることができます。

![image](https://i.gyazo.com/febed5801285983d50af1cfebbd409cd.png)

※スクショ中の拡張機能は Chrome ウェブストアに公開していない野良拡張機能です。

### Windows OS の場合

hoge はユーザー名に、fizzbuzz の箇所は Chrome 拡張機能 ID に置き換えてください。

```plaintext
C:\Users\hoge\AppData\Local\Google\Chrome\User Data\Default\Extensions\fizzbuzz
```

### Mac OS の場合

```plaintext
/Users/hoge/Library/Application Support/Google/Chrome/Default/Extensions/fizzbuzz
```
