import React from "react"
import IFieldMap from "../../interfaces/field-map"
import IPreviewPost from "../../interfaces/preview-post"
import BaseCol from "../base-col"
import HCenterRow from "../h-center-row"
import PagePagination from "../page-pagination"
import HeadPosts from "../post/head-posts"
import HeroPosts from "../post/hero-posts"
import LatestPosts from "../post/latest-posts"
import RestPosts from "../post/rest-posts"
import CategoryPosts from "../post/category-posts"
import CategoryPostsVert from "../post/category-posts-vert"

interface IProps {
  posts: IPreviewPost[]
  page: number
  pages: number
  categoryMap?: IFieldMap
  imageMap: IFieldMap
  avatarMap: IFieldMap
}

const PostsPage = ({
  posts,
  page = 0,
  pages = 1,
  imageMap,
  avatarMap,
  categoryMap,
}: IProps) => {
  const heroPosts = posts.slice(0, 4)
  const headPosts = posts.slice(4, 6)
  const restPosts = posts.slice(6)

  return (
    <BaseCol className="gap-y-16">
      {/* {page} {posts.length} */}

      <HeroPosts posts={heroPosts} imageMap={imageMap} avatarMap={avatarMap} />
      {/* <HeadPost post={heroPost} /> */}
      {headPosts.length > 0 && (
        <HeadPosts
          posts={headPosts}
          imageMap={imageMap}
          avatarMap={avatarMap}
        />
      )}

      {page > -1 && restPosts.length > 0 && (
        <RestPosts
          posts={restPosts}
          imageMap={imageMap}
          avatarMap={avatarMap}
        />
      )}

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

      {categoryMap && (
        <>
          <CategoryPostsVert
            category="Guides & Tutorials"
            posts={categoryMap["Guides & Tutorials"]["Default"]}
            imageMap={imageMap}
            avatarMap={avatarMap}
          />
          <CategoryPosts
            section="Opinions"
            posts={categoryMap["Opinions"]["Default"]}
            imageMap={imageMap}
            avatarMap={avatarMap}
          />

          {/* <CategoryPostsVert
            category="Retirement"
            posts={categoryMap["Retirement"]["Default"]}
            imageMap={imageMap}
            avatarMap={avatarMap}
          /> */}

          {/* <SectionPosts section="Reviews" posts={categoryMap['Reviews']} /> */}

          <CategoryPostsVert
            category="News"
            posts={categoryMap["News"]["Default"]}
            imageMap={imageMap}
            avatarMap={avatarMap}
          />
        </>
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
