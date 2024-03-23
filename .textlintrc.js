const IS_LINK_CHECK = !!process.env.LINK_CHECK;

module.exports = {
  plugins: {
    "@textlint/markdown": true,
    latex2e: true,
  },
  filters: {
    allowlist: {
      allow: [
        // markdown link and img alt
        "/\\[.+?\\]/gm",
        // math
        "/\\$\\$?[\\s\\S]*?\\$\\$?/m",
        "/\\$([^$]*)\\$/",
        // url
        "/<https?://.*?>/gm",
        // aws
        "/-?config/gm",
      ],
    },
  },
  rules: {
    "ja-no-inappropriate-words": true,
    "ja-no-abusage": true,

    "preset-ja-spacing": {
      "ja-space-between-half-and-full-width": {
        space: ["alphabets"],
      },
      "ja-space-around-code": { after: true, before: true },
      "ja-space-around-link": { after: true, before: true },
    },
    "preset-ja-technical-writing": {
      "no-doubled-joshi": false,
      "no-exclamation-question-mark": false,
      "ja-no-mixed-period": false,
      "ja-no-weak-phrase": false,
      "max-comma": false,
      "max-kanji-continuous-len": {
        max: 6,
        allow: ["永続性記憶資源", "浮動小数点演算", "自己代入演算子"],
      },
    },
    "period-in-list-item": {
      periodMark: "",
    },
    "@proofdict/proofdict": {
      dictURL: "https://azu.github.io/proof-dictionary/",
    },
    "aws-service-name": true,
    "no-kangxi-radicals": true,
  },
};
