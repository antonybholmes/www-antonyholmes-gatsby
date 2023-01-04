import cn from "../../lib/class-names"
import IPostProps from "../../interfaces/post-props"
import BaseCol from "../base-col"
import HTML from "../html"
import PostAuthor from "./post-author"
import PostImage from "./post-image"
import PostSectionLink from "./post-section-link"
import PostTitleLink from "./post-title-link"

interface IProps extends IPostProps {
  imageClassName?: string
  headerClassName?: string
  innerClassName?: string
  contentClassName?: string
  showDescription?: boolean
  showImage?: boolean
  showAvatar?: boolean
  lazy?: boolean
}

const PreviewPost = ({
  post,
  className,
  imageClassName = "h-64 md:h-72 ",
  headerClassName = "text-4xl",
  innerClassName,
  contentClassName = "text-base",
  showDescription = true,
  showImage = true,
  showAvatar = true,
  lazy = false,
}: IProps) => (
  <article className={cn("flex flex-col gap-y-4", className)}>
    {showImage && post.frontmatter.hero !== "" && (
      <PostImage post={post} lazy={lazy} className={imageClassName} />
    )}

    <BaseCol className={cn("gap-y-2", innerClassName)}>
      <BaseCol className="gap-y-1">
        <PostSectionLink post={post} />
        <PostTitleLink post={post} className={headerClassName} />
      </BaseCol>
      {showDescription && (
        <HTML
          html={post.excerpt}
          className={cn("text-slate-600", contentClassName)}
        />
      )}

      <PostAuthor post={post} showAvatar={showAvatar} />
    </BaseCol>
  </article>
)

export default PreviewPost
