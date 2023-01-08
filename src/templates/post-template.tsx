import { graphql } from "gatsby"
import React from "react"
import PostPage from "../components/pages/post-page"
import IDataPageProps from "../interfaces/data-page-props"
import BaseLayout from "../layouts/base-layout"
import Seo from "../layouts/seo"

export default function Page({ pageContext, data, location }: IDataPageProps) {
  const { imageMap, avatarMap } = pageContext

  //const tab = pageContext.tab
  const post = data.post
  //const imageMap = getImageMap(data.postImages)
  //const avatarMap = getImageMap(data.peopleImages)

  return (
    <BaseLayout
      title={post.frontmatter.title}
      tab="Blog"
      headerMode="dark"
      location={location}
    >
      <PostPage
        post={post}
        image={data.postImage}
        imageMap={imageMap}
        avatarMap={avatarMap}
        morePosts={pageContext.morePosts}
      />
    </BaseLayout>
  )
}

export function Head({ pageContext }: IDataPageProps) {
  return <Seo title={pageContext.title} />
}

export const pageQuery = graphql`
  query PostBySlug($id: String!, $hero: String!) {
    post: markdownRemark(id: { eq: $id }) {
      id
      excerpt(format: HTML)
      html
      fields {
        slug
        date
      }
      frontmatter {
        title
        description
        authors
        section
        tags
        hero
      }
    }

    postImage: file(
      name: { eq: $hero }
      absolutePath: { regex: "/images/posts/" }
    ) {
      absolutePath
      name
      childImageSharp {
        gatsbyImageData(
          width: 1800
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
          transformOptions: { fit: COVER }
        )
      }
    }
  }
`
