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
      "grid grid-cols-1 md:gap-6",
      [post.frontmatter.hero !== "", "md:grid-cols-5"],
      className
    )}
  >
    <div className="col-span-2">
      <PostImage post={post} image={image} className="mb-4 h-64 md:h-40" />
    </div>

    <BaseCol className="col-span-3 gap-y-2">
      <BaseCol>
        <PostSectionLink post={post} />
        <PostTitleLink post={post} className="text-3xl" />
      </BaseCol>
      {showDescription && (
        <HTML html={post.excerpt} className="text-slate-600" />
      )}

      <PostAuthor post={post} avatarMap={avatarMap} showAvatar={showAvatar} />
    </BaseCol>
  </article>
)

export default HeroPostSmall
