import { graphql } from "gatsby"
import React from "react"
import PostsPage from "../components/pages/posts-page"
import IDataPageProps from "../interfaces/data-page-props"
import ContentLayout from "../layouts/content-layout"
import Seo from "../layouts/seo"
import { getPageCount, getPagePosts } from "../lib/paginate"

export default function Page({ data, location }: IDataPageProps) {
  const allPosts = data.allPosts.nodes

  const posts = getPagePosts(allPosts)
  const pages = getPageCount(allPosts)

  return (
    <ContentLayout title="Blog" showTitle={false} location={location}>
      <></>
      <PostsPage posts={posts} page={0} pages={pages} />
    </ContentLayout>
  )
}

export const Head = () => <Seo title="Blog" />

export const pageQuery = graphql`
  query {
    allPosts: allMarkdownRemark(
      sort: { fields: { date: DESC } }
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
  }
`
