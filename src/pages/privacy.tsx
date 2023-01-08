import { graphql } from "gatsby"
import React from "react"
import IDataPageProps from "../interfaces/data-page-props"
import MarkdownLayout from "../layouts/markdown-layout"

export default function Page({ data, location }: IDataPageProps) {
  const post = data.post

  return <MarkdownLayout post={post} location={location} />
}

export const pageQuery = graphql`
  query {
    post: markdownRemark(fileAbsolutePath: { regex: "/pages/privacy/" }) {
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
