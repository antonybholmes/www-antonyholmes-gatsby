import React from "react"
import PostsPage from "../components/pages/posts-page"
import IDataPageProps from "../interfaces/data-page-props"
import ContentLayout from "../layouts/content-layout"

const PostsTemplate = ({ pageContext, location }: IDataPageProps) => {
  const { title, superTitle, page, pages, posts, sectionMap } = pageContext

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
      />
    </ContentLayout>
  )
}

export default PostsTemplate
