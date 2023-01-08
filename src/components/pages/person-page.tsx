import React from "react"
import IAuthor from "../../interfaces/author"
import IFieldMap from "../../interfaces/field-map"
import IPreviewPost from "../../interfaces/preview-post"
import AvatarImageLarge from "../author/avatar-image-large"
import BaseRow from "../base-row"
import HCenterRow from "../h-center-row"
import PageTitle from "../page-title"
import PostBody from "../post/post-body"
import PostsPage from "./posts-page"

interface IProps {
  author: IAuthor
  imageMap: IFieldMap
  avatarMap: IFieldMap
  posts: IPreviewPost[]
  currentPage: number
  pages: number
}

const PersonPage = ({
  author,
  posts,
  imageMap,
  avatarMap,
  currentPage,
  pages,
}: IProps) => (
  <>
    <BaseRow className="gap-x-8">
      <div className="w-full">
        <HCenterRow className="mb-8 lg:hidden">
          <div className="overflow-hidden">
            <AvatarImageLarge
              author={author.frontmatter.name}
              avatarMap={avatarMap}
              imgClassName="w-56"
            />
          </div>
        </HCenterRow>
        <PageTitle
          title={author.frontmatter.name}
          superTitle="Posts by"
          subTitle={author.frontmatter.title}
          className="text-center lg:text-left"
        />
        <PostBody html={author.html} className="mt-8" />
      </div>
      <div className="hidden lg:block">
        <AvatarImageLarge
          author={author.frontmatter.name}
          avatarMap={avatarMap}
          className="h-56 w-56"
        />
      </div>
    </BaseRow>

    <section className="mt-16 border-t border-slate-200 pt-16">
      <PostsPage
        posts={posts}
        imageMap={imageMap}
        avatarMap={avatarMap}
        page={currentPage}
        pages={pages}
      />
    </section>
  </>
)

export default PersonPage
