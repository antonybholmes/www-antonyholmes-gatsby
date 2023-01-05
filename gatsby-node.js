const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const postTemplate = path.resolve(`./src/templates/post.tsx`)

exports.createPages = async function ({ actions, graphql }) {
  const { createPage } = actions

  const { data } = await graphql(`
    query {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/posts/" } }
      ) {
        nodes {
          id
          fields {
            date
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  `)
  
  let posts = data.posts.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      createPage({
        path: `/blog/${post.fields.slug}`,
        component: postTemplate,
        context: {
          id: post.id,
          title: post.frontmatter.title,
          tab: "Blog",
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

 

  if (node.internal.type === `MarkdownRemark`) {
    
    const parts = node.fileAbsolutePath.split('/')

    let slug = parts[parts.length - 1].replace('.md', '') //createFilePath({ node, getNode })
    const match = slug.match(/(\d{4})-(\d{2})-(\d{2})/)
    const date = match ? match.slice(1, 4).join("-") : "2022-01-01"

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })

    createNodeField({
      name: `date`,
      node,
      value: date,
    })
  }
}