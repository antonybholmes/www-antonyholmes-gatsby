import React from "react"
import IPostsProps from "../../interfaces/posts-props"
import cn from "../../lib/class-names"
import PreviewPost from "./preview-post"

interface IProps extends IPostsProps {
  title?: string
}

export default function MorePosts({
  posts,
  avatarMap,
  title = "Related Posts",
}: IProps) {
  return (
    <section>
      <h2 className="border-b-2 border-slate-200 pb-2">
        <span className="text-slate-500">More on</span> {title}
      </h2>
      <ul className="flex w-full flex-col gap-y-8 pt-8">
        {posts.map((post, index) => (
          <li key={index}>
            <PreviewPost
              post={post}
              image={null}
              showSection={false}
              showAvatarImage={false}
              avatarMap={avatarMap}
              headerClassName="text-xl"
              dateBelow={true}
              className={cn([index > 0, "border-t border-slate-200 pt-4"])}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
