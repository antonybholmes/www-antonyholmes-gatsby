module.exports = {
  siteMetadata: {
    title: `wwww-antonyholmes-gatsby`,
    siteUrl: `https://www.antonyholmes.com`,
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
        excerpt_separator: `<!-- end -->`,
        plugins: [
          "gatsby-remark-reading-time",
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes
                .map(node => {
                  const match = node.fields.slug.match(
                    /(\d{4})-(\d{2})-(\d{2})/
                  )
                  const date = match
                    ? match.slice(1, 4).join("-")
                    : "2022-01-01"
                  return {
                    ...node,
                    fields: {
                      ...node.fields,
                      date,
                    },
                  }
                })
                .sort(
                  (a, b) => new Date(b.fields.date) - new Date(a.fields.date)
                )
                .map(node => {
                  return Object.assign({}, node.frontmatter, {
                    description: node.excerpt,
                    date: node.fields.date,
                    url:
                      site.siteMetadata.siteUrl + "/blog/" + node.fields.slug,
                    guid:
                      site.siteMetadata.siteUrl + "/blog/" + node.fields.slug,
                    //custom_elements: [{ "content:encoded": node.html }],
                  })
                })
            },
            query: `
              {
                allMarkdownRemark(
                  filter: { fileAbsolutePath: { regex: "/posts/" } }
                ) {
                    nodes {
                      excerpt
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                      }
                    }
                }
              }
            `,
            output: "/rss.xml",
            title: `Antony Holmes RSS Feed`,
          },
        ],
      },
    },
  ],
}
