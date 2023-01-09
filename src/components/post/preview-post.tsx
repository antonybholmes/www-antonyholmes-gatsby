import React from "react"
import IPostWithAvatarProps from "../../interfaces/post-with-avatar-props"
import cn from "../../lib/class-names"
import CompactAvatars from "../author/compact-avatars"
import BaseCol from "../base-col"
import HTML from "../html"
import VCenterRow from "../v-center-row"
import DateFormatter from "./date-formatter"
import PostImage from "./post-image"
import PostSectionLink from "./post-section-link"
import PostTitleLink from "./post-title-link"

interface IProps extends IPostWithAvatarProps {
  imageClassName?: string
  headerClassName?: string
  innerClassName?: string
  contentClassName?: string
  showSection?: boolean
  showDescription?: boolean
  showAvatar?: boolean
  showAvatarImage?: boolean
  dateBelow?: boolean
  lazy?: boolean
}

export default function PreviewPost({
  post,
  image,
  avatarMap,
  className,
  imageClassName = "h-64 md:h-72",
  headerClassName = "text-4xl",
  innerClassName,
  contentClassName = "text-base",
  showSection = true,
  showDescription = true,
  showAvatar = true,
  showAvatarImage = true,
  dateBelow = false,
  lazy = false,
}: IProps) {
  return (
    <article className={cn("flex flex-col gap-y-4", className)}>
      {image && (
        <PostImage
          post={post}
          image={image}
          lazy={lazy}
          className={imageClassName}
        />
      )}

      <BaseCol className={cn("gap-y-2", innerClassName)}>
        <BaseCol className="gap-y-1">
          {showSection && <PostSectionLink post={post} />}
          <PostTitleLink post={post} className={headerClassName} />
        </BaseCol>
        {showDescription && (
          <HTML
            html={post.excerpt}
            className={cn("text-slate-600", contentClassName)}
          />
        )}

        {dateBelow ? (
          <>
            {showAvatar && (
              <CompactAvatars
                authors={post.frontmatter.authors}
                avatarMap={avatarMap}
                showImages={showAvatarImage}
              />
            )}

            <DateFormatter date={post.fields.date} />
          </>
        ) : (
          <VCenterRow className="justify-between">
            {showAvatar && (
              <CompactAvatars
                authors={post.frontmatter.authors}
                avatarMap={avatarMap}
                showImages={showAvatarImage}
              />
            )}

            <DateFormatter date={post.fields.date} />
          </VCenterRow>
        )}
      </BaseCol>
    </article>
  )
}
