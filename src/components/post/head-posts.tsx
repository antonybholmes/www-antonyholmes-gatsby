import React from "react"
import IPostsProps from "../../interfaces/posts-props"
import PreviewPost from "./preview-post"

interface IProps extends IPostsProps {
  showAvatar?: boolean
}

const HeadPosts = ({
  posts,
  imageMap,
  avatarMap,
  showAvatar = true,
}: IProps) => (
  <section className="grid grid-cols-1 gap-12 md:grid-cols-2">
    {posts.map((post, index) => (
      <PreviewPost
        key={index}
        post={post}
        image={imageMap[post.frontmatter.hero]}
        showAvatar={showAvatar}
        className="border-t border-slate-200 pt-6"
        imageClassName="h-64 md:h-72"
        avatarMap={avatarMap}
      />
    ))}
  </section>
)

export default HeadPosts
