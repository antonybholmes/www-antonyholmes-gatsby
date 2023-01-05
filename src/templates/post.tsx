import { graphql } from "gatsby"
import React from "react"
import PostPage from "../components/pages/post-page"
import IDataPageProps from "../interfaces/data-page-props"
import BaseLayout from "../layouts/base-layout"
import Seo from "../layouts/seo"

export default function Page({ pageContext, data, location }: IDataPageProps) {
  const tab = pageContext.tab
  const post = data.post

  return (
    <BaseLayout
      title={post.frontmatter.title}
      tab="Blog"
      headerMode="dark"
      location={location}
    >
      <PostPage post={post} />
    </BaseLayout>
  )
}

export function Head({ pageContext }: IDataPageProps) {
  return <Seo title={pageContext.title} />
}

export const pageQuery = graphql`
  query PostBySlug($id: String!) {
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
  }
`
