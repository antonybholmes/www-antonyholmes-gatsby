import { graphql } from "gatsby"
import React from "react"
import PostPage from "../components/pages/post-page"
import IDataPageProps from "../interfaces/data-page-props"
import BaseLayout from "../layouts/base-layout"
import Seo from "../layouts/seo"
import { getImageMap } from "../lib/images"

export default function Page({ pageContext, data, location }: IDataPageProps) {
  const tab = pageContext.tab
  const post = data.post
  const imageMap = getImageMap(data.postImages)
  const avatarMap = getImageMap(data.peopleImages)

  return (
    <BaseLayout
      title={post.frontmatter.title}
      tab="Blog"
      headerMode="dark"
      location={location}
    >
      <PostPage
        post={post}
        image={data.image}
        imageMap={imageMap}
        avatarMap={avatarMap}
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

    image: file(
      name: { eq: $hero }
      absolutePath: { regex: "/images/posts/" }
    ) {
      name
      absolutePath
      childImageSharp {
        gatsbyImageData(
          width: 2048
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
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

    peopleImages: allFile(
      filter: { absolutePath: { regex: "/images/people/" } }
    ) {
      nodes {
        absolutePath
        name
        childImageSharp {
          gatsbyImageData(
            width: 480
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`
