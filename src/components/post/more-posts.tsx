import React from "react"
import IPostsProps from "../../interfaces/posts-props"
import PreviewPost from "./preview-post"

interface IProps extends IPostsProps {
  title?: string
}

export default function MorePosts({
  posts,
  imageMap,
  avatarMap,
  title = "Related Posts",
}: IProps) {
  return (
    <section>
      <h2 className="border-b-2 border-slate-300 pb-1 text-xl">{title}</h2>
      <ul className="mt-4 w-full flex flex-col">
        {posts.map((post, index) => (
          <li key={index}>
            <PreviewPost
              post={post}
              image={null}
              showSection={false}
              showAvatarImage={false}
              avatarMap={avatarMap}
              headerClassName="text-2xl"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
