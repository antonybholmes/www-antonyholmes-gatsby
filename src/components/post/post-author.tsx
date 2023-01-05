import cn from "../../lib/class-names"
import IPostProps from "../../interfaces/post-props"
import CompactAvatars from "../compact-avatars"
import DateFormatter from "./date-formatter"
import React from "react"

interface IProps extends IPostProps {
  showAvatar?: boolean
}

export default function PostAuthor({
  post,
  showAvatar = true,
  className,
}: IProps) {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between gap-x-8 gap-y-3 lg:flex-col lg:items-start lg:justify-start",
        className
      )}
    >
      {showAvatar && <CompactAvatars authors={post.frontmatter.authors} />}

      <DateFormatter date={post.fields.date} />
    </div>
  )
}
