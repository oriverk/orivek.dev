export interface CardLinkEmbedType {
  title: string;
  description: string;
  image: string;
}

// ref: [oEmbed API | Docs | Twitter Developer Platform](https://developer.twitter.com/en/docs/twitter-for-websites/oembed-api#item1)
export interface TweetOptionType {
  // When set to true, links in a Tweet are not expanded to photo, video, or link previews.
  hide_media: boolean;
  // When set to true, a collapsed version of the previous Tweet in a conversation thread will not be displayed when the requested Tweet is in reply to another Tweet.
  hide_thread: boolean;
  // When set to true, the <script> responsible for loading widgets.js will not be returned.
  omit_script: boolean;
  // Specifies whether the embedded Tweet should be floated left, right, or center in the page relative to the parent element.
  align: "left" | "right" | "center" | "none";
  // Request returned HTML and a rendered Tweet in the specified
  // [Supported languages and browsers | Docs | Twitter Developer Platform](https://developer.twitter.com/en/docs/twitter-for-websites/supported-languages)
  lang: "en" | "ja";
  // When set to dark, the Tweet is displayed with light text over a dark background.
  theme: "dark" | "light";
  // When set to true, the Tweet and its embedded page on your site are not used for purposes that include personalized suggestions and personalized ads.
  dnt: boolean;
}

export interface TweetResponseType {
  url: string;
  author_name: string;
  author_url: string;
  html: string;
  width: number;
  height: number | null;
  type: string;
  cache_age: string;
  provider_name: string;
  provider_url: string;
  version: string;
}
