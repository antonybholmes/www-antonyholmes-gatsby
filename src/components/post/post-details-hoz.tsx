import React from "react"
import IFieldMap from "../../interfaces/field-map"
import IPostProps from "../../interfaces/post-props"
import cn from "../../lib/class-names"
import Avatars from "../person/avatars"
import VCenterRow from "../v-center-row"
import DateFormatter from "./date-formatter"
import ReadingTime from "./reading-time"

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
    <Avatars people={post.frontmatter.authors} avatarMap={avatarMap} />

    <VCenterRow className="gap-x-2 border-l border-slate-300 py-1 pl-6 text-sm">
      <DateFormatter date={post.fields.date} />
      <span className="h-1 w-1 rounded-full bg-slate-400" />
      <ReadingTime post={post} />
    </VCenterRow>

    {/* <PostTags post={post} /> */}

    {/* <PostSocialMedia post={post} /> */}
  </section>
)

export default PostDetailsHoz
