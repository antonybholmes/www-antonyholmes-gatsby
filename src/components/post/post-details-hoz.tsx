import React from "react"
import IFieldMap from "../../interfaces/field-map"
import IPostProps from "../../interfaces/post-props"
import cn from "../../lib/class-names"
import Avatars from "../author/avatars"
import DateFormatter from "./date-formatter"

interface IProps extends IPostProps {
  avatarMap: IFieldMap
}

const PostDetailsHoz = ({ post, avatarMap, className }: IProps) => (
  <section
    className={cn(
      "flex flex-row items-center justify-between border-b-2 border-blue-500 pb-4",
      className
    )}
  >
    <Avatars authors={post.frontmatter.authors} avatarMap={avatarMap} />

    <DateFormatter
      date={post.fields.date}
      className="border-l border-slate-300 py-1 pl-6"
    />

    {/* <PostTags post={post} /> */}

    {/* <PostSocialMedia post={post} /> */}
  </section>
)

export default PostDetailsHoz
