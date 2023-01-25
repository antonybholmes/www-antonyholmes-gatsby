import React from "react"
import IPostWithAvatarProps from "../../interfaces/post-with-avatar-props"
import cn from "../../lib/class-names"
import CompactAvatars from "../person/compact-avatars"
import BaseCol from "../base-col"
import HTML from "../html"
import DateFormatter from "./date-formatter"
import PostImage from "./post-image"
import PostCategoryLink from "./post-category-link"
import PostTitleLink from "./post-title-link"
import CondComp from "../component"

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
      "grid grid-cols-1 gap-y-2 md:grid-cols-4 md:gap-x-6 lg:grid-cols-5 xl:grid-cols-3",
      className
    )}
  >
    <PostImage post={post} image={image} className="h-48 md:h-32" />

    <BaseCol className="col-span-3 gap-y-1 lg:col-span-3 xl:col-span-2">
      <BaseCol>
        <PostCategoryLink post={post} textSize="text-xl md:text-base" />
        <PostTitleLink post={post} className="text-2xl lg:text-xl" />
      </BaseCol>
      <CondComp cond={showDescription}>
        <HTML html={post.excerpt} className="text-sm text-slate-600" />
      </CondComp>

      <BaseCol className="xl:gap-y-1">
        <CondComp cond={showAvatar}>
          <CompactAvatars
            people={post.frontmatter.authors}
            avatarMap={avatarMap}
            showImages={false}
          />
        </CondComp>

        <DateFormatter date={post.fields.date} />
      </BaseCol>
    </BaseCol>
  </article>
)

export default HeroPostSmall
