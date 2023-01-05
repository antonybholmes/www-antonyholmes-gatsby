import React from "react"
import IPostWithAvatarProps from "../../interfaces/post-with-avatar-props"
import IPostWithImageProps from "../../interfaces/post-with-image-props"
import cn from "../../lib/class-names"
import BaseCol from "../base-col"
import HTML from "../html"
import PostAuthor from "./post-author"
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
  lazy?: boolean
}

const PreviewPost = ({
  post,
  image,
  avatarMap,
  className,
  imageClassName = "h-64 md:h-72 ",
  headerClassName = "text-4xl",
  innerClassName,
  contentClassName = "text-base",
  showSection = true,
  showDescription = true,
  showAvatar = true,
  showAvatarImage = true,
  lazy = false,
}: IProps) => (
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

      <PostAuthor
        post={post}
        showAvatar={showAvatar}
        showAvatarImage={showAvatarImage}
        avatarMap={avatarMap}
      />
    </BaseCol>
  </article>
)

export default PreviewPost
