import { graphql } from "gatsby"
import React from "react"
import PersonPage from "../components/pages/person-page"
import IDataPageProps from "../interfaces/data-page-props"
import ContentLayout from "../layouts/content-layout"
import Seo from "../layouts/seo"

export default function Page({ pageContext, data, location }: IDataPageProps) {
  const { page, pages, posts, imageMap, avatarMap } = pageContext

  const { person, personImage } = data
  //const imageMap = getImageMap(data.postImages)
  //const avatarMap = getImageMap(data.peopleImages)

  return (
    <ContentLayout title={person.frontmatter.name} location={location}>
      <></>
      <PersonPage
        person={person}
        avatarImage={personImage}
        imageMap={imageMap}
        avatarMap={avatarMap}
        posts={posts}
        page={page}
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
        pubmed
      }
    }

    personImage: file(
      name: { eq: $personId }
      absolutePath: { regex: "/images/people/" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 480
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`
