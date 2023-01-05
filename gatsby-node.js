const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const postTemplate = path.resolve(`./src/templates/post-template.tsx`)
const postsTemplate = path.resolve(`./src/templates/posts-template.tsx`)
const personTemplate = path.resolve(`./src/templates/person-template.tsx`)

const ROOT_RECORDS_PER_PAGE = 10
const RECORDS_PER_PAGE = 9

function getTagSlug(tag) {
  return tag.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")
}

exports.createPages = async function ({ actions, graphql }) {
  const { createPage } = actions

  const { data } = await graphql(`
    query {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/posts/" } }
      ) {
        nodes {
          id
          excerpt(format: HTML)
          fields {
            date
            slug
          }
          frontmatter {
            title
            section
            tags
            authors
            hero
          }
        }
      }

      postImages: allFile(filter: { absolutePath: { regex: "/images/posts/" } }) {
        nodes {
          absolutePath
          name
          childImageSharp {
            gatsbyImageData(
              width: 2048
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }

      people: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/people/" } }
      ) {
        nodes {
          id
          excerpt(format: HTML)
          fields {
            date
            slug
          }
          frontmatter {
            name
            title
            email
          }
        }
      }
    }
  `)

  const people = data.people.nodes

  // make a map of names

  const postImageMap = {}

  data.postImages.nodes.forEach(file => {
    postImageMap[file.name] = file
  })

  // sort by date
  const posts = data.posts.nodes.sort(
    (a, b) => new Date(b.fields.date) - new Date(a.fields.date)
  )

  const pages = Math.floor(
    (posts.length + RECORDS_PER_PAGE - 1) / RECORDS_PER_PAGE
  )

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
          hero: post.frontmatter.hero,
        },
      })
    })
  }

  //
  // Create blocks of pages
  //

  // special case for root blog page where we send
  // 10 posts so that latest posts works correctly
  createPage({
    path: "/blog",
    component: postsTemplate,
    context: {
      title: "Blog",
      page: 0,
      pages,
      posts: posts.slice(0, ROOT_RECORDS_PER_PAGE),
    },
  })

  for (let page = 0; page < pages; ++page) {
    const s = page * RECORDS_PER_PAGE
    const pagePosts = posts.slice(s, s + RECORDS_PER_PAGE)

    const path = `/blog/page/${page + 1}`

    createPage({
      path: path,
      component: postsTemplate,
      context: {
        title: "Blog",
        page,
        pages,
        posts: pagePosts,
      },
    })
  }

  //
  // Split posts into sections
  //

  const sectionMap = {}

  posts.forEach(post => {
    if (!(post.frontmatter.section in sectionMap)) {
      sectionMap[post.frontmatter.section] = []
    }

    sectionMap[post.frontmatter.section].push(post)
  })

  for (const [section, sectionPosts] of Object.entries(sectionMap)) {
    if (sectionPosts.length == 0) {
      continue
    }

    const slug = getTagSlug(section)

    let pages = Math.floor(
      (sectionPosts.length + RECORDS_PER_PAGE - 1) / RECORDS_PER_PAGE
    )

    createPage({
      path: `/blog/section/${slug}`,
      component: postsTemplate,
      context: {
        title: section,
        superTitle: "Section",
        page: 0,
        pages,
        posts: sectionPosts.slice(0, ROOT_RECORDS_PER_PAGE),
      },
    })

    for (let page = 0; page < pages; ++page) {
      const pagePosts = sectionPosts.slice(page, page + RECORDS_PER_PAGE)

      const path = `/blog/section/${slug}/page/${page + 1}`

      createPage({
        path: path,
        component: postsTemplate,
        context: {
          title: section,
          superTitle: "Section",
          page,
          pages,
          posts: pagePosts,
        },
      })
    }
  }

  //
  // Split posts into tags
  //

  const tagMap = {}

  posts.forEach(post => {
    post.frontmatter.tags.forEach(tag => {
      if (!(tag in tagMap)) {
        tagMap[tag] = []
      }

      tagMap[tag].push(post)
    })
  })

  for (const [tag, tagPosts] of Object.entries(tagMap)) {
    if (tagPosts.length == 0) {
      continue
    }

    const slug = getTagSlug(tag)

    let pages = Math.floor(
      (tagPosts.length + RECORDS_PER_PAGE - 1) / RECORDS_PER_PAGE
    )

    createPage({
      path: `/blog/tag/${slug}`,
      component: postsTemplate,
      context: {
        title: tag,
        superTitle: "Tag",
        page: 0,
        pages,
        posts: tagPosts.slice(0, ROOT_RECORDS_PER_PAGE),
      },
    })

    for (let page = 0; page < pages; ++page) {
      const pagePosts = tagPosts.slice(page, page + RECORDS_PER_PAGE)

      const path = `/blog/tag/${slug}/page/${page + 1}`

      createPage({
        path: path,
        component: postsTemplate,
        context: {
          title: tag,
          superTitle: "Tag",
          page,
          pages,
          posts: pagePosts,
        },
      })
    }
  }

  people.forEach(person => {
    const slug = getTagSlug(person.frontmatter.name)

    const personPosts = posts.filter(post =>
      post.frontmatter.authors.includes(person.frontmatter.name)
    )

    let pages = Math.floor(
      (personPosts.length + RECORDS_PER_PAGE - 1) / RECORDS_PER_PAGE
    )

    createPage({
      path: `/people/${slug}`,
      component: personTemplate,
      context: {
        title: person.frontmatter.name,
        page: 0,
        pages,
        posts: personPosts.slice(0, ROOT_RECORDS_PER_PAGE),
      },
    })

    for (let page = 0; page < pages; ++page) {
      const pagePosts = personPosts.slice(page, page + RECORDS_PER_PAGE)

      const path = `/people/${slug}/page/${page + 1}`

      createPage({
        path: path,
        component: personTemplate,
        context: {
          title: person.frontmatter.name,
          page,
          pages,
          posts: pagePosts,
        },
      })
    }
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    // slug is file name minus any extension
    const parts = node.fileAbsolutePath.split("/")

    let slug = parts[parts.length - 1].replace(".md", "") //createFilePath({ node, getNode })
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
