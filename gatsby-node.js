const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const postTemplate = path.resolve(`./src/templates/post-template.tsx`)
const reviewTemplate = path.resolve(`./src/templates/review-template.tsx`)
const postsTemplate = path.resolve(`./src/templates/posts-template.tsx`)
const personTemplate = path.resolve(`./src/templates/person-template.tsx`)
const tagTemplate = path.resolve(`./src/templates/tag-template.tsx`)

const RECORDS_PER_PAGE = 12

function getTagSlug(tag) {
  return tag.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")
}

function getCategories(post) {
  const ret = []

  post.frontmatter.categories.forEach(category => {
    
    let path = category.split('/').concat(['All'])

    let pathMap = {}
    ret.push(pathMap)

    pathMap[path[0]] = {}
    pathMap[path[0]]['All'] = {}

    path.forEach(p => {
      if (!(p in pathMap)) {
        pathMap[p] = {}
      }

      pathMap = pathMap[p]
    })
  })

  return ret
}

function subsetImageMaps(posts, imageMap, avatarMap, pim, aim) {
  posts.forEach(p => {
    pim[p.frontmatter.hero] = imageMap[p.frontmatter.hero]

    p.frontmatter.authors.forEach(author => {
      aim[getTagSlug(author)] = avatarMap[getTagSlug(author)]
    })
  })
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
          excerpt
          fields {
            date
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            categories
            tags
            authors
            hero
            status
          }
        }
      }

      reviews: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/reviews/" } }
      ) {
        nodes {
          id
          excerpt
          fields {
            date
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            categories
            tags
            authors
            hero
            status
            rating
            pros
            cons
            details
            url
          }
        }
      }

      postImages: allFile(
        filter: { absolutePath: { regex: "/images/posts/" } }
      ) {
        nodes {
          absolutePath
          name
          childImageSharp {
            gatsbyImageData(
              width: 800
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
          excerpt
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

      peopleImages: allFile(
        filter: { absolutePath: { regex: "/images/people/" } }
      ) {
        nodes {
          absolutePath
          name
          childImageSharp {
            gatsbyImageData(
              width: 160
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  `)

  const people = data.people.nodes

  // make a map of images
  const postImageMap = {}
  data.postImages.nodes.forEach(file => {
    postImageMap[file.name] = file
  })

  const avatarMap = {}
  data.peopleImages.nodes.forEach(file => {
    avatarMap[file.name] = file
  })

  // sort by date
  const posts = data.posts.nodes
    .filter(post => {
      return (
        process.env.NODE_ENV === "development" ||
        post.frontmatter.status === "published"
      )
    })
    .sort((a, b) => new Date(b.fields.date) - new Date(a.fields.date))

  const reviews = data.reviews.nodes
    .filter(post => {
      return (
        process.env.NODE_ENV === "development" ||
        post.frontmatter.status === "published"
      )
    })
    .sort((a, b) => new Date(b.fields.date) - new Date(a.fields.date))

  const allPosts = posts
    .concat(reviews)
    .sort((a, b) => new Date(b.fields.date) - new Date(a.fields.date))

  const categoryMap = {}
  const tagMap = {}

  allPosts.forEach(post => {
    const cat = getCategories(post)

    post.frontmatter.categories.forEach(category => {
      let path = category.split("/")

      if (!(path[0] in categoryMap)) {
        categoryMap[path[0]] = {}
      }

      if (!("Default" in categoryMap[path[0]])) {
        categoryMap[path[0]]["Default"] = []
      }

      categoryMap[path[0]]["Default"].push(post)

      if (path.length > 1) {
        if (!(path[1] in categoryMap[path[0]])) {
          categoryMap[path[0]][path[1]] = []
        }

        categoryMap[path[0]][path[1]].push(post)
      }
    })

    post.frontmatter.tags.forEach(tag => {
      if (!(tag in tagMap)) {
        tagMap[tag] = []
      }

      tagMap[tag].push(post)
    })
  })

  const categories = Object.keys(categoryMap).sort()
  const tags = Object.keys(tagMap).sort()

  const pages = Math.floor(
    (allPosts.length + RECORDS_PER_PAGE - 1) / RECORDS_PER_PAGE
  )

  let pim = {}
  let aim = {}
  let pagePosts = []

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  posts.forEach((post, index) => {
    // related

    let morePosts = []

    if (post.frontmatter.tags && post.frontmatter.tags.length > 0) {
      morePosts = tagMap[post.frontmatter.tags[0]]
        .filter(p => p.id !== post.id)
        .slice(0, 3)
    }

    pim = {}
    aim = {}
    // ensure the images from the post appear in the map since
    // more posts might be empty
    subsetImageMaps([post], postImageMap, avatarMap, pim, aim)
    subsetImageMaps(morePosts, postImageMap, avatarMap, pim, aim)

    createPage({
      path: `/blog/${post.fields.slug}`,
      component: postTemplate,
      context: {
        id: post.id,
        title: post.frontmatter.title,
        tab: "Blog",
        hero: post.frontmatter.hero,
        morePosts,
        imageMap: pim,
        avatarMap: aim,
      },
    })
  })

  // Make separate pages for reviews
  reviews.forEach((post, index) => {
    let morePosts = []

    if (post.frontmatter.tags && post.frontmatter.tags.length > 0) {
      morePosts = tagMap[post.frontmatter.tags[0]]
        .filter(p => p.id !== post.id)
        .slice(0, 3)
    }

    pim = {}
    aim = {}
    // ensure the images from the post appear in the map since
    // more posts might be empty
    subsetImageMaps([post], postImageMap, avatarMap, pim, aim)
    subsetImageMaps(morePosts, postImageMap, avatarMap, pim, aim)

    createPage({
      path: `/blog/${post.fields.slug}`,
      component: reviewTemplate,
      context: {
        id: post.id,
        title: post.frontmatter.title,
        tab: "Blog",
        hero: post.frontmatter.hero,
        morePosts,
        imageMap: pim,
        avatarMap: aim,
      },
    })
  })

  //
  // Create blocks of pages
  //

  // special case for root blog page where we send
  // 10 posts so that latest posts works correctly

  pagePosts = allPosts.slice(0, RECORDS_PER_PAGE)

  pim = {}
  aim = {}
  subsetImageMaps(pagePosts, postImageMap, avatarMap, pim, aim)

  createPage({
    path: "/blog",
    component: postsTemplate,
    context: {
      title: "Blog",
      page: 0,
      pages,
      posts: pagePosts,
      imageMap: pim,
      avatarMap: aim,
    },
  })

  for (let page = 0; page < pages; ++page) {
    const s = page * RECORDS_PER_PAGE
    pagePosts = allPosts.slice(s, s + RECORDS_PER_PAGE)

    pim = {}
    aim = {}
    subsetImageMaps(pagePosts, postImageMap, avatarMap, pim, aim)

    const path = `/blog/page/${page + 1}`

    createPage({
      path: path,
      component: postsTemplate,
      context: {
        title: "Blog",
        page,
        pages,
        posts: pagePosts,
        imageMap: pim,
        avatarMap: aim,
      },
    })
  }

  //
  // Split posts into categories
  //

  categories.forEach(category => {
    let catPosts = categoryMap[category]["Default"]

    const slug = getTagSlug(category)

    if (catPosts.length > 0) {
      let pages = Math.floor(
        (catPosts.length + RECORDS_PER_PAGE - 1) / RECORDS_PER_PAGE
      )

      pagePosts = catPosts.slice(0, RECORDS_PER_PAGE)
      pim = {}
      aim = {}
      subsetImageMaps(pagePosts, postImageMap, avatarMap, pim, aim)

      createPage({
        path: `/blog/category/${slug}`,
        component: postsTemplate,
        context: {
          title: category,
          superTitle: "Category",
          showTitle: true,
          page: 0,
          pages,
          posts: pagePosts,
          imageMap: pim,
          avatarMap: aim,
        },
      })

      for (let page = 0; page < pages; ++page) {
        pagePosts = catPosts.slice(page, page + RECORDS_PER_PAGE)

        pim = {}
        aim = {}
        subsetImageMaps(pagePosts, postImageMap, avatarMap, pim, aim)

        const path = `/blog/category/${slug}/page/${page + 1}`

        createPage({
          path: path,
          component: postsTemplate,
          context: {
            title: category,
            superTitle: "Category",
            showTitle: true,
            page,
            pages,
            posts: pagePosts,
            imageMap: pim,
            avatarMap: aim,
          },
        })
      }
    }

    // Now detail with sub sections

    Object.keys(categoryMap[category])
      .filter(x => x !== "Default")
      .sort()
      .forEach(section => {
        catPosts = categoryMap[category][section]

        if (catPosts.length > 0) {
          const slug2 = getTagSlug(section)

          let pages = Math.floor(
            (catPosts.length + RECORDS_PER_PAGE - 1) / RECORDS_PER_PAGE
          )

          pagePosts = catPosts.slice(0, RECORDS_PER_PAGE)
          pim = {}
          aim = {}
          subsetImageMaps(pagePosts, postImageMap, avatarMap, pim, aim)

          createPage({
            path: `/blog/category/${slug}/section/${slug2}`,
            component: postsTemplate,
            context: {
              title: section,
              superTitle: "Section",
              showTitle: true,
              page: 0,
              pages,
              posts: pagePosts,
              imageMap: pim,
              avatarMap: aim,
            },
          })

          for (let page = 0; page < pages; ++page) {
            pagePosts = catPosts.slice(page, page + RECORDS_PER_PAGE)

            pim = {}
            aim = {}
            subsetImageMaps(pagePosts, postImageMap, avatarMap, pim, aim)

            const path = `/blog/category/${slug}/section/${slug2}/page/${page + 1}`

            createPage({
              path: path,
              component: postsTemplate,
              context: {
                title: section,
                superTitle: "Section",
                showTitle: true,
                page,
                pages,
                posts: pagePosts,
                imageMap: pim,
                avatarMap: aim,
              },
            })
          }
        }
      })
  })

  createPage({
    path: `/blog/category`,
    component: tagTemplate,
    context: {
      title: "Category",
      url: "category",
      tags: categories,
    },
  })

  //
  // Split posts into tags
  //

  for (const [tag, tagPosts] of Object.entries(tagMap)) {
    if (tagPosts.length == 0) {
      continue
    }

    const slug = getTagSlug(tag)

    let pages = Math.floor(
      (tagPosts.length + RECORDS_PER_PAGE - 1) / RECORDS_PER_PAGE
    )

    pagePosts = tagPosts.slice(0, RECORDS_PER_PAGE)

    pim = {}
    aim = {}
    subsetImageMaps(pagePosts, postImageMap, avatarMap, pim, aim)

    createPage({
      path: `/blog/tag/${slug}`,
      component: postsTemplate,
      context: {
        title: tag,
        superTitle: "Tag",
        showTitle: true,
        page: 0,
        pages,
        posts: pagePosts,
        imageMap: pim,
        avatarMap: aim,
      },
    })

    for (let page = 0; page < pages; ++page) {
      pagePosts = tagPosts.slice(page, page + RECORDS_PER_PAGE)

      pim = {}
      aim = {}
      subsetImageMaps(pagePosts, postImageMap, avatarMap, pim, aim)

      const path = `/blog/tag/${slug}/page/${page + 1}`

      createPage({
        path: path,
        component: postsTemplate,
        context: {
          title: tag,
          superTitle: "Tag",
          showTitle: true,
          page,
          pages,
          posts: pagePosts,
          imageMap: pim,
          avatarMap: aim,
        },
      })
    }
  }

  createPage({
    path: `/blog/tag`,
    component: tagTemplate,
    context: {
      title: "Tag",
      url: "tag",
      tags,
    },
  })

  //
  // Make a page for authors
  //

  people.forEach(person => {
    const slug = getTagSlug(person.frontmatter.name)

    const personPosts = posts.filter(post =>
      post.frontmatter.authors.includes(person.frontmatter.name)
    )

    let pages = Math.floor(
      (personPosts.length + RECORDS_PER_PAGE - 1) / RECORDS_PER_PAGE
    )

    pagePosts = personPosts.slice(0, RECORDS_PER_PAGE)
    pim = {}
    aim = {}
    subsetImageMaps(pagePosts, postImageMap, avatarMap, pim, aim)

    createPage({
      path: `/people/${slug}`,
      component: personTemplate,
      context: {
        title: person.frontmatter.name,
        page: 0,
        pages,
        posts: pagePosts,
        imageMap: pim,
        avatarMap: aim,
      },
    })

    for (let page = 0; page < pages; ++page) {
      pagePosts = personPosts.slice(page, page + RECORDS_PER_PAGE)
      pim = {}
      aim = {}
      subsetImageMaps(pagePosts, postImageMap, avatarMap, pim, aim)

      const path = `/people/${slug}/page/${page + 1}`

      createPage({
        path: path,
        component: personTemplate,
        context: {
          title: person.frontmatter.name,
          page,
          pages,
          posts: pagePosts,
          imageMap: pim,
          avatarMap: aim,
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
