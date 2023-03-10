import React from "react"
import IFieldMap from "../../interfaces/field-map"
import IPreviewPost from "../../interfaces/preview-post"
import BaseCol from "../base-col"
import CondComp from "../component"
import HCenterRow from "../h-center-row"
import PagePagination from "../page-pagination"
import HeadPosts from "../post/head-posts"
import HeroPosts from "../post/hero-posts"
import LatestPosts from "../post/latest-posts"
import RestPosts from "../post/rest-posts"

interface IProps {
  posts: IPreviewPost[]
  page: number
  pages: number
  showLatest?: boolean
  categoryMap?: IFieldMap
  imageMap: IFieldMap
  avatarMap: IFieldMap
}

const PostsPage = ({
  posts,
  page = 0,
  pages = 1,
  showLatest = false,
  imageMap,
  avatarMap,
  categoryMap,
}: IProps) => {
  const heroPosts = posts.slice(0, 4)
  const headPosts = posts.slice(4, 6)
  const latestPosts = showLatest ? posts.slice(6, 10) : []
  const restPosts = showLatest ? posts.slice(10) : posts.slice(6)

  return (
    <BaseCol className="gap-y-16">
      {/* {page} {posts.length} */}

      <HeroPosts posts={heroPosts} imageMap={imageMap} avatarMap={avatarMap} />
      {/* <HeadPost post={heroPost} /> */}
      <CondComp cond={headPosts.length > 0}>
        <HeadPosts
          posts={headPosts}
          imageMap={imageMap}
          avatarMap={avatarMap}
        />
      </CondComp>

      <CondComp cond={latestPosts.length > 0}>
        <LatestPosts
          posts={latestPosts}
          imageMap={imageMap}
          avatarMap={avatarMap}
        />
      </CondComp>

      <CondComp cond={restPosts.length > 0}>
        <RestPosts
          posts={restPosts}
          imageMap={imageMap}
          avatarMap={avatarMap}
        />
      </CondComp>

      {/* <Pagination page={page} pages={pages} /> */}
      {pages > 1 && (
        <HCenterRow className="mt-16">
          <PagePagination page={page} pages={pages} />
        </HCenterRow>
      )}

      {page === -1 && restPosts.length > 0 && (
        <LatestPosts
          posts={restPosts}
          imageMap={imageMap}
          avatarMap={avatarMap}
        />
      )}
    </BaseCol>
  )
}

// "Guides & Tutorials",
//   "Opinions",
//   "Retirement",
//   "News & Announcements",
//ightMode={index % 2 === 0}
//key={index}

export default PostsPage
