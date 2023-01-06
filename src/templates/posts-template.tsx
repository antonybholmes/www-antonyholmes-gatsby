import React from "react"
import PostsPage from "../components/pages/posts-page"
import IDataPageProps from "../interfaces/data-page-props"
import ContentLayout from "../layouts/content-layout"
import Seo from "../layouts/seo"

export default function PostsTemplate({
  pageContext,
  location,
}: IDataPageProps) {
  const {
    title,
    superTitle,
    showTitle,
    page,
    pages,
    posts,
    imageMap,
    avatarMap,
    sectionMap,
  } = pageContext

  //const imageMap = getImageMap(data.postImages)
  //const avatarMap = getImageMap(data.peopleImages)

  return (
    <ContentLayout
      title={title}
      superTitle={superTitle}
      showTitle={showTitle}
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
