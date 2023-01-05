import { graphql } from "gatsby"
import React from "react"
import PersonPage from "../components/pages/person-page"
import IDataPageProps from "../interfaces/data-page-props"
import ContentLayout from "../layouts/content-layout"
import Seo from "../layouts/seo"
import { getImageMap } from "../lib/images"

export default function Page({ pageContext, data, location }: IDataPageProps) {
  const { page, pages, posts, sectionMap } = pageContext

  const person = data.person
  const imageMap = getImageMap(data.postImages)
  const avatarMap = getImageMap(data.peopleImages)

  return (
    <ContentLayout title={person.frontmatter.name} location={location}>
      <></>
      <PersonPage
        author={person}
        imageMap={imageMap}
        avatarMap={avatarMap}
        posts={posts}
        currentPage={page}
        pages={pages}
      />
    </ContentLayout>
  )
}

export function Head({ pageContext }: IDataPageProps) {
  return <Seo title={pageContext.title} />
}

export const pageQuery = graphql`
  query PersonBySlug($personId: String) {
    person: markdownRemark(
      id: { eq: $personId }
      fileAbsolutePath: { regex: "/people/" }
    ) {
      id
      excerpt(format: HTML)
      html
      fields {
        slug
        date
      }
      frontmatter {
        name
        title
        email
      }
    }

    image: file(
      name: { eq: $personId }
      absolutePath: { regex: "/images/people/" }
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
