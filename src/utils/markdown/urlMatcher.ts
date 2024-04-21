// ref: [zenn-editor/packages/zenn-markdown-html/src/utils/url-matcher.ts at canary · zenn-dev/zenn-editor](https://github.com/zenn-dev/zenn-editor/blob/canary/packages/zenn-markdown-html/src/utils/url-matcher.ts)

/** URL文字列か判定する */
export function isValidHttpUrl(str: string) {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

export function isTweetUrl(url: string): boolean {
  return /^https:\/\/(twitter|x)\.com\/[a-zA-Z0-9_-]+\/status\/[a-zA-Z0-9?=&\-_]+$/.test(
    url,
  );
}
