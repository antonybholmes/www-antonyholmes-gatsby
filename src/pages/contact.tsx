import { graphql } from "gatsby"
import React from "react"
import MarkdownBody from "../components/markdown-body"
import IDataPageProps from "../interfaces/data-page-props"
import ContentLayout from "../layouts/content-layout"
import ThreeQuarterLayout from "../layouts/three-quarter-layout"

export default function Page({ data, location }: IDataPageProps) {
  const post = data.post

  return (
    <ThreeQuarterLayout title="Contact" location={location} showTitle={true}>
      <div className="mb-16">
        <MarkdownBody html={post.html} className="text-justify" />
      </div>
      <></>
    </ThreeQuarterLayout>
  )
}

export const pageQuery = graphql`
  query {
    post: markdownRemark(fileAbsolutePath: { regex: "/pages/contact/" }) {
      id
      html
      fields {
        slug
        date
      }
      frontmatter {
        title
      }
    }
  }
`
