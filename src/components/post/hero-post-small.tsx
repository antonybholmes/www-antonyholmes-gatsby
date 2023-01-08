import React from "react"
import IPostWithAvatarProps from "../../interfaces/post-with-avatar-props"
import IPostWithImageProps from "../../interfaces/post-with-image-props"
import cn from "../../lib/class-names"
import BaseCol from "../base-col"
import HTML from "../html"
import DateFormatter from "./date-formatter"
import PostAuthor from "./post-author"
import PostImage from "./post-image"
import PostSectionLink from "./post-section-link"
import PostTitleLink from "./post-title-link"

interface IProps extends IPostWithAvatarProps {
  showDescription?: boolean
  showAvatar?: boolean
}

const HeroPostSmall = ({
  post,
  image,
  avatarMap,
  showDescription = true,
  showAvatar = true,
  className,
}: IProps) => (
  <article
    className={cn(
      "grid grid-cols-1 md:gap-5",
      [
        post.frontmatter.hero !== "",
        "md:grid-cols-5 xl:grid-cols-3 2xl:grid-cols-4",
      ],
      className
    )}
  >
    <PostImage post={post} image={image} className="mb-4 h-48 md:h-32" />

    <BaseCol className="col-span-4 gap-y-2 xl:col-span-2 2xl:col-span-3">
      <BaseCol>
        <PostSectionLink post={post} textSize="text-normal" />
        <PostTitleLink post={post} className="text-2xl" />
      </BaseCol>
      {showDescription && (
        <HTML html={post.excerpt} className="text-sm text-slate-600" />
      )}

      <PostAuthor post={post} avatarMap={avatarMap} showAvatar={showAvatar} />

      <DateFormatter date={post.fields.date} />
    </BaseCol>
  </article>
)

export default HeroPostSmall
