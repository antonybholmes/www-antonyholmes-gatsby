import React from "react"
import IPostWithAvatarProps from "../../interfaces/post-with-avatar-props"
import cn from "../../lib/class-names"
import BaseCol from "../base-col"
import CondComp from "../component"
import HTML from "../html"
import CompactAvatars from "../person/compact-avatars"
import DateFormatter from "./date-formatter"
import PostCategoryLink from "./post-category-link"
import PostImage from "./post-image"
import PostTitleLink from "./post-title-link"

interface IProps extends IPostWithAvatarProps {
  imgClassName?: string
  headerClassName?: string
  innerClassName?: string
  contentClassName?: string
  showSection?: boolean
  showDescription?: boolean
  showAvatar?: boolean
  showAvatarImage?: boolean
  dateBelow?: boolean
}

export default function PreviewPost({
  post,
  image,
  avatarMap,
  className,
  imgClassName = "h-64 md:h-72",
  headerClassName = "text-2xl md:text-4xl",
  innerClassName,
  contentClassName = "text-sm md:text-base",
  showSection = true,
  showDescription = true,
  showAvatar = true,
  showAvatarImage = true,
  dateBelow = false,
}: IProps) {
  return (
    <article className={cn("flex flex-col gap-y-2", className)}>
      {image && (
        <PostImage post={post} image={image} className={imgClassName} />
      )}

      <BaseCol className={cn("gap-y-2", innerClassName)}>
        <BaseCol>
          <CondComp cond={showSection}>
            <PostCategoryLink post={post} />
          </CondComp>
          <PostTitleLink post={post} className={headerClassName} />
        </BaseCol>
        <CondComp cond={showDescription}>
          <HTML
            html={post.excerpt}
            className={cn("text-slate-600", contentClassName)}
          />
        </CondComp>

        <div
          className={cn("flex", [
            dateBelow,
            "flex-col lg:gap-y-1",
            [
              "flex-col md:flex-row md:items-center md:justify-between",
              [showAvatarImage, "gap-y-1", "lg:gap-y-1"],
            ],
          ])}
        >
          <CondComp cond={showAvatar}>
            <CompactAvatars
              showImages={showAvatarImage}
              authors={post.frontmatter.authors}
              avatarMap={avatarMap}
            />
          </CondComp>

          <DateFormatter date={post.fields.date} />
        </div>
      </BaseCol>
    </article>
  )
}
