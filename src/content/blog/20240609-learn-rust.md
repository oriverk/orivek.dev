---
create: '2024-06-09'
update: '2024-06-09'
title: 'Rust をやってみる'
tags: [rust]
published: true
noindex: true
---

同居人から風邪を貰い、熱や咳に鼻水と症状が続き、普段通りの生活が阻害されていたので、Rust を触ってみることにした。以前に [RustではじめるOpenGL | インプレス NextPublishing](https://nextpublishing.jp/book/11379.html) という本を読むにあたって、一度だけ Hello world までの初歩的なことはしていた。

## はじめに

Rust を触ったら、案の定大変だった・分からなさ過ぎた。でも楽しかった。Rust を使って何かサービスを作る予定は全くないが、過去に勝った技術本を写経したり、画像処理をやるなどして Rust で遊びたい。　※メモ書きなので**他者が読んでも得るものはありません**。noindex を設定してすらいます。

## Rust とは

安全性と高パフォーマンスを両立させたシステムプログラミング言語。メモリ安全性を保証し、並行処理も安全に行えるため、信頼性の高いソフトウェア開発に適しています。近年、Next.js や Biome といったフロントエンドの FW や開発ツールが Rust を採用し始めている。

https://github.com/biomejs/biome

Web ブラウザ上で高速実行が可能で複雑な計算やゲーム開発・マルチメディア処理に適しているとされるバイナリ形式の命令セットで WebAssembly (Wasm) というものがあるが、これを作成するのに Rust などが用いられている。実際に AmazonPrimeVideo の動画再生のパフォーマンス改善に Rust コードから生成した Wasm が利用されたというニュースが2022年にあった。

https://www.publickey1.jp/blog/22/amazon_prime_videowebassemblywasm_vm.html

## 準備

Ubuntu on WSL2 で行った。他の言語の環境構築と比較して、非常に簡単だった気がした。

```shell title=""
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
echo 'export PATH=$HOME/.cargo/bin:$PATH' | tee -a .bashrc
```

Rust 用の VSCode 拡張機能として、下4つを入れた。Rust を軽く触るだけなら、最上段の1つだけで良いとおもった。

- VSCode Extensions
  - [rust-analyzer - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
  - [Rust Doc Viewer - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=JScearcy.rust-doc-viewer)
  - [crates - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=serayuzgur.crates)
  - [Even Better TOML - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml)

## 参照

- [The Rust Programming Language 日本語版 - The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/)
- [Introduction - Rust By Example 日本語版](https://doc.rust-jp.rs/rust-by-example-ja/index.html)
- [Rustのドキュメンテーションコメントの書き方](https://zenn.dev/masaki_wk/articles/20230715-rust-doc-comment#%E3%83%89%E3%82%AD%E3%83%A5%E3%83%A1%E3%83%B3%E3%83%86%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%B3%E3%83%A1%E3%83%B3%E3%83%88%E3%81%AE%E7%A8%AE%E5%88%A5)
- [RustではじめるOpenGL | インプレス NextPublishing](https://nextpublishing.jp/book/11379.html)

## Playground

Rust Ja Docs をよみつつ、エディターで試せるコードは試すようにした。『JavaScript におけるあれか、Ruby におけるあれか、C++で似たやつあったな・・』と思いながら触っていったが、よく分からない箇所はまあまああった。

### よく分からなかった箇所・理解が進んでいない箇所

シングルクォテーション `'`1つを使った用法もあって、分からない箇所も忘れていそう

- 配列とベクタとスライス
  - 何となく分かった気もするが、まだ適切に使い分ける事は大変そう
- クロージャ
  - わからない
- トレイと
  - わからない
- `&'a`, `<'a>`
  - 分からない上に、覚えづらいし、検索し辛い・・

分かった気になっただけの箇所もあると思われるし、分かってない箇所を覚えてない可能性もあるので、プログラムを書いてはドキュメントに戻り・・・を繰り返すしかなさそう。

### Codes

#### FizzBuzz

`String` なのか `&str` といった箇所はまだ微妙。`1..=100` という箇所は Ruby と似ているが少し違うので混同しそうだと思った。型を書くことについては TypeScript で割と慣れている気がした。

```rust:main.rs
fn main() {
    for num in 1..=100 {
        println!("{}", fizzbuzz(num));
    }
}

fn get_fizz_buzz_if(num: u32) -> String {
    if num % 2 == 0 && num % 3 == 0 {
        "FizzBuzz".to_string()
    } else if num % 2 == 0 {
        "Fizz".to_string()
    } else {
        "Buzz".to_string()
    }
}

fn get_fizz_buzz_match(num: u32) -> String {
    match (num % 3, num % 5) {
        (0, 0) => "FizzBuzz".to_string(),
        (0, _) => "Fizz".to_string(),
        (_, 0) => "Buzz".to_string(),
        _ => num.to_string(),
    }
}
```

#### 統計っぽいこと

Rust にも `as` があるんだと思った。JSDoc の様なドキュメンテーションコメントの書き方を知った。この Zenn の [Rustのドキュメンテーションコメントの書き方](https://zenn.dev/masaki_wk/articles/20230715-rust-doc-comment#%E3%83%89%E3%82%AD%E3%83%A5%E3%83%A1%E3%83%B3%E3%83%86%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%B3%E3%83%A1%E3%83%B3%E3%83%88%E3%81%AE%E7%A8%AE%E5%88%A5) が詳しかった。

```rust:main.rs
use std::collections::HashMap;

fn main() {
    let numbers: Vec<i32> = vec![1, 2, 2, 3, 4, 5, 5, 5, 6, 7];

    let largest: i32 = calculate_largest(&numbers);
    let mean: f64 = calculate_mean(&numbers);
    let median: f64 = calculate_median(&numbers);
    let mode: i32 = calculate_mode(&numbers);

    println!("Largest: {}", largest);
    println!("Mean: {}", mean);
    println!("Median: {}", median);
    println!("Mode: {}", mode);
}

fn calculate_largest(numbers: &Vec<i32>) -> i32 {
    let mut largest = numbers[0];

    for &item in numbers.iter() {
        if item > largest {
            largest = item
        }
    }

    largest
}

/// 平均値
fn calculate_mean(numbers: &Vec<i32>) -> f64 {
    let sum: i32 = numbers.iter().sum();
    let count = numbers.len();
    sum as f64 / count as f64
}

fn calculate_median(numbers: &Vec<i32>) -> f64 {
    //! 中央値
    let mut sorted_numbers: Vec<i32> = numbers.clone();
    sorted_numbers.sort();

    let count = sorted_numbers.len();
    if count % 2 == 0 {
        (sorted_numbers[count / 2 - 1] + sorted_numbers[count / 2]) as f64 / 2.0
    } else {
        sorted_numbers[count / 2] as f64
    }
}

fn calculate_mode(numbers: &Vec<i32>) -> i32 {
    //! 最頻値
    let mut occurrences = HashMap::new();

    for &value in numbers {
        *occurrences.entry(value).or_insert(0) += 1;
    }

    occurrences
        .into_iter()
        .max_by_key(|&(_, count)| count)
        .map(|(value, _)| value)
        .unwrap()
}
```
