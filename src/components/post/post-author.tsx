import cn from "../../lib/class-names"
import IPostProps from "../../interfaces/post-props"
import CompactAvatars from "../compact-avatars"
import DateFormatter from "./date-formatter"
import React from "react"
import IFieldMap from "../../interfaces/field-map"

interface IProps extends IPostProps {
  showAvatar?: boolean
  showAvatarImage?: boolean
  avatarMap: IFieldMap
}

export default function PostAuthor({
  post,
  avatarMap,
  showAvatar = true,
  showAvatarImage = true,
  className,
}: IProps) {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between gap-x-8 gap-y-3 lg:flex-col lg:items-start lg:justify-start",
        className
      )}
    >
      {showAvatar && (
        <CompactAvatars
          authors={post.frontmatter.authors}
          avatarMap={avatarMap}
          showImages={showAvatarImage}
        />
      )}

      <DateFormatter date={post.fields.date} />
    </div>
  )
}
