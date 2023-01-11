import PreviewPost from "./preview-post"
import IPostsProps from "../../interfaces/posts-props"
import React from "react"

interface IProps extends IPostsProps {
  title?: string
}

const RecentPosts = ({
  posts,
  imageMap,
  avatarMap,
  title = "Recent Posts",
}: IProps) => {
  return (
    <section className="mt-16 border-t border-solid border-slate-200 pt-16">
      <h2 className="text-3xl font-bold">{title}</h2>
      <ul className="mt-16 grid w-full grid-cols-1 md:grid-cols-3 md:gap-8">
        {posts.map((post, index) => (
          <li key={index}>
            <PreviewPost
              post={post}
              avatarMap={avatarMap}
              image={imageMap[post.frontmatter.hero]}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RecentPosts
