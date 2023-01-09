import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: `wwww-antonyholmes-gatsby`,
    siteUrl: `https://www.antonyholmes.dev`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ["G-X21MCY4FP3"],
      },
    },
    "gatsby-plugin-image",
    `gatsby-plugin-remove-generator`,
    `gatsby-plugin-robots-txt`,
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.svg",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        "excerpt_separator": `<!-- end -->`,
        plugins: [
          'gatsby-remark-reading-time',
          {
            resolve: `gatsby-remark-prismjs`,
            options: {},
          },
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./_content/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "./_content/posts",
      },
      __key: "posts",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "reviews",
        path: "./_content/reviews",
      },
      __key: "reviews",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "people",
        path: "./_content/people",
      },
      __key: "people",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "publications",
        path: "./_content/publications",
      },
      __key: "publications",
    },
    "gatsby-plugin-catch-links",
    "gatsby-transformer-json",
    "gatsby-plugin-sass",
    "gatsby-plugin-postcss",
  ],
}

export default config
