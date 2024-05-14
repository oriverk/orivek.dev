export default {
  title: "Kawano Yudai",
  description: "My site description",
  siteRoot: import.meta.env.PROD ? "https://oriverk.dev" : "http://localhost:3000",
  github: 'oriverk',
  docsGitHubRepositoryName: 'oriverk-docs',
  docsGitHubRepositoryExpression: "HEAD:cv/index.md",
  zenn: 'oriverk',
  x: 'not_you_die',
  algolia: {
    appId: "WOHC62BVSP",
    apiKey: "bae638093bc0fe3156732e769d096c41",
    index: "rod_oriverkdev"
  }
}
