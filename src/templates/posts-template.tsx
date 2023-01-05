import { graphql } from "gatsby"
import React from "react"
import PostsPage from "../components/pages/posts-page"
import IDataPageProps from "../interfaces/data-page-props"
import ContentLayout from "../layouts/content-layout"
import Seo from "../layouts/seo"
import { getImageMap } from "../lib/images"

export default function PostsTemplate({
  pageContext,
  data,
  location,
}: IDataPageProps) {
  const { title, superTitle, page, pages, posts, sectionMap } = pageContext

  const imageMap = getImageMap(data.postImages)
  const avatarMap = getImageMap(data.peopleImages)

  return (
    <ContentLayout
      title={title}
      superTitle={superTitle}
      tab="Blog"
      location={location}
    >
      <></>

      <PostsPage
        posts={posts}
        page={page}
        pages={pages}
        sectionMap={sectionMap}
        imageMap={imageMap}
        avatarMap={avatarMap}
      />
    </ContentLayout>
  )
}

export function Head({ pageContext }: IDataPageProps) {
  return <Seo title={pageContext.title} />
}

export const pageQuery = graphql`
  query Posts {
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